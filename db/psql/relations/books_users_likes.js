import db from "../config.js";

function getAllBooksUsersLikes() {
  try {
    const query = `SELECT * FROM "books_users_likes"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookUsersLikes(book) {
  try {
    const query = `INSERT INTO "books_users_likes"(
      email,
      book_uuid,
      timestamp_liked
    ) VALUES ($1, $2, $3)`;

    const params = [book.email, book.book_uuid, book.timestamp_liked];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkIfBookIsLiked(user, book) {
  try {
    const query = `SELECT * FROM "books_users_likes" WHERE email = $1 AND book_uuid = $2`;
    const params = [user, book];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooksUsersLikes, addBookUsersLikes, checkIfBookIsLiked };
