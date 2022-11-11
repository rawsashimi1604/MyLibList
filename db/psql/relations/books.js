import db from "../config.js";

function getAllBooks() {
  try {
    const query = `SELECT * FROM "books"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBook(book) {
  try {
    const query = `INSERT INTO "books"(
      book_uuid,
      access_rights,
      rights,
      abstract,
      title,
      uri,
      date_created,
      description
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;

    const params = [
      book.book_uuid,
      book.access_rights,
      book.rights,
      book.abstract,
      book.title,
      book.uri,
      book.date_created,
      book.description,
    ];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooks, addBook };
