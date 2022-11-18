import db from "../config.js";

function getAllBookUserStatus() {
  try {
    const query = `SELECT * FROM "books_users_status"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getBookUserStatusByID(book_uuid) {
  try {
    const query = `SELECT * FROM "books_users_status" WHERE book_uuid = $2`;
    const params = [book_uuid];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookUserStatus(book) {
  try {
    const query = `INSERT INTO "books_users_status"(
      email,
      book_uuid,
      status,
      timestamp_updated
    ) VALUES ($1, $2, $3, $4)`;

    const params = [
      book.email,
      book.book_uuid,
      book.status,
      book.timestamp_updated,
    ];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function updateBookUserStatus(status, timestamp, email, book) {
  try {
    const query = `UPDATE "books_users_status" SET status = $1, timestamp_updated = $2 WHERE email = $3 AND book_uuid = $4`;
    const params = [status, timestamp, email, book];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkIfBookStatusAdded(user, book) {
  try {
    const query = `SELECT * FROM "books_users_status" WHERE email = $1 AND book_uuid = $2`;
    const params = [user, book];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllBookUserStatus,
  getBookUserStatusByID,
  addBookUserStatus,
  checkIfBookStatusAdded,
  updateBookUserStatus,
};
