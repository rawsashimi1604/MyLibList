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

function addCollection(collection) {
    try {
        const query = `INSERT INTO "collections"(
        collection_id,
        collection_title
    ) VALUES ($1, $2)`;

        const params = [
            collection.collection_id,
            collection.collection_title,
        ]

        return db.query(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default { getAllCollections, addCollection };