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

function deleteBookByID(bookUUID) {
  try {
    const query = `DELETE FROM "books" WHERE book_uuid = $1 RETURNING *`;

    const params = [bookUUID];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkBookExists(bookUUID) {
  try {
    const query = `SELECT 1 FROM "books" WHERE book_uuid = $1`;
    const params = [bookUUID];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getBookByUUID(bookUUID) {
  // https://dba.stackexchange.com/questions/306694/convert-right-side-of-join-of-many-to-many-into-array-of-objects
  // https://stackoverflow.com/questions/26363742/how-to-remove-duplicates-which-are-generated-with-array-agg-postgres-function
  // https://stackoverflow.com/questions/35949485/how-to-aggregate-an-array-of-json-objects-with-postgres

  try {
    const query = `
      SELECT b.book_uuid, b.access_rights, b.abstract, b.title, b.uri, b.date_created, b.description,
      ARRAY_AGG(DISTINCT(lan.language)) AS languages,
      ARRAY_AGG(DISTINCT(sub.subject_title)) AS subjects,
      ARRAY_AGG(DISTINCT(lcsh.lcsh_tag)) AS lcsh,
      ARRAY_AGG(DISTINCT(pub.publisher)) AS publishers,
      ARRAY_AGG(DISTINCT(col.collection_title)) AS collections,
      ARRAY_AGG(DISTINCT(alt.alternative_title)) AS alternative_titles,
      JSON_STRIP_NULLS(
        JSON_AGG(
          DISTINCT JSONB_BUILD_OBJECT(
            'contributor', con.contributor,
            'contributor_type', bcon.contributor_type
          )
        )
      ) AS contributors

      FROM "books" b

      INNER JOIN "books_languages" bl
        ON b.book_uuid = bl.book_uuid
      INNER JOIN "languages" lan
        ON bl.language_id = lan.language_id

      INNER JOIN "books_subjects" bs
        ON b.book_uuid = bs.book_uuid
      INNER JOIN "subjects" sub
        ON bs.subject_id = sub.subject_id

      INNER JOIN "books_lcsh" blcsh
        ON b.book_uuid = blcsh.book_uuid
      INNER JOIN "lcsh"
        ON blcsh.lcsh_id = lcsh.lcsh_id

      INNER JOIN "books_published_by" bpub
        ON b.book_uuid = bpub.book_uuid
      INNER JOIN "publishers" pub
        ON bpub.publisher_id = pub.publisher_id

      INNER JOIN "books_in_collections" bcol
        ON b.book_uuid = bcol.book_uuid
      INNER JOIN "collections" col
        ON bcol.collection_id = col.collection_id

      INNER JOIN "alternative_titles" alt
        ON b.book_uuid = alt.book_uuid

      INNER JOIN "books_contributors" bcon
        ON b.book_uuid = bcon.book_uuid
      INNER JOIN "contributors" con
        ON bcon.contributor_id = con.contributor_id

      WHERE b.book_uuid = $1
      GROUP BY b.book_uuid, b.access_rights, b.abstract, b.title, b.uri, b.date_created, b.description
    `;
    const params = [bookUUID];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllBooks,
  addBook,
  deleteBookByID,
  checkBookExists,
  getBookByUUID,
};
