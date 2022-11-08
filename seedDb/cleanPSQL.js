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
    let title = row[4];
    let alternative_titles = []
    let contributors = []
    let digital_publisher = row[18]
    let original_publisher = row[19]
    let year_created = row[21]
    let description = row[22]
    let abstract = row[23]
    let subject_lcsh = []
    let subjects = []
    let languages = []
    let collections = []
    let nlb_type = row[28]
    let rights = row[29]
    let access_rights = row[30]

    // Logic 
    if(row[1] == "NA"){
        uri = ""
    }
    if(row[5] !== "NA") {
      alternative_titles = row[5].split("|");
    }

    if(row[12] !== "NA"){
        const receiveContributors = row[12].split("|");
        const contributorToAdd = {};
        for(const contributor of receiveContributors){
            contributorToAdd["contributor_type"] = contributor.split(":")[0];
            contributorToAdd["contributor"] = contributor.split(":")[1];
        }
        contributors.push(contributorToAdd);
    }

    /*
        Owner:Meridian Junior College|Lender:Meridian Junior College
        contributors: [
            {
                contributor_type: "Owner"
                contributor: "Meridian Junior College"
            },
            {
                contributor_type: "Lender"
                contributor: "Meridian Junior College"
            },
        ]
    */

    if(row[18] == "NA"){
        digital_publisher = ""
    }

    if(row[19] == "NA"){
        original_publisher = ""
    }

    if(row[21] == "NA"){
        year_created = ""
    }

    if(row[22] == "NA"){
        description = ""
    }

    if(row[23] == "NA"){
        abstract = ""
    }

    if(row[24] !== "NA"){
        subject_lcsh = row[24].split("|")
    }

    if(row[25] !== "NA"){
        subjects = row[25].split("|")
    }

    if(row[26] !== "NA"){
        languages = row[26].split("|")
    }

    if(row[27] !== "NA"){
        collections = row[27].split("|")
    }

    if(row[28] == "NA"){
        nlb_type = ""
    }

    if(row[29] == "NA"){
        rights = ""
    }

    if(row[30] == "NA"){
        access_rights = ""
    }
    const cleanedDataRow = {
      uuid, uri, title, alternative_titles, contributors, digital_publisher, original_publisher, year_created,
      description, abstract, subject_lcsh, subjects, languages, collections,
      nlb_type, rights, access_rights
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

