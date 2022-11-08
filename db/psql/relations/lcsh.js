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

function addLcsh(lcsh) {
  try {
    const query = `INSERT INTO "lcsh"(
      lcsh_id,
      lcsh_tag
    ) VALUES ($1, $2)`;

    const params = [lcsh.lcsh_id, lcsh.lcsh_tag];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllLcsh, addLcsh };
