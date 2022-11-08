import db from "../config.js";

function getAllBooksLcsh() {
  try {
    const query = `SELECT * FROM "books_lcsh"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookLcsh(book_lcsh) {
  try {
    const query = `INSERT INTO "books_lcsh"(
        lcsh_id,
        book_uuid
    ) VALUES ($1, $2) RETURNING *`;

    const params = [book_lcsh.lcsh_id, book_lcsh.book_uuid];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooksLcsh, addBookLcsh };
