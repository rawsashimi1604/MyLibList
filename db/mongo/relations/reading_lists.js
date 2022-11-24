import { DBRef } from "mongodb";
import { ObjectId } from "mongodb";
import { mongoClient } from "../config.js";

async function getAllReadingList() {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    db.collection("reading_lists").find();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addReadingList(readingList) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    const objectId = await db
      .collection("users")
      .find({ email: readingList.email });
    console.log(await objectId.toArray());
    db.collection("reading_lists").insertOne({
      name: readingList.name,
      timestamp_created_on: readingList.timestamp_created_on,
      user: DBRef("users", ObjectId(objectId)),
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getReadingListByID(readingListID) {
  try {
    client.db().collection("reading_lists");
    await client.find({ _id: ObjectId(readingListID) });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteReadingListByID(reading_list_id) {
  try {
    client.db().collection("reading_lists");
    await client.deleteMany({ _id: ObjectId(reading_list_id) });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllReadingListsByEmail(email) {
  try {
    client.db().collection("reading_lists");
    await client.find({ email: email });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllReadingList,
  addReadingList,
  getReadingListByID,
  deleteReadingListByID,
  getAllReadingListsByEmail,
};
