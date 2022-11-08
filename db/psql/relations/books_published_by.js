import db from "../config.js";

function getAllBooks_Published_By() {
  try {
    const query = `SELECT * FROM "books_published_by"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBook_Published_By(book_published_by) {
  try {
    const query = `INSERT INTO "books_published_by"(
        publisher_type,
        publisher_id,
        book_uuid
    ) VALUES ($1, $2, $3)`;

    const params = [
      book_published_by.publisher_type,
      book_published_by.publisher_id,
      book_published_by.book_uuid,
    ];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllBooks_Published_By, addBook_Published_By };
