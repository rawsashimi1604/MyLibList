import validateBook from "../lib/books/validateBook.js";
import validateBookmark from "../lib/books/validateBookmark.js";
import validateLikeBook from "../lib/books/validateLikeBook.js";
import validateBookStatus from "../lib/books/validateBookStatus.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";

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
  // Insert number of likes
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

  return res.status(200).send({
    data: [...bookData.rows],
  });
}

async function handleDeleteBook(req, res) {
  const bookUUID = req.body.book_uuid;

  if (!validateBook(bookUUID)) {
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  const database = res.locals.database;
  const checkBookExists = await database.relations.books.checkBookExists(
    bookUUID
  );

  if (!(checkBookExists.rows.length >= 1)) {
    res.status(400).send("Book does not exist in the database");
    return;
  }

  const deleteBookResult = await database.relations.books.deleteBookByID(
    bookUUID
  );
  if (deleteBookResult.rows.length >= 1) {
    res.status(200).send({
      book_uuid: deleteBookResult.rows[0].book_uuid,
      book_title: deleteBookResult.rows[0].title,
      message: `Successfully deleted book UUID: ${bookUUID}`,
    });
    return;
  }
}

async function handleUpdateBookmark(req, res) {
  const updateBookmarkData = {
    email: req.body["email"],
    book_uuid: req.body["book_uuid"],
    page: req.body["page"],
  };

  if (!validateBookmark(updateBookmarkData)) {
    res.status(400).send("Data received from client it not valid!");
    return;
  }

  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    updateBookmarkData.email
  );

  if (!(checkUserExists.rows.length >= 1)) {
    res.status(400).send("Email does not exist on database!");
    return;
  }

  const checkBookExists = await database.relations.books.checkBookExists(
    updateBookmarkData.book_uuid
  );

  if (!(checkBookExists.rows.length >= 1)) {
    res.status(400).send("Book does not exist on database!");
  }

  updateBookmarkData["timestamp_bookmarked"] = getCurrentTimestamp();

  const checkIfBookmarkAdded =
    await database.relations.users_bookmarks.checkIfBookmarkAdded(
      updateBookmarkData.email,
      updateBookmarkData.book_uuid
    );

  if (checkIfBookmarkAdded.rows.length >= 1) {
    const updateBookmarkResult =
      await database.relations.users_bookmarks.updateBookmark(
        updateBookmarkData.page,
        updateBookmarkData.timestamp_bookmarked,
        updateBookmarkData.email,
        updateBookmarkData.book_uuid
      );

    if (updateBookmarkResult.rowCount >= 1) {
      res.status(200).send({
        data: updateBookmarkData,
        message: "Successfully updated bookmark page",
      });
    }
  }

  const addBookmarkDataResult =
    await database.relations.users_bookmarks.addBookUserBookmarks(
      updateBookmarkData
    );

  if (addBookmarkDataResult.rowCount >= 1) {
    res.status(200).send({
      data: updateBookmarkData,
      message: "Successfully bookmarked",
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when bookmarking the book",
  });
  return;
}

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

  const checkIfBookIsLiked =
    await database.relations.books_users_likes.checkIfBookIsLiked(
      likeBookData.email,
      likeBookData.book_uuid
    );

  if (checkIfBookIsLiked.rows.length >= 1) {
    const deleteLike = await database.relations.books_users_likes.deleteBookUsersLike(likeBookData.email, likeBookData.book_uuid);

    if(deleteLike.rowCount >= 1){
      res.status(200).send({
          email: `${likeBookData.email}`,
          book_uuid: `${likeBookData.book_uuid}`,
          message: "Successfully unliked book.",
      });
      return;
    }
  }
  likeBookData["timestamp_liked"] = getCurrentTimestamp();

  const addBookLikeResult =
    await database.relations.books_users_likes.addBookUsersLikes(likeBookData);

  if (addBookLikeResult.rowCount >= 1) {
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

async function handleUpdateStatus(req, res) {
  const updateStatusData = {
    email: req.body["email"],
    book_uuid: req.body["book_uuid"],
    status: req.body["status"],
  };

  if (!validateBookStatus(updateStatusData)) {
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    updateStatusData.email
  );

  updateStatusData["timestamp_updated"] = getCurrentTimestamp();

  if (!(checkUserExists.rows.length >= 1)) {
    res.status(400).send("Email does not exist on database!");
    return;
  }

  const checkBookExists = await database.relations.books.checkBookExists(
    updateStatusData.book_uuid
  );

  if (!(checkBookExists.rows.length >= 1)) {
    res.status(400).send("Book does not exist on database!");
    return;
  }

  const checkIfBookStatusAdded =
    await database.relations.books_users_status.checkIfBookStatusAdded(
      updateStatusData.email,
      updateStatusData.book_uuid
    );

  if (checkIfBookStatusAdded.rows.length >= 1) {
    const updateStatusDataResult =
      await database.relations.books_users_status.updateBookUserStatus(
        updateStatusData.status,
        updateStatusData.timestamp_updated,
        updateStatusData.email,
        updateStatusData.book_uuid
      );

    if (updateStatusDataResult.rowCount >= 1) {
      res.status(200).send({
        data: updateStatusData,
        message: "Successfully updated book status",
      });
    }
  }

  const addStatusDataResult =
    await database.relations.books_users_status.addBookUserStatus(
      updateStatusData
    );

  if (addStatusDataResult.rowCount >= 1) {
    res.status(200).send({
      data: updateStatusData,
      message: "Successfully added book status",
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when updating book status",
  });
  return;
}

async function handleGetTopBooks(req, res) {
  // Get top 50 books by likes
  const database = res.locals.database;
  const topBooksResult = await database.relations.books.getTopBooksByLikes(20);

  for (const book of topBooksResult.rows) {
    const likesData =
      await database.relations.books_users_likes.getNumberOfLikes(
        book.book_uuid
      );
    book["likes"] = likesData.rows[0].count;
  }

  res.status(200).send({
    data: [...topBooksResult.rows],
  });
}

export default {
  handleIndex,
  handleDeleteBook,
  handleUpdateBookmark,
  handleAddLike,
  handleUpdateStatus,
  handleGetTopBooks,
};
