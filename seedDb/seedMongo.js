import cleanCSVData from "./cleanPSQL.js";
import setupEnv from "../src/lib/utils/setupEnv.js";
import databases from "../db/index.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

console.log("STARTING MONGO SCRIPT...\n\n\n");

const database = databases.MongoDatabase;

console.log("seed script");
const booksFromCSV = await cleanCSVData("./seedDb/csv_data/nlb_data.csv");

const NUMBER_OF_BOOKS_TO_ADD = booksFromCSV.length;

async function batchSeedData(data, insertFunction) {
  // Insert into database... (1000 at a time)
  for (let i = 0; i < Math.ceil(data.length / 1000); i++) {
    await insertFunction(data.slice(i * 1000, i * 1000 + 1000));
  }
}

function getBooksFormatted() {
  let booksExampleCache = [];

  let count = 0;
  for (const book of booksFromCSV.slice(0, NUMBER_OF_BOOKS_TO_ADD)) {
    // if (count === 5) break;
    const publisherArr = [];
    for (const publisher of book.digital_publisher) {
      if (!(publisher in publisherArr)) publisherArr.push(publisher);
    }

    for (const publisher of book.original_publisher) {
      if (!(publisher in publisherArr)) publisherArr.push(publisher);
    }

    const booksExample = {
      book_uuid: book.uuid,
      access_rights: book.access_rights,
      abstract: book.abtract,
      title: book.title,
      uri: book.uri,
      date_created: book.date_created,
      description: book.description,
      languages: book.languages,
      subjects: book.subjects,
      lcsh: book.subject_lcsh,
      publishers: publisherArr,
      collections: book.collections,
      alternative_titles: book.alternative_titles,
      contributors: book.contributors,
      likes: 0,
    };
    booksExampleCache.push(booksExample);
    count++;
  }
  return booksExampleCache;
}

async function seedMongo() {
  // Create collections
  database.setup();
  const booksData = getBooksFormatted();
  const options = { ordered: true };
  const client = await database.client();
  const db = client.db("defaultdb");
  const books = db.collection("books");
  const result = await books.insertMany(booksData, options);
  console.log("inserted books...");
  // const index = await books.createIndex(
  //   {
  //     title: 1,
  //     // alternative_titles: 1,
  //     // subjects: 1,
  //     // publishers: 1,
  //     // contributors: 1,
  //     // languages: 1,
  //   },
  //   { name: "query for books" }
  // );
  await client.close();
}

await seedMongo();

console.log("\n\n\nSCRIPT HAS FINISHED.......");
console.log("STARTING API APP.......\n\n\n");

// node seedDb/seedMongo.js
