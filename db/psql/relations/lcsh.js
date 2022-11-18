import db from "../config.js";

function getAllLcsh() {
  try {
    const query = `SELECT * FROM "lcsh"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getLCSHIdByLCSH(lcsh) {
  try {
    const query = `
      SELECT lcsh_id FROM "lcsh"
      WHERE lcsh_tag = $1;
    `;

    const params = [lcsh];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addLcsh(lcsh) {
  try {
    const query = `INSERT INTO "lcsh"(
      lcsh_tag
    ) VALUES ($1) RETURNING *`;

    const params = [lcsh];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertLCSH(lcshArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    for (const lcsh of lcshArray) {
      if (count === lcshArray.length) {
        valuesQuery = valuesQuery.concat(`($${count})`);
      } else {
        valuesQuery = valuesQuery.concat(`($${count}),`);
      }

      count++;
    }

    const query = `INSERT INTO "lcsh"(
      lcsh_tag
    ) ${valuesQuery} RETURNING *`;

    const params = lcshArray;
    console.log(query);
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllLcsh, getLCSHIdByLCSH, addLcsh, batchInsertLCSH };
