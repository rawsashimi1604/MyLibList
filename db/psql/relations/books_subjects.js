import db from "../config.js";

function getBooksSubjects() {
  try {
    const query = `SELECT * FROM "books_subjects"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addBooksSubjects(booksSubjects) {
  try {
    const query = `INSERT INTO "books_subjects"(
      subject_id,
      book_uuid
    ) VALUES ($1, $2) RETURNING *`;

    const params = [booksSubjects.subject_id, booksSubjects.book_uuid];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getBooksSubjects, addBooksSubjects };
