import db from "../config.js";

function getAllBooks_Lcsh() {
  try {
    const query = `SELECT * FROM "book_lcshs"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBook_Lcsh(book_lcsh) {
  try {
    const query = `INSERT INTO "books_lcsh"(
        lcsh_id,
        book_uuid
    ) VALUES ($1, $2)`;

    const params = [book_lcsh.lcsh_id, book_lcsh.book_uuid];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooks_Lcsh, addBook_Lcsh };
