import db from "../config.js";

function getAllCollections() {
  try {
    const query = `SELECT * FROM "collections"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getCollectionIDByCollection(collection) {
  try {
    const query = `
        SELECT collection_id FROM "collections"
        WHERE collection_title = $1;
      `;

    const params = [collection];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addCollection(collection) {
  try {
    const query = `INSERT INTO "collections"(
        collection_title
    ) VALUES ($1) RETURNING *`;

    const params = [collection];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertCollections(collectionArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    for (const collection of collectionArray) {
      if (count === collectionArray.length) {
        valuesQuery = valuesQuery.concat(`($${count})`);
      } else {
        valuesQuery = valuesQuery.concat(`($${count}),`);
      }

      count++;
    }

    const query = `INSERT INTO "collections"(
      collection_title
    ) ${valuesQuery} RETURNING *`;

    const params = collectionArray;
    console.log(query);
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllCollections,
  addCollection,
  getCollectionIDByCollection,
  batchInsertCollections,
};
