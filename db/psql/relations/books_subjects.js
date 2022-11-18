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

function batchInsertBooksSubjects(booksSubjectsArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= booksSubjectsArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(booksSubjectsArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(booksSubjectsArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksSubjectsArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(booksSubjectsArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== booksSubjectsArray.length)
        valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "books_subjects"(
      subject_id,
      book_uuid
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of booksSubjectsArray) {
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

export default { getBooksSubjects, addBooksSubjects, batchInsertBooksSubjects };
