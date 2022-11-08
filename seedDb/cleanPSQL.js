import setupEnv from "../src/lib/utils/setupEnv.js";
import databases from "../db/index.js";
import fs from "fs";
import { parse } from "csv-parse";

// Set up dotenv environment from .env file.
setupEnv("../../.env");

// Create PostgreSQL database object (current database object in use)
const database = databases.PSQLDatabase;

// Insert cleaning algorithm here...
// ...

// [ {}, {}, {} ]
const cleanedData = [];

/*
  uuid: 0,
  uri: 1,
  alternative_titles: 5
*/

fs.createReadStream("../seedDb/csv_data/nlb_data.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {

    // All the keys in ur object
    let uuid = row[0];
    let uri = row[1];
    let alternative_titles = []

    // Logic 
    if(row[5] !== "NA") {
      alternative_titles = row[5].split("|");
    }

    const cleanedDataRow = {
      uuid, uri, alternative_titles
    }
    cleanedData.push(cleanedDataRow)
  })

  .on("end", function () {
    console.log("finished");
    console.log(cleanedData)
  })
  .on("error", function (error) {
    console.log(error.message);
  });

