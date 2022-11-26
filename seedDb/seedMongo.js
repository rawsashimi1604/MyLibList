import cleanCSVData from "./cleanPSQL.js";
import setupEnv from "../src/lib/utils/setupEnv.js";
import databases from "../db/index.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

console.log("STARTING MONGO SCRIPT...\n\n\n");

const database = databases.MongoDatabase;

console.log("seed script");
const booksFromCSV = await cleanCSVData("./seedDb/csv_data/nlb_data.csv");

const NUMBER_OF_BOOKS_TO_ADD = 10000;

async function batchSeedData(data, insertFunction) {
  // Insert into database... (1000 at a time)
  for (let i = 0; i < Math.ceil(data.length / 1000); i++) {
    await insertFunction(data.slice(i * 1000, i * 1000 + 1000));
  }
}

function getBooksFormatted() {
  let booksExampleCache = [];

  for (const book of booksFromCSV.slice(0, NUMBER_OF_BOOKS_TO_ADD)) {
    const booksExample = {
      book_uuid: book.uuid,
      access_rights: book.access_rights,
      abtract: book.abtract,
      title: book.title,
      uri: book.uri,
      date_created: book.date_created,
      description: book.description,
      languages: book.languages,
      subjects: book.subjects,
      lcsh: book.lcsh,
      publishers: book.publishers,
      collections: book.collections,
      alternative_title: book.alternative_title,
      contributors: book.contributors[0],
      likes: 0,
    };
    booksExampleCache.push(booksExample);
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
  await client.close();
}

await seedMongo();

console.log("\n\n\nSCRIPT HAS FINISHED.......");
console.log("STARTING API APP.......\n\n\n");

// node seedDb/seedMongo.js
