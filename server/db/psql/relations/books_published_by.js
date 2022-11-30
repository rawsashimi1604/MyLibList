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

function batchInsertBooksPublishers(booksPublishersArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= booksPublishersArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(booksPublishersArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(booksPublishersArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksPublishersArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksPublishersArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== booksPublishersArray.length)
        valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "books_published_by"(
      publisher_type,
      publisher_id,
      book_uuid
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of booksPublishersArray) {
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
  getAllBooksPublishedBy,
  addBookPublishedBy,
  batchInsertBooksPublishers,
};
