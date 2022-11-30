import db from "../config.js";

function getAllBooksInCollections() {
  try {
    const query = `SELECT * FROM "books_in_collections"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookInCollections(booksInCollections) {
  try {
    const query = `INSERT INTO "books_in_collections"(
        collection_id,
        book_uuid
    ) VALUES ($1, $2) RETURNING *`;

    const params = [
      booksInCollections.collection_id,
      booksInCollections.book_uuid,
    ];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertBooksCollections(booksCollectionsArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= booksCollectionsArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(booksCollectionsArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(booksCollectionsArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksCollectionsArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksCollectionsArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== booksCollectionsArray.length)
        valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "books_in_collections"(
      collection_id,
      book_uuid
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of booksCollectionsArray) {
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
  getAllBooksInCollections,
  addBookInCollections,
  batchInsertBooksCollections,
};
