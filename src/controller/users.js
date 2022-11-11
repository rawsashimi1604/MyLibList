import validateUserRegistration from "../lib/users/validateUserRegistration.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";
import bcrypt from "bcrypt";

async function handleRegisterUser(req, res) {
  console.log(req.body);

  // Received from Client
  const user = {
    email: req.body["email"],
    password: req.body["password"],
    first_name: req.body["first_name"],
    last_name: req.body["last_name"],
  };

  // User object validated! Correct information passed
  if (validateUserRegistration(user)) {
    const database = res.locals.database;

    const checkUserExists = await database.relations.users.checkUserExists(
      user.email
    );

    if (!checkUserExists.rows.length === 0) {
      res.status(400).send("Failed to register.");
      return;
    }

    // Else, register should be successful.
    // Get timestamp of API request, add to user object...
    const timestamp = getCurrentTimestamp();
    user["timestamp_registered"] = timestamp;

    // Give user a "NORMAL" access_role
    user["access_role"] = "NORMAL";

    // Hash password using bcrypt before storing in database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const userAdded = await database.relations.users.addUser(user);

    // User was registered , success..
    res.status(200).send(userAdded.rows[0]);
  }

  // Invalid object passed
  else {
    res.status(400).send("Invalid user object sent.");
  }
}

async function handleGetUserData(req, res) {
  res.send("User route...");
}

async function handleChangePassword(req, res) {
  res.send("Hit Put /api/user/changePassword");
}

async function handleDeleteUser(req, res) {
  res.send("Hit Delete /api/user...");
}

async function handleGetLikeBooks(req, res) {
  res.send("Hit Get /api/user/likedBooks ...");
}

async function handleGetBookmark(req, res) {
  res.send("Hit Get /api/user/bookmark...");
}

async function handleGetBookStatus(req, res) {
  res.send("Hit Get /api/user/bookStatus...");
}

export default {
  handleRegisterUser,
  handleGetUserData,
  handleChangePassword,
  handleDeleteUser,
  handleGetLikeBooks,
  handleGetBookmark,
  handleGetBookStatus,
};
