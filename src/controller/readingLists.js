import validateAddReadingList from "../lib/readingLists/validateAddReadingList.js";
import validateNumberReceived from "../lib/utils/validateNumberReceived.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js";

async function handleGetSpecificReadingList(req, res) {
  // Check whetehr client sent a request to a route with valid BIGSERIAL parameter
  const readingListID = req.params.readingListID;

  // Not a valid condition ! we did not receive a positive number
  if (!(validateNumberReceived && Number(readingListID) > 0)) {
    res.status(400).send({
      error: "Received invalid input from client",
    });
    return;
  }

  // Valid condition ! we received a positive number
  // Check the database for the reading list
  const database = res.locals.database;
  const getReadingListByIDResult =
    await database.relations.reading_lists.getReadingListByID(readingListID);

  if (getReadingListByIDResult.rows.length >= 1) {
    res.status(200).send({
      reading_list: getReadingListByIDResult.rows[0],
      message: `Successfully get reading list using ID: ${readingListID}.`,
    });
    return;
  }

  // if no readinglist was found send a 400 error
  res.status(400).send({
    error: `Could not find a reading list using ID: ${readingListID}.`,
  });
  return;
}

async function handleAllReadingList(req, res) {
  const database = res.locals.database;
  const readingListsResult =
    await database.relations.reading_lists.getAllReadingList();
  res.status(200).send(readingListsResult.rows);
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

  // GET POST PUT DELETE
  // GET -> you dont send any body
  // POST PUT DELETE -> you send body

  // Check whether we received valid data!
  // For example what if they did not give the email? then we cant proceed
  // 400 IS CLIENT FUCKED UP...
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

  //
  res.status(400).send({
    error: "Something went wrong when adding a reading list.",
  });
  return;
}

async function handleDeleteReadingList(req, res) {
  const readingListData = {
    readingListID: req.body["readingListID"],
    email: req.body["email"],
  };

  // Not a valid condition ! we did not receive a positive number
  if (!(validateNumberReceived && Number(readingListData.readingListID) > 0)) {
    res.status(400).send({
      error: "Received invalid ID from client",
    });
    return;
  }

  // Check whether the email received exists in the database...
  const database = res.locals.database;
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
      readingListData.readingListID
    );

  // if getReadingListByID returns empty
  if (!(checkIsOwner.rows.length >= 1)) {
    res
      .status(400)
      .send(
        "reading list does not exist on database! Can't delete reading list!"
      );
    return;
  }

  // since there should only be one id that is to be deleted,
  if (!(checkIsOwner.rows[0]["email"] === readingListData.email)) {
    res.status(400).send("You can't delete a reading list that you don't own.");
    return;
  }

  // Delete reading list from database
  const deleteReadingListResult =
    await database.relations.reading_lists.deleteReadingListByID(
      readingListData.readingListID
    );
  // Successfully deleted
  if (deleteReadingListResult.rows.length >= 1) {
    res.status(200).send({
      data: deleteReadingListResult.rows,
      message: `Successfully deleted reading list with ID: ${readingListData.readingListID}`,
    });
    return;
  }

  res.status(400).send({
    error: "Something went wrong when adding a reading list.",
  });
  return;
}

async function handleAddBookToReadingList(req, res) {
  res.send("Hit post /api/readingList/book...");
}

async function handleDeleteBookFromReadingList(req, res) {
  res.send("Hit delete /api/readingList/book...");
}

export default {
  handleGetSpecificReadingList,
  handleAllReadingList,
  handleAddReadingList,
  handleDeleteReadingList,
  handleAddBookToReadingList,
  handleDeleteBookFromReadingList,
};
