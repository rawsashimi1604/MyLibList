import db from "../config.js";

function getAllPublishers() {
  try {
    const query = `SELECT * FROM "publishers"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getPublishedByIDByPublisher(publisher) {
  try {
    const query = `
      SELECT publisher_id FROM "publishers"
      WHERE publisher = $1;
    `;

    const params = [publisher];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addPublisher(publisher) {
  try {
    const query = `INSERT INTO "publishers"(
        publisher
    ) VALUES ($1) RETURNING *`;

    const params = [publisher];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllPublishers, addPublisher, getPublishedByIDByPublisher };
