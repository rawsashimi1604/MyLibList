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

    const params = [language];

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

    const params = [language];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertLanguages(languageArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    for (const language of languageArray) {
      if (count === languageArray.length) {
        valuesQuery = valuesQuery.concat(`($${count})`);
      } else {
        valuesQuery = valuesQuery.concat(`($${count}),`);
      }

      count++;
    }

    const query = `INSERT INTO "languages"(
      language
    ) ${valuesQuery} RETURNING *`;

    const params = languageArray;
    console.log(query);
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getLanguages,
  getLanguageIdByLanguage,
  addLanguages,
  batchInsertLanguages,
};
