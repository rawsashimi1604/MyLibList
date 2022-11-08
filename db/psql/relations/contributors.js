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

function getContributorIDByContributor(contributor) {
    try {
      const query = `
        SELECT contributor_id FROM "contributors"
        WHERE contributor = $1;
      `;
  
      const params = [
        contributor
      ]
      
      return db.query(query, params);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

function addContributor(contributor) {
    try {
        const query = `INSERT INTO "contributors"(
        contributor
    ) VALUES ($1) RETURNING *`;

        const params = [
            contributor,
        ]

        return db.query(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default { getAllContributors, addContributor, getContributorIDByContributor };