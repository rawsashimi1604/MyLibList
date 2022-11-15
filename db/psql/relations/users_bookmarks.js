import db from "../config.js";

function getAllUsersBookmarks() {
  try {
    const query = `SELECT * FROM "users_bookmarks"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getUsersBookmarksByID(book_uuid) {
  try {
    const query = `SELECT * FROM "users_bookmarks" WHERE book_uuid = $2`;
    const params = [book_uuid];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookUserBookmarks(book) {
  try {
    const query = `INSERT INTO "users_bookmarks"(
      email,
      book_uuid,
      timestamp_liked,
    ) VALUES ($1, $2, $3)`;

    const params = [book.email, book.book_uuid, book.timestamp_liked];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllUsersBookmarks,
  getUsersBookmarksByID,
  addBookUserBookmarks,
};
