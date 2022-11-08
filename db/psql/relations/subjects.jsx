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

function addSubjects(subject) {
  try {
    const query = `INSERT INTO "subjects"(
      subject_id,
      subject_title
    ) VALUES ($1, $2)`;

    const params = [subject.subject_id, subject.subject_title];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getSubjects, addSubjects };
