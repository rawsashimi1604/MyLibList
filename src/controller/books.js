import validateBook from "../lib/books/validateBook.js"
import validateLikeBook from "../lib/books/validateLikeBook.js"
import validateBookStatus from "../lib/books/validateBookStatus.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";

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
        book_uuid: deleteBookResult.rows[0].book_uuid,
        book_title: deleteBookResult.rows[0].title,
        message: `Successfully deleted book UUID: ${bookUUID}`
      })
      return;
    }
}

async function handleUpdateBookmark(req, res) {
  res.send("Hit put /api/book/addBookmark...");
}

async function handleAddLike(req, res) {
  const likeBookData = {
    email: req.body["email"],
    book_uuid: req.body["book_uuid"]
  }

  if(!validateLikeBook(likeBookData)){
    res.status(400).send("Data received from client is not valid!");
  }

  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(likeBookData.email);

  if(!(checkUserExists.rows.length >= 1)){
    res.status(400).send("Email does not exist on database!");
    return;
  }

  const checkBookExists = await database.relations.books.checkBookExists(likeBookData.book_uuid);

  if(!(checkBookExists.rows.length >= 1)){
    res.status(400).send("Book does not exist on database!");
    return;
  }

  const checkIfBookIsLiked = await database.relations.books_users_likes.checkIfBookIsLiked(likeBookData.email,likeBookData.book_uuid);

  if(checkIfBookIsLiked.rows.length >= 1){
    res.status(400).send("User has already liked the book");
    return;
  }
  likeBookData["timestamp_liked"] = getCurrentTimestamp();

  const addBookLikeResult = await database.relations.books_users_likes.addBookUsersLikes(likeBookData);

  if(addBookLikeResult.rowCount >= 1){
    res.status(200).send({
      email: `${likeBookData.email}`,
      book_uuid: `${likeBookData.book_uuid}`,
      message: "Successfully liked book."
    })
    return;
  }

  res.status(400).send({
    error: "Something went wrong when liking a book"
  });
  return;
  
}


//Update but where is the add???
async function handleUpdateStatus(req, res) {
  const updateStatusData = {
    email: req.body["email"],
    book_uuid: req.body["book_uuid"],
    status: req.body["status"],
  };

  if(!validateBookStatus(updateStatusData)){
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(updateStatusData.email);

  if(!(checkUserExists.rows.length >= 1)){
    res.status(400).send("Email does not exist on database!");
    return;
  }

  const checkBookExists = await database.relations.books.checkBookExists(updateStatusData.book_uuid);

  if(!(checkBookExists.rows.length >= 1)){
    res.status(400).send("Book does not exist on database!");
    return;
  }


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
