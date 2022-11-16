export default async function buildBook(database, uuid) {
  const test = 0;

  let bookData = {};

  // get from books table
  const bookQuery = await database.relations.books.getBookByUUID(uuid);
  bookData = { ...bookData, ...bookQuery.rows[0] };

  // get from books_languages table

  return bookData;
}
