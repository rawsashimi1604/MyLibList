import db from "../config.js";

function getBooksLanguages() {
  try {
    const query = `SELECT * FROM "books_languages"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBooksLanguages(booksLanguages) {
  try {
    const query = `INSERT INTO "books_languages"(
      book_uuid,
      language_id
    ) VALUES ($1, $2) RETURNING *`;

    const params = [booksLanguages.book_uuid, booksLanguages.language_id];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    language_id;
    throw err;
  }
}

function batchInsertBooksLanguages(booksLanguagesArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= booksLanguagesArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(booksLanguagesArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(booksLanguagesArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksLanguagesArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksLanguagesArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== booksLanguagesArray.length)
        valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "books_languages"(
      book_uuid,
      language_id
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of booksLanguagesArray) {
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

export default {
  getBooksLanguages,
  addBooksLanguages,
  batchInsertBooksLanguages,
};
