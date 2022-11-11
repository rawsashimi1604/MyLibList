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
      timestamp_liked
    ) VALUES ($1, $2, $3)`;

    const params = [book.email, book.book_uuid, book.timestamp_liked];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooksUsersLikes, addBookUsersLikes };
