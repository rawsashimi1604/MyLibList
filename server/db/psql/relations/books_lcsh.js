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

function batchInsertBooksLCSH(booksLCSHArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= booksLCSHArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(booksLCSHArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(booksLCSHArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksLCSHArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksLCSHArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== booksLCSHArray.length) valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "books_lcsh"(
      lcsh_id,
        book_uuid
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of booksLCSHArray) {
      for (const value of Object.values(book)) {
        params.push(value);
      }
    }

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooksLcsh, addBookLcsh, batchInsertBooksLCSH };
