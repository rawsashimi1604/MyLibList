import db from "../config.js";

function getSubjects() {
  try {
    const query = `SELECT * FROM "subjects"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getSubjectIdBySubject(subject) {
  try {
    const query = `
      SELECT subject_id FROM "subjects"
      WHERE subject_title = $1;
    `;

    const params = [
      subject
    ]
    
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addSubjects(subject) {
  try {
    const query = `INSERT INTO "subjects"(
      subject_title
    ) VALUES ($1) RETURNING *`;

    const params = [subject];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getSubjects, getSubjectIdBySubject, addSubjects };
