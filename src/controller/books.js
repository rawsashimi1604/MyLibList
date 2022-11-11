import validateBook from "../lib/books/validateBook.js"

async function handleIndex(req, res) {
  res.send("Book route...");
}

async function handleDeleteBook(req, res) {
    const bookUUID = req.body.book_uuid;

    if(!validateBook(bookUUID)){
        res.status(400).send("Data received from client is not valid!");
        return;
    }

    const database = res.locals.database;
    const checkBookExists = await database.relations.books.checkBookExists(bookUUID);

    if(!(checkBookExists.rows.length >= 1)){
      res.status(400).send("Book does not exist in the database");
      return;
    }

    const deleteBookResult = await database.relations.books.deleteBookByID(bookUUID);

    if(deleteBookResult.rows.length >= 1){
      res.status(200).send({
        book: deleteBookResult.rows[0],
        message: `Successfully deleted book UUID: ${bookUUID}`
      })
      return;
    }
    console.log(deleteBookResult);
}

async function handleUpdateBookmark(req, res) {
  res.send("Hit put /api/book/addBookmark...");
}

async function handleAddLike(req, res) {
  res.send("Hit post /api/book/like...");
}

async function handleUpdateStatus(req, res) {
  res.send("Hit put /api/book/status...");
}

async function handleGetTopBooks(req, res) {
  res.send("Hit get /api/book/topBooks...");
}

export default {
  handleIndex,
  handleDeleteBook,
  handleUpdateBookmark,
  handleAddLike,
  handleUpdateStatus,
  handleGetTopBooks,
};
