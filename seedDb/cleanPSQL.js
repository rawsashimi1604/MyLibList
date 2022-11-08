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

fs.createReadStream("../seedDb/csv_data/nlb_data.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  })

  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
