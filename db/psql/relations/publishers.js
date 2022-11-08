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

function addPublisher(publisher) {
  try {
    const query = `INSERT INTO "publishers"(
        publisher_id,
        publisher
    ) VALUES ($1, $2)`;

    const params = [publisher.publisher_id, publisher.publisher_id];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllPublishers, addPublisher };
