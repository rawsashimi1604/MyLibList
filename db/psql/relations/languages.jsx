import db from "../config.js";

function getLanguages() {
  try {
    const query = `SELECT * FROM "languages"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addLanguages(language) {
  try {
    const query = `INSERT INTO "languages"(
      language_id
    ) VALUES ($1)`;

    const params = [
      language.language_id
    ]
    
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getLanguages, addLanguages };