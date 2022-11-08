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

function getLanguageIdByLanguage(language) {
  try {
    const query = `
      SELECT language_id FROM "languages"
      WHERE language = $1;
    `;

    const params = [
      language
    ]
    
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addLanguages(language) {
  try {
    const query = `INSERT INTO "languages"(
      language
    ) VALUES ($1) RETURNING *`;

    const params = [
      language
    ]
    
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getLanguages, getLanguageIdByLanguage, addLanguages };