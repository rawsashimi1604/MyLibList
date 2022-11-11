import validateAddReadingList from "../lib/readingLists/validateAddReadingList.js";
import getCurrentTimestamp from "../lib/utils/getCurrentTimestamp.js"

async function handleIndex(req, res) {
  res.send("reading list route single data...");
}

async function handleAllReadingList(req, res) {
  res.send("Hit get /api/readingList/all...");
}

// POST /api/readingList
async function handleAddReadingList(req, res) {

    // Receive JSON from frontend
    const readingListData = {
        email: req.body["email"],
        name: req.body["name"]
    }

    // Check whether we received valid data!
    // For example what if they did not give the email? then we cant proceed
    // 400 IS CLIENT FUCKED UP...
    if (!validateAddReadingList(readingListData)) {
        res.status(400).send("Data received from client is not valid!");
        return;
    } 

    // Check whether the email received exists in the database...
    const database = res.locals.database;
    const checkUserExists = await database.relations.users.checkUserExists(readingListData.email);

    // if email already exists, then you can add to reading list
    if (!(checkUserExists.rows.length >= 1)) {
        res.status(400).send("Email does not exist on database! Can't create reading list!!!");
        return;
    }

    // After you pass these 2 checks, you can add the reading list to the database
    readingListData["timestamp_created_on"] = getCurrentTimestamp();

    // Add reading list to database
    const addReadingListResult = await database.relations.reading_lists.addReadingList(readingListData);

    // If the database returned us 1 row, means it has succesfully added to the database...
    if (addReadingListResult.rows.length >= 1) {
        res.status(200).send({
            data: readingListData.name,
            message: "Successfully added reading list."
        })
        return;
    } 

    // 
    res.status(400).send({
        error: "Something went wrong when adding a reading list."
    });
    return;
}

async function handleDeleteReadingList(req, res) {
  res.send("Hit delete /api/readingList/...");
}

async function handleAddBookToReadingList(req, res) {
  res.send("Hit post /api/readingList/book...");
}

async function handleDeleteBookFromReadingList(req, res) {
  res.send("Hit delete /api/readingList/book...");
}

export default {
  handleIndex,
  handleAllReadingList,
  handleAddReadingList,
  handleDeleteReadingList,
  handleAddBookToReadingList,
  handleDeleteBookFromReadingList,
};
