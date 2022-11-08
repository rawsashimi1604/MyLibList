import setupEnv from "../src/lib/utils/setupEnv.js";
import databases from "../db/index.js";
import fs from "fs";
import { parse } from "csv-parse";

// Set up dotenv environment from .env file.
setupEnv("../../.env");

async function cleanCSVData(path) {

  const cleanedData = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        // All the keys in ur object
        let uuid = row[0];
        let uri = row[1];
        let title = row[4];
        let alternative_titles = [];
        let contributors = [];
        let digital_publisher = row[18];
        let original_publisher = row[19];
        let date_created = row[21];
        let description = row[22];
        let abstract = row[23];
        let subject_lcsh = [];
        let subjects = [];
        let languages = [];
        let collections = [];
        let nlb_type = row[28];
        let rights = row[29];
        let access_rights = row[30];

        // Logic
        if (row[1] == "NA") {
          uri = "";
        }
        if (row[5] !== "NA") {
          alternative_titles = row[5].split("|");
        }

        if (row[12] !== "NA") {
          const receiveContributors = row[12].split("|");
          const contributorToAdd = {};
          for (const contributor of receiveContributors) {
            contributorToAdd["contributor_type"] = contributor.split(":")[0];
            contributorToAdd["contributor"] = contributor.split(":")[1];
          }
          contributors.push(contributorToAdd);
        }

        if (row[18] == "NA") {
          digital_publisher = "";
        }

        if (row[19] == "NA") {
          original_publisher = "";
        }

        if (row[21] == "NA") {
          date_created = "";
        }

        if (row[22] == "NA") {
          description = "";
        }

        if (row[23] == "NA") {
          abstract = "";
        }

        if (row[24] !== "NA") {
          subject_lcsh = row[24].split("|");
        }

        if (row[25] !== "NA") {
          subjects = row[25].split("|");
        }

        if (row[26] !== "NA") {
          languages = [...new Set(row[26].split("|"))];

          // Check all languages are unique
        }

        if (row[27] !== "NA") {
          collections = row[27].split("|");
        }

        if (row[28] == "NA") {
          nlb_type = "";
        }

        if (row[29] == "NA") {
          rights = "";
        }

        if (row[30] == "NA") {
          access_rights = "";
        }
        const cleanedDataRow = {
          uuid,
          uri,
          title,
          alternative_titles,
          contributors,
          digital_publisher,
          original_publisher,
          date_created,
          description,
          abstract,
          subject_lcsh,
          subjects,
          languages,
          collections,
          nlb_type,
          rights,
          access_rights,
        };
        cleanedData.push(cleanedDataRow);
      })

      .on("end", function () {
        console.log("finished");
        resolve(cleanedData)
      })
      .on("error", function (error) {
        console.log(error.message);
        reject(error);
      });
  });
}

export default cleanCSVData;
