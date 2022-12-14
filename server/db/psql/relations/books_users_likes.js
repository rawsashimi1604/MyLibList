import db from "../config.js";

function getAllBooksUsersLikes(email) {
  try {
    const query = `
      SELECT b.book_uuid, b.title, b.date_created FROM "books_users_likes" 
      INNER JOIN "books" b ON "books_users_likes".book_uuid = b.book_uuid
      WHERE email=$1 
    `;
    const params = [email];
    return db.query(query, params);
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
    ) VALUES ($1, $2, $3) RETURNING *`;

    const params = [book.email, book.book_uuid, book.timestamp_liked];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function deleteBookUsersLike(user, book) {
  try {
    const query = `DELETE FROM "books_users_likes" WHERE email = $1 AND book_uuid = $2 RETURNING *`;
    const params = [user, book];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getNumberOfLikes(book_uuid) {
  try {
    const query = `
      SELECT COUNT(*) FROM "books_users_likes"
      WHERE book_uuid=$1
    `;

    const params = [book_uuid];

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

export default {
  getNumberOfLikes,
  getAllBooksUsersLikes,
  addBookUsersLikes,
  checkIfBookIsLiked,
  deleteBookUsersLike,
};
