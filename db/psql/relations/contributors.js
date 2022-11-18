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

    const params = [contributor];

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

    const params = [contributor];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertContributors(contributorsArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    for (const contributor of contributorsArray) {
      if (count === contributorsArray.length) {
        valuesQuery = valuesQuery.concat(`($${count})`);
      } else {
        valuesQuery = valuesQuery.concat(`($${count}),`);
      }

      count++;
    }

    const query = `INSERT INTO "contributors"(
      contributor
    ) ${valuesQuery} RETURNING *`;

    const params = contributorsArray;
    console.log(query);
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllContributors,
  addContributor,
  getContributorIDByContributor,
  batchInsertContributors,
};
