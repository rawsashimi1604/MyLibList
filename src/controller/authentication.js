import jwt from "jsonwebtoken";
import validateUserLogin from "../lib/authentication/validateUserLogin.js";
import generateAccessToken from "../lib/authentication/generateAccessToken.js";
import bcrypt from "bcrypt";

// POST /api/auth/login
async function handleUserLogin(req, res) {
  const user = {
    email: req.body["email"],
    password: req.body["password"],
  };

  // User object was validated! Correct info was passed..
  if (validateUserLogin(user)) {
    const database = res.locals.database;
    const result = await database.relations.users.getHashedUserPassword(user);

    // If user does not exist return 400
    const checkUserExists = await database.relations.users.checkUserExists(
      user.email
    );
    if (checkUserExists.rows.length === 0)
      return res.status(400).send("Invalid email.");

    // Password queried from DB
    const hashedPassword = result.rows[0].password;

    if (await bcrypt.compare(user.password, hashedPassword)) {
      // Password was correct!
      // Create JSON Web token, serialize user object
      const serializedObject = { email: user.email };

      // Generate access token
      const accessToken = generateAccessToken(serializedObject);

      // Generate refresh token as it expries in x seconds
      const refreshToken = jwt.sign(
        serializedObject,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Push refresh token to database
      const refreshTokenResult =
        await database.relations.refresh_token.addToken(refreshToken);

      // Get user data
      const userDataResult = await database.relations.users.getUserByEmail(
        user.email
      );

      // Don't send password to client
      const userDataFromDatabase = userDataResult.rows[0];
      delete userDataFromDatabase.password;

      // Return access token to logged in user.
      res.status(200).send({
        data: userDataFromDatabase,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }

    // Incorrect password...
    else {
      res.status(400).send("Invalid password.");
    }
  }

  // Invalid object passed
  else {
    res.status(400).send("Invalid user object sent.");
  }
}

// DELETE /api/auth/logout
async function handleUserLogout(req, res) {
  // Log out user
  // Remove refresh token from database
  // User is now not authenticated...

  const database = res.locals.database;
  const refreshToken = req.body.token;

  // No token received from client
  if (!refreshToken) {
    return res.sendStatus(400);
  }

  // Check if token exists
  const checkRefreshTokenExists =
    await database.relations.refresh_token.checkTokenExists(refreshToken);

  // No token exists, user is not logged in
  if (checkRefreshTokenExists.rows.length === 0) {
    return res.sendStatus(400);
  }

  // Remove token from database
  const deleteTokenResult = await database.relations.refresh_token.deleteToken(
    refreshToken
  );

  res.sendStatus(200);
}

// POST /api/auth/token
async function handleNewToken(req, res) {
  // Gets refresh token from client
  // Check if refresh token is valid (exists in database)

  const refreshToken = req.body.token;

  // No token received from client
  if (!refreshToken) {
    return res.sendStatus(400);
  }

  const database = res.locals.database;
  const checkRefreshTokenExists =
    await database.relations.refresh_token.checkTokenExists(refreshToken);

  // Token does not exist in database
  if (checkRefreshTokenExists.rows.length === 0) {
    return res.sendStatus(400);
  }

  // Token exists... try to verify token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, serializedObject) => {
      if (err) return res.sendStatus(400);

      // Generate a new access token...
      const accessToken = generateAccessToken({
        email: serializedObject.email,
      });

      // Send new access token to client...
      res.json({ accessToken: accessToken });
    }
  );
}

export default {
  handleUserLogin,
  handleUserLogout,
  handleNewToken,
};
