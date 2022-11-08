import db from "../config.js";

function getAllBooksPublishedBy() {
  try {
    const query = `SELECT * FROM "books_published_by"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookPublishedBy(bookPublishedBy) {
  try {
    const query = `INSERT INTO "books_published_by"(
        publisher_type,
        publisher_id,
        book_uuid
    ) VALUES ($1, $2, $3)`;

    const params = [
      bookPublishedBy.publisher_type,
      bookPublishedBy.publisher_id,
      bookPublishedBy.book_uuid,
    ];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooksPublishedBy, addBookPublishedBy };
