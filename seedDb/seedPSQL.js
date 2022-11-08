import cleanCSVData from "./cleanPSQL.js";
import setupEnv from "../src/lib/utils/setupEnv.js";
import databases from "../db/index.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

console.log("STARTING SCRIPT...\n\n\n")
// Create PostgreSQL database object (current database object in use)
const database = databases.PSQLDatabase;

// Insert seeding algorithm here...
// ...

console.log("seed script");
const booksFromCSV = await cleanCSVData("./seedDb/csv_data/nlb_data.csv");

async function seedLanguages() {

  return new Promise(async (resolve, reject) => {
    const allLanguages = []

    // Scan all languages in csv to database
    for (const row of booksFromCSV) {

      const languages = row.languages;

      for (const language of languages) {
        if (!allLanguages.includes(language)) {
          allLanguages.push(language);
        }
      }
    }

    for (const language of allLanguages) {
      const languageResult = await database.relations.languages.addLanguages(language);
      console.log(languageResult.rows[0]);
    }

    console.log("Languages seeded finish!")
    resolve();
  })
}

async function seedSubjects() {

  return new Promise(async (resolve, reject) => {
    const allSubjects = []

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {

      const subjects = row.subjects;

      for (const subject of subjects) {
        if (!allSubjects.includes(subject)) {
          allSubjects.push(subject);
        }
      }
    }

    for (const subject of allSubjects) {
      const subjectResult = await database.relations.subjects.addSubjects(subject);
      console.log(subjectResult.rows[0]);
    }

    console.log("Subjects seeded finish!")
    resolve();
  })
}

async function seedLCSH() {

  return new Promise(async (resolve, reject) => {
    const allLCSH = []

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {

      const lcsh = row.subject_lcsh;

      for (const singleLCSH of lcsh) {
        if (!allLCSH.includes(singleLCSH)) {
          allLCSH.push(singleLCSH);
        }
      }
    }

    for (const singleLCSH of allLCSH) {
      const lcshResult = await database.relations.lcsh.addLcsh(singleLCSH);
      console.log(lcshResult.rows[0]);
    }

    console.log("LCSH seeded finish!")
    resolve();
  })
}

async function seedPublishers() {

  return new Promise(async (resolve, reject) => {
    const allPublishers = []

    // Scan all subjects in csv to database
    for (const row of booksFromCSV) {

      const subjects = row.subjects;

      for (const subject of subjects) {
        if (!allSubjects.includes(subject)) {
          allSubjects.push(subject);
        }
      }
    }

    for (const subject of allSubjects) {
      const subjectResult = await database.relations.subjects.addSubjects(subject);
      console.log(subjectResult.rows[0]);
    }

    console.log("Subjects seeded finish!")
    resolve();
  })
}

async function seedBooks() {

  return new Promise(async (resolve, reject) => {

    let bookCounter = 0;
    let totalBooks = booksFromCSV.length;

    // Add books
    for (const book of booksFromCSV) {

      if (bookCounter > 41000) {

      
      const booksRelation = {
        book_uuid: book.uuid,
        access_rights: book.access_rights,
        rights: book.rights,
        abstract: book.abstract,
        title: book.title,
        uri: book.uri,
        date_created: book.date_created,
        description: book.description
      }

      const booksResult = await database.relations.books.addBook(booksRelation);
      // console.log(booksResult.rows[0]);

      // Add books_languages
      for (const bookLanguage of book.languages) {
        const languageIDFromDB = await database.relations.languages.getLanguageIdByLanguage(bookLanguage)

        const bookLanguageRelation = {
          book_uuid: book.uuid,
          language_id: languageIDFromDB.rows[0].language_id
        };

        const booksLanguageResult = await database.relations.books_languages.addBooksLanguages(bookLanguageRelation)
        // console.log(booksLanguageResult.rows[0]);
      }

      // Add books_subjects
      for (const bookSubject of book.subjects) {
        const subjectIDFromDB = await database.relations.subjects.getSubjectIdBySubject(bookSubject);

        const bookSubjectRelation = {
          subject_id : subjectIDFromDB.rows[0].subject_id,
          book_uuid : book.uuid
        }

        const booksSubjectResult = await database.relations.books_subjects.addBooksSubjects(bookSubjectRelation)
        // console.log(booksSubjectResult.rows[0]);
      }

      // books_lcsh
      for (const bookLCSH of book.subject_lcsh) {
        const lcshIDFromDB = await database.relations.lcsh.getLCSHIdByLCSH(bookLCSH);

        const bookLCSHRelation = {
          lcsh_id : lcshIDFromDB.rows[0].lcsh_id,
          book_uuid : book.uuid
        }

        const booksLCSHResult = await database.relations.books_lcsh.addBookLcsh(bookLCSHRelation)
        // console.log(booksSubjectResult.rows[0]);
      }

      console.log(`bookCounter: ${bookCounter}/${totalBooks}`);
      }
      bookCounter++;
      
    }

    
    resolve();
  })

}

await seedLanguages();
await seedSubjects();
await seedLCSH();
await seedBooks();


console.log("\n\n\nSCRIPT HAS FINISHED.......\n\n\n")