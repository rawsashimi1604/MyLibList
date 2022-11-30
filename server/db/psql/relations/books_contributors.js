import db from "../config.js";

function getAllBookContributors() {
  try {
    const query = `SELECT * FROM "books_contributors"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBookContributor(bookContributor) {
  try {
    const query = `INSERT INTO "books_contributors"(
        contributor_id,
        book_uuid,
        contributor_type
    ) VALUES ($1, $2, $3) RETURNING *`;

    const params = [
      bookContributor.contributor_id,
      bookContributor.book_uuid,
      bookContributor.contributor_type,
    ];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertBooksContributors(booksContributorsArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= booksContributorsArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(booksContributorsArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(booksContributorsArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksContributorsArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksContributorsArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== booksContributorsArray.length)
        valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "books_contributors"(
      contributor_id,
      book_uuid,
      contributor_type
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of booksContributorsArray) {
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
  getAllBookContributors,
  addBookContributor,
  batchInsertBooksContributors,
};
