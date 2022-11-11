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

export default { getAllBookUserStatus, addBookUserStatus };
