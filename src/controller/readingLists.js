import validateAddReadingList from "../lib/readingLists/validateAddReadingList.js";
import validateDeleteReadingList from "../lib/readingLists/validateDeleteReadingList.js";
import validateAddBookToReadingList from "../lib/readingLists/validateAddBookToReadingList.js";
import validateNumberReceived from "../lib/utils/validateNumberReceived.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";

// GET /api/readingList/:readingListID
async function handleGetSpecificReadingList(req, res) {
  // Check whetehr client sent a request to a route with valid BIGSERIAL parameter
  const readingListID = req.params.readingListID;

  // Not a valid condition ! we did not receive a positive number (only for postgres)
  const database = res.locals.database;
  if (database.instance === "POSTGRES") {
    if (!(validateNumberReceived && Number(readingListID) > 0)) {
      res.status(400).send({
        error: "Received invalid input from client",
      });
      return;
    }
  }

  // Valid condition ! we received a positive number
  // Check the database for the reading list
  const getReadingListByIDResult =
    await database.relations.reading_lists.getReadingListByID(readingListID);

  console.log(getReadingListByIDResult)

  const getBooksInReadingListResult =
    await database.relations.book_lists.getAllBooksFromReadingList(
      readingListID
    );

  if (getReadingListByIDResult.rows.length == 1) {
    res.status(200).send({
      reading_list: getReadingListByIDResult.rows[0],
      books: getBooksInReadingListResult.rows,
      message: `Successfully got reading list using ID: ${readingListID}.`,
    });
    return;
  }

  res.status(400).send({
    error: "Reading list does not exist.",
  });
  return;
}

// GET /api/readingList/all
async function handleAllReadingList(req, res) {
  const database = res.locals.database;
  const readingListsResult =
    await database.relations.reading_lists.getAllReadingList();

  if (readingListsResult.rows.length >= 1) {
    res.status(200).send({
      data: readingListsResult.rows,
      message: "Successfully retrieved reading lists.",
    });
    return;
  }

  res.status(400).send({
    error: "There is no reading lists available.",
  });
  return;
}

// POST /api/readingList
async function handleAddReadingList(req, res) {
  // Receive JSON from frontend
  const readingListData = {
    email: req.body["email"],
    name: req.body["name"],
  };

  if (!validateAddReadingList(readingListData)) {
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  // Check whether the email received exists in the database...
  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    readingListData.email
  );

  // if email already exists, then you can add to reading list
  if (!(checkUserExists.rows.length >= 1)) {
    res
      .status(400)
      .send("Email does not exist on database! Can't create reading list!!!");
    return;
  }

  // After you pass these 2 checks, you can add the reading list to the database
  readingListData["timestamp_created_on"] = getCurrentTimestamp();

  // Add reading list to database
  const addReadingListResult =
    await database.relations.reading_lists.addReadingList(readingListData);

  // If the database returned us 1 row, means it has succesfully added to the database...
  if (addReadingListResult.rows.length >= 1) {
    res.status(200).send({
      data: readingListData.name,
      message: "Successfully added reading list.",
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when adding a reading list.",
  });
  return;
}

// DELETE /api/readingList
async function handleDeleteReadingList(req, res) {
  const readingListData = {
    reading_list_id: req.body["reading_list_id"],
    email: req.body["email"],
  };

  // if data sent is not an obj or does not have valid keys
  if (!validateDeleteReadingList(readingListData)) {
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  // Not a valid condition ! we did not receive a positive number (ONLY FOR POSTGRES)
  const database = res.locals.database;
  if (database.instance === "POSTGRES") {
    if (
      !(validateNumberReceived && Number(readingListData.reading_list_id) > 0)
    ) {
      res.status(400).send({
        error: "Received invalid ID from client",
      });
      return;
    }
  }

  // Check whether the email received exists in the database...
  const checkUserExists = await database.relations.users.checkUserExists(
    readingListData.email
  );

  // if email does not exist
  if (!(checkUserExists.rows.length >= 1)) {
    res
      .status(400)
      .send("Email does not exist on database! Can't delete reading list!");
    return;
  }

  // to check if email is tied to reading list that's about to be deleted
  const checkIsOwner =
    await database.relations.reading_lists.getReadingListByID(
      readingListData.reading_list_id
    );

  // Before checking if email is tied to readinglist that's to be deleted, if reading list id returns empty
  if (!(checkIsOwner.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Reading list does not exist on database! Can't delete reading list!"
      );
    return;
  }

  // check if readinglist to be deleted belongs to owner
  if (!(checkIsOwner.rows[0]["email"] === readingListData.email)) {
    res.status(400).send("You can't delete a reading list that you don't own.");
    return;
  }

  // Delete reading list from database
  const deleteReadingListResult =
    await database.relations.reading_lists.deleteReadingListByID(
      readingListData.reading_list_id
    );
  // Successfully deleted
  if (deleteReadingListResult.rows.length >= 1) {
    res.status(200).send({
      data: checkIsOwner,
      message: `Successfully deleted reading list with ID: ${readingListData.reading_list_id}`,
    });
    return;
  }
}

// POST /api/readingList/book (TODO)
async function handleAddBookToReadingList(req, res) {
  const bookToReadingListData = {
    reading_list_id: req.body["reading_list_id"],
    book_uuid: req.body["book_uuid"],
    email: req.body["email"],
  };

  if (!validateAddBookToReadingList(bookToReadingListData)) {
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  // Check whether the email received exists in the database...
  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    bookToReadingListData.email
  );

  // if email already exists,
  if (!(checkUserExists.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Email does not exist on database! Can't add book to reading list!"
      );
    return;
  }

  // check if book exist
  const checkBookExists = await database.relations.books.checkBookExists(
    bookToReadingListData.book_uuid
  );
  if (!(checkBookExists.rows.length >= 1)) {
    res
      .status(400)
      .send("Book does not exist on database! Can't add book to reading list!");
    return;
  }

  // to check if email is tied to reading list that's about to be added
  const checkIsOwner =
    await database.relations.reading_lists.getReadingListByID(
      bookToReadingListData.reading_list_id
    );

  // if getReadingListByID returns empty means the reading list does not exist
  if (!(checkIsOwner.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Reading list does not exist on database! Can't add book to reading list!"
      );
    return;
  }

  // check if book is already in reading list
  const checkBookExistsInReadingList =
    await database.relations.book_lists.checkBookInReadingListExists(
      bookToReadingListData
    );
  if (checkBookExistsInReadingList.rows.length >= 1) {
    res
      .status(400)
      .send(
        "Book already exists in this reading list! Can't add book again to reading list!"
      );
    return;
  }

  // since there should only be one id that is to be added,
  if (!(checkIsOwner.rows[0]["email"] === bookToReadingListData.email)) {
    res
      .status(400)
      .send("You can't add a book to a reading list that you don't own.");
    return;
  }

  // After you pass these 3 checks, you can add the reading list to the database
  bookToReadingListData["timestamp_created_on"] = getCurrentTimestamp();

  // Add book to reading list in database
  const addBookToReadingListResult =
    await database.relations.book_lists.addBookList(bookToReadingListData);
  console.log(addBookToReadingListResult);
  // If the database returned us 1 row, means it has succesfully added to the database...
  if (addBookToReadingListResult.rows.length >= 1) {
    res.status(200).send({
      data: addBookToReadingListResult.rows,
      message: "Successfully added book to reading list.",
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when adding a reading list.",
  });
  return;
}

// DELETE /api/readingList/book
async function handleDeleteBookFromReadingList(req, res) {
  const bookFromReadingListData = {
    reading_list_id: req.body["reading_list_id"],
    book_uuid: req.body["book_uuid"],
    email: req.body["email"],
  };

  // check if data received has key and value
  if (!validateAddBookToReadingList(bookFromReadingListData)) {
    res.status(400).send("Data received from client is not valid!");
    return;
  }

  // Check whether the email received exists in the database...
  const database = res.locals.database;
  const checkUserExists = await database.relations.users.checkUserExists(
    bookFromReadingListData.email
  );

  // if email already exists,
  if (!(checkUserExists.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Email does not exist on database! Can't delete book from reading list!"
      );
    return;
  }

  // check if book exist
  const checkBookExists = await database.relations.books.checkBookExists(
    bookFromReadingListData.book_uuid
  );
  if (!(checkBookExists.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Book does not exist on database! Can't delete book from reading list!"
      );
    return;
  }

  // to check if email is tied to reading list that's about to be deleted
  const checkIsOwner =
    await database.relations.reading_lists.getReadingListByID(
      bookFromReadingListData.reading_list_id
    );

  // if getReadingListByID returns empty means the reading list does not exist
  if (!(checkIsOwner.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Reading list does not exist on database! Can't delete book from reading list!"
      );
    return;
  }

  // check if book is already in reading list
  const checkBookExistsInReadingList =
    await database.relations.book_lists.checkBookInReadingListExists(
      bookFromReadingListData
    );
  if (!(checkBookExistsInReadingList.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "Book does not exist in this reading list on database! Can't delete book that does not exist in reading list!"
      );
    return;
  }

  // since there should only be one id that is to be added,
  if (!(checkIsOwner.rows[0]["email"] === bookFromReadingListData.email)) {
    res
      .status(400)
      .send("You can't delete a book from a reading list that you don't own.");
    return;
  }

  // After you pass these 3 checks, you can add the reading list to the database
  bookFromReadingListData["timestamp_created_on"] = getCurrentTimestamp();

  // Add book to reading list in database
  const deleteBookFromReadingListResult =
    await database.relations.book_lists.deleteBookFromReadingListByID(
      bookFromReadingListData
    );
  console.log(deleteBookFromReadingListResult);
  // If the database returned us 1 row, means it has succesfully added to the database...
  if (deleteBookFromReadingListResult.rows.length >= 1) {
    res.status(200).send({
      data: deleteBookFromReadingListResult.rows,
      message: "Successfully deleted book from reading list.",
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when adding a reading list.",
  });
  return;
}

export default {
  handleGetSpecificReadingList,
  handleAllReadingList,
  handleAddReadingList,
  handleDeleteReadingList,
  handleAddBookToReadingList,
  handleDeleteBookFromReadingList,
};
