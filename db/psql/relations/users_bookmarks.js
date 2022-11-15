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

function checkIfBookmarkAdded(user,book){
  try{
    const query = `SELECT * FROM "users_bookmarks" WHERE email = $1 AND book_uuid = $2`;
    const params = [user, book];
    return db.query(query, params);
  }catch (err){
    console.log(err);
    throw err;
  }
}

function addBookUserBookmarks(book) {
  try {
    const query = `INSERT INTO "users_bookmarks"(
      email,
      book_uuid,
      page,
      timestamp_bookmarked
    ) VALUES ($1, $2, $3, $4)`;

    const params = [book.email, book.book_uuid, book.page, book.timestamp_bookmarked];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function updateBookmark(page, timestamp, email, book){
  try{
    const query = `UPDATE "users_bookmarks" SET page = $1, timestamp_bookmarked = $2 WHERE email = $3 AND book_uuid = $4`;
    const params = [page, timestamp, email, book];
    return db.query(query, params);
  } catch (err){
    console.log(err);
    throw err;
  }
}


export default {
  getAllUsersBookmarks,
  getUsersBookmarksByID,
  addBookUserBookmarks,
  checkIfBookmarkAdded,
  updateBookmark,
};
