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
        alternative_title,
        book_uuid
    ) VALUES ($1, $2) RETURNING *`;

    const params = [altTitles.alternative_title, altTitles.book_uuid];

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function batchInsertAltTitles(altTitleArray) {
  try {
    let valuesQuery = "VALUES ";

    let count = 1;

    // Insert 8 times
    // ($1, $2, $3, $4, $5, $6, $7, $8)
    for (let i = 1; i <= altTitleArray.length; i++) {
      let str = "(";
      for (let j = 1; j <= Object.keys(altTitleArray[0]).length; j++) {
        // Last iteration dun add comma
        if (j === Object.keys(altTitleArray[0]).length)
          str = str.concat(
            `$${j + (i - 1) * Object.keys(altTitleArray[0]).length}`
          );
        else
          str = str.concat(
            `$${j + (i - 1) * Object.keys(altTitleArray[0]).length},`
          );
      }
      str = str.concat(")");
      valuesQuery = valuesQuery.concat(str);

      if (i !== altTitleArray.length) valuesQuery = valuesQuery.concat(",");
    }

    const query = `INSERT INTO "alternative_titles"(
      alternative_title,
        book_uuid
    ) ${valuesQuery} RETURNING *`;

    const params = [];
    for (const book of altTitleArray) {
      for (const value of Object.values(book)) {
        params.push(value);
      }
    }

    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllAltTitles, addAltTitles, batchInsertAltTitles };
