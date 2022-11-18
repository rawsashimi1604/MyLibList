import cleanCSVData from "./cleanPSQL.js";
import setupEnv from "../src/lib/utils/setupEnv.js";
import databases from "../db/index.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

console.log("STARTING SCRIPT...\n\n\n");

// Create PostgreSQL database object (current database object in use)
const database = databases.PSQLDatabase;

console.log("seed script");
const booksFromCSV = await cleanCSVData("./seedDb/csv_data/nlb_data.csv");

async function batchSeedData(data, insertFunction) {
  // Insert into database... (1000 at a time)
  for (let i = 0; i < Math.ceil(data.length / 1000); i++) {
    await insertFunction(data.slice(i * 1000, i * 1000 + 1000));
  }
}

async function seedLanguages() {
  return new Promise(async (resolve, reject) => {
    console.log("Seeding languages");
    const allLanguages = [];

    // Scan all languages in csv to database
    for (const row of booksFromCSV) {
      const languages = row.languages;

      for (const language of languages) {
        if (!allLanguages.includes(language)) {
          allLanguages.push(language);
        }
      }
    }

    await batchSeedData(
      allLanguages,
      database.relations.languages.batchInsertLanguages
    );
    console.log("Languages seeded finish!");
    resolve();
  });
}

async function seedCollections() {
  return new Promise(async (resolve, reject) => {
    console.log("Seeding collections");
    const allCollections = [];

    // Scan all languages in csv to database
    for (const row of booksFromCSV) {
      const collections = row.collections;

      for (const collection of collections) {
        if (!allCollections.includes(collection)) {
          allCollections.push(collection);
        }
      }
    }

    await batchSeedData(
      allCollections,
      database.relations.collections.batchInsertCollections
    );
    console.log("Collections seeded finish!");
    resolve();
  });
}

async function seedSubjects() {
  return new Promise(async (resolve, reject) => {
    console.log("Seeding subjects...");
    const allSubjects = [];

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {
      const subjects = row.subjects;

      for (const subject of subjects) {
        if (!allSubjects.includes(subject)) {
          allSubjects.push(subject);
        }
      }
    }

    await batchSeedData(
      allSubjects,
      database.relations.subjects.batchInsertSubjects
    );
    console.log("Subjects seeded finish!");
    resolve();
  });
}

async function seedContributors() {
  return new Promise(async (resolve, reject) => {
    console.log("Seeding contributors...");
    const allContributors = [];

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {
      const contributors = row.contributors;

      for (const contributor of contributors) {
        if (!allContributors.includes(contributor.contributor)) {
          allContributors.push(contributor.contributor);
        }
      }
    }

    await batchSeedData(
      allContributors,
      database.relations.contributors.batchInsertContributors
    );

    console.log("Contributors seeded finish!");
    resolve();
  });
}

async function seedLCSH() {
  return new Promise(async (resolve, reject) => {
    console.log("Seeding LCSH...");
    const allLCSH = [];

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {
      const lcsh = row.subject_lcsh;

      for (const singleLCSH of lcsh) {
        if (!allLCSH.includes(singleLCSH)) {
          allLCSH.push(singleLCSH);
        }
      }
    }

    await batchSeedData(allLCSH, database.relations.lcsh.batchInsertLCSH);
    console.log("LCSH seeded finish!");
    resolve();
  });
}

async function seedPublishers() {
  return new Promise(async (resolve, reject) => {
    const allPublishers = [];

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {
      const original_publisher = row.original_publisher;
      const digital_publisher = row.digital_publisher;

      for (const publisher of original_publisher) {
        if (!allPublishers.includes(publisher)) {
          allPublishers.push(publisher);
        }
      }
      for (const publisher of digital_publisher) {
        if (!allPublishers.includes(publisher)) {
          allPublishers.push(publisher);
        }
      }
    }

    await batchSeedData(
      allPublishers,
      database.relations.publishers.batchInsertPublishers
    );

    console.log("Publisher seeded finish!");
    resolve();
  });
}

async function seedBooks() {
  return new Promise(async (resolve, reject) => {
    let bookCounter = 0;
    let booksToSeed = 5000;

    let booksCache = [];
    let booksLanguagesCache = [];
    let booksSubjectsCache = [];
    let booksLCSHCache = [];
    let booksPublishedByDigitalCache = [];
    let booksPublishedByOriginalCache = [];
    let booksInCollectionsCache = [];
    let altTitlesCache = [];
    let booksContributorCache = [];

    // Add books
    for (const book of booksFromCSV.slice(0, booksToSeed)) {
      const booksRelation = {
        book_uuid: book.uuid,
        access_rights: book.access_rights,
        rights: book.rights,
        abstract: book.abstract,
        title: book.title,
        uri: book.uri,
        date_created: book.date_created,
        description: book.description,
      };

      // Push to books cache
      booksCache.push(booksRelation);

      // Add books_languages
      for (const bookLanguage of book.languages) {
        const languageIDFromDB =
          await database.relations.languages.getLanguageIdByLanguage(
            bookLanguage
          );

        const bookLanguageRelation = {
          book_uuid: book.uuid,
          language_id: languageIDFromDB.rows[0].language_id,
        };

        booksLanguagesCache.push(bookLanguageRelation);
      }

      // Add books_subjects
      for (const bookSubject of book.subjects) {
        const subjectIDFromDB =
          await database.relations.subjects.getSubjectIdBySubject(bookSubject);

        const bookSubjectRelation = {
          subject_id: subjectIDFromDB.rows[0].subject_id,
          book_uuid: book.uuid,
        };

        booksSubjectsCache.push(bookSubjectRelation);
      }

      // books_lcsh
      for (const bookLCSH of book.subject_lcsh) {
        const lcshIDFromDB = await database.relations.lcsh.getLCSHIdByLCSH(
          bookLCSH
        );

        const bookLCSHRelation = {
          lcsh_id: lcshIDFromDB.rows[0].lcsh_id,
          book_uuid: book.uuid,
        };

        booksLCSHCache.push(bookLCSHRelation);
      }

      // Add books_published_by (digital)
      for (const bookPublishedBy of book.digital_publisher) {
        const bookPublisherID =
          await database.relations.publishers.getPublishedByIDByPublisher(
            bookPublishedBy
          );

        const bookPublisherRelation = {
          publisher_type: "Digital",
          publisher_id: bookPublisherID.rows[0].publisher_id,
          book_uuid: book.uuid,
        };

        booksPublishedByDigitalCache.push(bookPublisherRelation);
      }

      // Add books_published_by (original)
      for (const bookPublishedBy of book.original_publisher) {
        const bookPublisherID =
          await database.relations.publishers.getPublishedByIDByPublisher(
            bookPublishedBy
          );

        const bookPublisherRelation = {
          publisher_type: "Original",
          publisher_id: bookPublisherID.rows[0].publisher_id,
          book_uuid: book.uuid,
        };

        booksPublishedByOriginalCache.push(bookPublisherRelation);
      }

      // Add books in collections
      for (const bookCollection of book.collections) {
        const collectionIDFromDB =
          await database.relations.collections.getCollectionIDByCollection(
            bookCollection
          );

        const bookCollectionRelation = {
          collection_id: collectionIDFromDB.rows[0].collection_id,
          book_uuid: book.uuid,
        };

        booksInCollectionsCache.push(bookCollectionRelation);
      }

      // Add alternative titles
      for (const altTitle of book.alternative_titles) {
        const altTitleRelation = {
          alternative_title: altTitle,
          book_uuid: book.uuid,
        };

        altTitlesCache.push(altTitleRelation);
      }

      bookCounter++;
      console.log(
        `${booksRelation.book_uuid} added. progress: ${
          bookCounter
        }/${booksToSeed}`
      );
    }

    bookCounter = 0;

    await batchSeedData(booksCache, database.relations.books.batchInsertBooks);
    await batchSeedData(
      booksLanguagesCache,
      database.relations.books_languages.batchInsertBooksLanguages
    );
    await batchSeedData(
      booksSubjectsCache,
      database.relations.books_subjects.batchInsertBooksSubjects
    );
    await batchSeedData(
      booksLCSHCache,
      database.relations.books_lcsh.batchInsertBooksLCSH
    );
    await batchSeedData(
      booksPublishedByDigitalCache,
      database.relations.books_published_by.batchInsertBooksPublishers
    );
    await batchSeedData(
      booksPublishedByOriginalCache,
      database.relations.books_published_by.batchInsertBooksPublishers
    );
    await batchSeedData(
      booksInCollectionsCache,
      database.relations.books_in_collections.batchInsertBooksCollections
    );
    await batchSeedData(
      altTitlesCache,
      database.relations.alternative_titles.batchInsertAltTitles
    );

    for (const book of booksFromCSV.slice(0, booksToSeed)) {
      const booksRelation = {
        book_uuid: book.uuid,
        access_rights: book.access_rights,
        rights: book.rights,
        abstract: book.abstract,
        title: book.title,
        uri: book.uri,
        date_created: book.date_created,
        description: book.description,
      };

      // Add books contributors
      for (const bookContributor of book.contributors) {
        const contributorIDFromDB =
          await database.relations.contributors.getContributorIDByContributor(
            bookContributor.contributor
          );

        const bookContributorRelation = {
          contributor_id: contributorIDFromDB.rows[0].contributor_id,
          book_uuid: booksRelation.book_uuid,
          contributor_type: bookContributor.contributor_type,
        };

        // console.log(bookContributorRelation);
        booksContributorCache.push(bookContributorRelation);
      }
      bookCounter++;
      console.log(
        `${booksRelation.book_uuid} contributor added. progress: ${
          bookCounter
        }/${booksToSeed}`
      );
    }

    
    await batchSeedData(
      booksContributorCache,
      database.relations.books_contributors.batchInsertBooksContributors
    );
    
    resolve();
  });
}

await seedLanguages();
await seedSubjects();
await seedLCSH();
await seedPublishers();
await seedCollections();
await seedContributors();
await seedBooks();

console.log("\n\n\nSCRIPT HAS FINISHED.......");
console.log("STARTING API APP.......\n\n\n");
