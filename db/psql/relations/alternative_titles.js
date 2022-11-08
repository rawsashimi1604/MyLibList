import db from "../config.js";

function getAllAltTitles() {
    try {
        const query = `SELECT * FROM "alternative_titles"`;
        return db.query(query);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function addAltTitles(altTitles) {
    try {
        const query = `INSERT INTO "alternative_titles"(
        alternative_title_id,
        alternate_title,
        book_uuid
    ) VALUES ($1, $2, $3)`;

        const params = [
            altTitles.alternative_title_id,
            altTitles.alternate_title,
            altTitles.book_uuid,
        ]

        return db.query(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default { getAllAltTitles, addAltTitles };