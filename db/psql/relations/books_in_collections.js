import db from "../config.js";

function getAllBooksInCollections() {
    try {
        const query = `SELECT * FROM "books_in_collections"`;
        return db.query(query);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function addBookInCollections(booksInCollections) {
    try {
        const query = `INSERT INTO "books_in_collections"(
        collection_id,
        book_uuid
    ) VALUES ($1, $2) RETURNING *` ;

        const params = [
            booksInCollections.collection_id,
            booksInCollections.book_uuid,
        ]

        return db.query(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default { getAllBooksInCollections, addBookInCollections };