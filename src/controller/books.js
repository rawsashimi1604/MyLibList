import validateBook from "../lib/books/validateBook.js";
import validateBookmark from "../lib/books/validateBookmark.js";
import validateLikeBook from "../lib/books/validateLikeBook.js";
import validateBookStatus from "../lib/books/validateBookStatus.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";

// GET /api/book
async function handleIndex(req, res) {
  // Check which query param was passed in...
  const database = res.locals.database;

  // Check if title contains at least 2 characters
  if (req.query.title && !(req.query.title.length >= 2)) {
    res.status(400).send({
      error: "Title must exceed at least 2 characters",
    });
    return;
  }

  // Check if publisher contains at least 2 characters
  if (req.query.publisher && !(req.query.publisher.length >= 2)) {
    res.status(400).send({
      error: "Publisher must exceed at least 2 characters",
    });
    return;
  }

  // Check if contributor contains at least 2 characters
  if (req.query.contributor && !(req.query.contributor.length >= 2)) {
    res.status(400).send({
      error: "Contributor must exceed at least 2 characters",
    });
    return;
  }

  const bookData = await database.relations.books.getBookBySearchParams(
    req.query
  );

  // Strip empty objects in contributor key
  // Insert number of likes (only for postgres)
  if (database.instance === "POSTGRES") {
    for (const book of bookData.rows) {
      book.contributors = book.contributors.filter(
        (contributor) => Object.keys(contributor).length !== 0
      );
  
      const likesData =
        await database.relations.books_users_likes.getNumberOfLikes(
          book.book_uuid
        );
      book["likes"] = likesData.rows[0].count;
    }
  }
  
  console.log(bookData.rows);

  return res.status(200).send({
    data: [...bookData.rows],
  });
}

// POST /api/book/like
async function handleAddLike(req, res) {
  const likeBookData = {
    email: req.body["email"],
    book_uuid: req.body["book_uuid"],
  };

  if (!validateLikeBook(likeBookData)) {
    res.status(400).send("Data received from client is not valid!");
  }

  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    likeBookData.email
  );

  if (!(checkUserExists.rows.length >= 1)) {
    res.status(400).send("Email does not exist on database!");
    return;
  }

  const checkBookExists = await database.relations.books.checkBookExists(
    likeBookData.book_uuid
  );

  if (!(checkBookExists.rows.length >= 1)) {
    res.status(400).send("Book does not exist on database!");
    return;
  }

  // IF book is liked, delete
  let checkIfBookIsLiked;

  if(database.instance === "POSTGRES"){
    checkIfBookIsLiked = await database.relations.books_users_likes.checkIfBookIsLiked(
      likeBookData.email,
      likeBookData.book_uuid
    );
  } else if(database.instance === "MONGO"){
    checkIfBookIsLiked = await database.relations.books.checkIfBookIsLiked(
      likeBookData.email,
      likeBookData.book_uuid
    );
  }

  if (checkIfBookIsLiked.rows.length >= 1) {
    let deleteLike;
    if (database.instance === "POSTGRES") {
      deleteLike = await database.relations.books_users_likes.deleteBookUsersLike(
        likeBookData.email,
        likeBookData.book_uuid
      );
    } else if (database.instance === "MONGO") {
      deleteLike = await database.relations.books.deleteLikeFromBook(
        likeBookData.email,
        likeBookData.book_uuid
      )
    }
    
    if (deleteLike.rows.length >= 1) {
      res.status(200).send({
        email: `${likeBookData.email}`,
        book_uuid: `${likeBookData.book_uuid}`,
        message: "Successfully unliked book.",
      });
      return;
    }
  }
  likeBookData["timestamp_liked"] = getCurrentTimestamp();
  
  let addBookLikeResult;
  if (database.instance === "POSTGRES") {
    console.log("postgres instance")
    addBookLikeResult = await database.relations.books_users_likes.addBookUsersLikes(likeBookData);
  } else if (database.instance === "MONGO") {
    addBookLikeResult = await database.relations.books.addLikeToBook(likeBookData.book_uuid, likeBookData.email)
  }
  
  console.log(addBookLikeResult)

  if (addBookLikeResult.rows.length >= 1) {
    res.status(200).send({
      email: `${likeBookData.email}`,
      book_uuid: `${likeBookData.book_uuid}`,
      message: "Successfully liked book.",
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when liking a book",
  });
  return;
}

// GET /api/book/topBooks (DONE)
async function handleGetTopBooks(req, res) {
  // Get top 50 books by likes
  const database = res.locals.database;
  const topBooksResult = await database.relations.books.getTopBooksByLikes(20);

  // ONLY FOR POSTGRES
  if (database.instance === "POSTGRES") {
    for (const book of topBooksResult.rows) {
      const likesData =
        await database.relations.books_users_likes.getNumberOfLikes(
          book.book_uuid
        );
      book["likes"] = likesData.rows[0].count;
    }
  }

  res.status(200).send({
    data: [...topBooksResult.rows],
  });
}

export default {
  handleIndex,
  handleAddLike,
  handleGetTopBooks,
};
