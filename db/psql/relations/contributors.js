import db from "../config.js";

function getAllContributors() {
    try {
        const query = `SELECT * FROM "contributors"`;
        return db.query(query);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function addContributor(contributor) {
    try {
        const query = `INSERT INTO "contributors"(
        contributor_id,
        contributor
    ) VALUES ($1, $2)`;

        const params = [
            contributor.contributor_id,
            contributor.contributor,
        ]

        return db.query(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default { getAllContributors, addContributor };