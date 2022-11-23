import db from "../config.js";

function getAllReadingList() {
  try {
    const query = `SELECT * FROM "reading_lists"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addReadingList(readingList) {
  try {
    const query = `INSERT INTO "reading_lists"(
            name,
            timestamp_created_on,
            email
          ) VALUES ($1, $2, $3) RETURNING *`;

    const params = [
      readingList.name,
      readingList.timestamp_created_on,
      readingList.email,
    ];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getReadingListByID(readingListID) {
  try {
    const query = `SELECT * FROM "reading_lists" WHERE reading_list_id = $1`;

    const params = [readingListID];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function deleteReadingListByID(reading_list_id) {
  try {
    const query = `DELETE FROM "reading_lists" WHERE reading_list_id = $1 RETURNING *`;
    const params = [reading_list_id];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getAllReadingListsByEmail(email) {
  try {
    const query = `
      SELECT * FROM "reading_lists" WHERE email = $1
    `;
    const params = [email];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllReadingList,
  addReadingList,
  getReadingListByID,
  deleteReadingListByID,
  getAllReadingListsByEmail,
};
