import db from "../config.js";

function getAllUsers() {
  try {
    const query = `SELECT * FROM "users"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addUser(user) {
  try {
    const query = `INSERT INTO "users"(email, password, timestamp_registered, access_role, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING email`;
    const params = [
      user.email,
      user.password,
      user.timestamp_registered,
      user.access_role,
      user.first_name,
      user.last_name,
    ];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkUserExists(email) {
  try {
    const query = `SELECT 1
    FROM "users"
    WHERE email = $1`;
    const params = [email];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getHashedUserPassword(user) {
  try {
    const query = `SELECT password FROM "users" WHERE email = $1`;
    const params = [user.email];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllUsers, addUser, checkUserExists, getHashedUserPassword };
