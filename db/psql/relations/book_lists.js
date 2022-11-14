import db from "../config.js";

function getAllBookList() {
  try {
    const query = `SELECT * FROM "books_lists"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookList(bookList) {
  try {
    const query = `INSERT INTO "books_lists"(
            reading_list_id,
            book_uuid,
            timestamp_created_on
            ) VALUES ($1, $2, $3) 
            RETURNING *`;

    const params = [
      bookList.reading_list_id,
      bookList.book_uuid,
      bookList.timestamp_created_on,
    ];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkBookInReadingListExists(bookList) {
  try {
    const query = `SELECT 1 FROM "books_lists" WHERE reading_list_id = $1 AND book_uuid = $2`;
    const params = [bookList.reading_list_id, bookList.book_uuid];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function deleteBookFromReadingListByID(bookList) {
  try {
    const query = `DELETE FROM "books_lists" WHERE reading_list_id = $1 AND book_uuid = $2 RETURNING *`;
    const params = [bookList.reading_list_id, bookList.book_uuid];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllBookList,
  addBookList,
  checkBookInReadingListExists,
  deleteBookFromReadingListByID,
};
