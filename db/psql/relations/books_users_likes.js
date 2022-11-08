import db from "../config.js";

function getAllBooksUsersLikes() {
  try {
    const query = `SELECT * FROM "book_users_likes"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookUsersLikes(book) {
  try {
    const query = `INSERT INTO "book_users_likes"(
      email,
      book_uuid,
      page,
      timestamp_bookmarked
    ) VALUES ($1, $2, $3)`;

    const params = [
      book.email,
      book.book_uuid,
      book.page,
      book.timestamp_bookmarked,
    ]
    
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooksUsersLikes, addBookUsersLikes };