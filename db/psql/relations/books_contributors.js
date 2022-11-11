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

export default { getAllBookContributors, addBookContributor };
