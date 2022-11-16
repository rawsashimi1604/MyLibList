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

export default { getBooksLanguages, addBooksLanguages, getBooksLanguageByUUID };
