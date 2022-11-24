import validateUserRegistration from "../lib/users/validateUserRegistration.js";
import validateUpdatePassword from "../lib/users/validateUpdatePassword.js";
import validateDeleteUser from "../lib/users/validateDeleteUser.js";
import validateUser from "../lib/users/validateUser.js";
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

    if (!(checkUserExists.rows.length === 0)) {
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
  const email = req.query.email;

  if (!validateUser(email)) {
    res.status(400).send({
      error: "Invalid email input",
    });
    return;
  }

  const database = res.locals.database;
  const getUserDataByEmailResult =
    await database.relations.users.getUserByEmail(email);

  if (getUserDataByEmailResult.rows.length >= 1) {
    res.status(200).send({
      email: getUserDataByEmailResult.rows[0].email,
      timestamp_registered:
        getUserDataByEmailResult.rows[0].timestamp_registered,
      access_role: getUserDataByEmailResult.rows[0].access_role,
      first_name: getUserDataByEmailResult.rows[0].first_name,
      last_name: getUserDataByEmailResult.rows[0].last_name,
    });
    return;
  }

  res.status(400).send({
    error: "User is not registered",
  });
  return;

}

async function handleChangePassword(req, res) {
  // Receive JSON from frontend
  const userData = {
    email: req.body["email"],
    password: req.body["password"],
  };

  // User object not validated! Wrong information passed
  if (!validateUpdatePassword(userData)) {
    res.status(400).send("Invalid user object sent.");
    return;
  }

  // Check whether the email received exists in the database...
  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    userData.email
  );

  // if email already exists, then you can delete user from db
  if (!(checkUserExists.rows.length >= 1)) {
    res
      .status(400)
      .send("Email does not exist on database! Can't update password!!!");
    return;
  }

  // Hash password using bcrypt before storing in database
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData.password = hashedPassword;

  // Delete user from database
  const updatePasswordResult =
    await database.relations.users.updateHashedUserPassword(userData);

  // If the database returned us 0 row, means it has succesfully deleted from the database...
  if (updatePasswordResult.rows.length >= 1) {
    res.status(200).send({
      message: "Successfully updated user password.",
    });
    return;
  }
  //
  res.status(400).send({
    error: "Something went wrong when updating user password.",
  });
  return;
}

async function handleGetLikeBooks(req, res) {
  // Check the database for the reading list
  // Check if email was specified
  if (!req.body.email) {
    res.status(400).send({
      error: `Email not specified`,
    });
    return;
  }

  const database = res.locals.database;

  const getLikeBooksResult =
    await database.relations.books_users_likes.getAllBooksUsersLikes(
      req.body.email
    );
  console.log(getLikeBooksResult);

  res.status(200).send({
    data: getLikeBooksResult.rows,
    message: `Successfully get all books users likes.`,
  });
  return;
}

async function handleGetReadingBooks(req, res) {
  // Receive JSON from frontend
  if (!req.body.email) {
    res.status(400).send({
      error: `Email not specified`,
    });
    return;
  }

  const database = res.locals.database;
  const getUserReadingListsResult =
    await database.relations.reading_lists.getAllReadingListsByEmail(
      req.body.email
    );

  res.status(200).send({
    data: getUserReadingListsResult.rows,
    message: `Successfully get all reading lists books.`,
  });
  return;
}

export default {
  handleRegisterUser,
  handleGetUserData,
  handleChangePassword,
  handleGetLikeBooks,
  handleGetReadingBooks,
};
