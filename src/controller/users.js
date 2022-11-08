import validateUserRegistration from "../lib/authentication/validateUserRegistration.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";
import bcrypt from "bcrypt";

function handleIndex(req, res) {
  res.send("User route...");
}

async function handleAllUsers(req, res) {
  const database = res.locals.database;
  const users = await database.relations.users.getAllUsers();
  res.status(200).send(users.rows);
}

async function handleAddUser(req, res) {
  console.log(req.body);

  // Received from Client
  const user = {
    email: req.body["email"],
    password: req.body["password"],
    first_name: req.body["first_name"],
    last_name: req.body["last_name"]
  };

  // User object validated! Correct information passed
  if (validateUserRegistration(user)) {
    const database = res.locals.database;

    const checkUserExists = await database.relations.users.checkUserExists(user);
    
    if (!checkUserExists.rows.length === 0) {
      res.status(400).send("Failed to register.");
      return;
    } 
    
    // Else, register should be successful.
    // Get timestamp of API request, add to user object...
    const timestamp = getCurrentTimestamp();
    user["timestamp_registered"] = timestamp

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

export default {
  handleIndex,
  handleAllUsers,
  handleAddUser,
};
