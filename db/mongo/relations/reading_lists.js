import { DBRef } from "mongodb";
import { ObjectId } from "mongodb";
import { mongoClient } from "../config.js";

async function getAllReadingList() {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    const otherRes = await db.collection("reading_lists").aggregate([
      { '$match': { _id: { $exists: true } } },
      {
        $lookup:
        {
          from: "users",
          localField: "email.$id",
          foreignField: "_id",
          as: "email"
        },
      },
      {
        $unwind: "$email"
      },
      {
        $project: {
          "email": "$email.email",
          "name": 1,
          "timestamp_created_on": 1,
          "reading_list_id": 1
        }
      },
    ]).toArray();
    // Get the email from 

    console.log(otherRes)
    return {
      rows: otherRes
    }

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

    // TODO Refactor into another function

    const objectId = await db
      .collection("users")
      .findOne({ email: readingList.email })

    console.log(objectId);


    const added = await db.collection("reading_lists").insertOne({
      name: readingList.name,
      timestamp_created_on: readingList.timestamp_created_on,
      email: {
        "$ref": "users",
        "$id": ObjectId(objectId._id)
      },
      books: [],
      reading_list_id: ""
    });

    const updateReadingListID = await db.collection("reading_lists").updateOne(
      { _id: added.insertedId },
      { $set: { reading_list_id: added.insertedId } }
    )
    const res = await db
      .collection("reading_lists")
      .find({ _id: added.insertedId })
      .toArray();

    return {
      rows: res,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getReadingListByID(readingListID) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    const res = await db.collection("reading_lists").aggregate([
      { '$match': { _id: ObjectId(readingListID) } },
      {
        $lookup:
        {
          from: "users",
          localField: "email.$id",
          foreignField: "_id",
          as: "email"
        },
      },
      {
        $unwind: "$email"
      },
      {
        $project: {
          "email": "$email.email",
          "name": 1,
          "timestamp_created_on": 1
        }
      },
    ]).toArray();

    return {
      rows: res
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function checkBookInReadingListExists(data) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    const getBook = await db.collection("books").findOne(
      { book_uuid: data.book_uuid }
    )
    const getReadingList = await db.collection("reading_lists").findOne(
      { _id: ObjectId(data.reading_list_id) }
    )

    console.log(getReadingList)
    let bookExist = false;
    for (const ref of getReadingList.books) {
      const id = ref.toJSON().$id;
      if (id.toString() === getBook._id.toString()) {
        bookExist = true;
        break;
      }
    }

    if (bookExist) {
      return {
        rows: [getReadingList]
      }
    }

    return {
      rows: []
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addBookList(data) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    const getBook = await db.collection("books").findOne(
      { book_uuid: data.book_uuid }
    )

    const getReadingList = await db.collection("reading_lists").findOne(
      { _id: ObjectId(data.reading_list_id) }
    )

    const updateReadingList = await db.collection("reading_lists").updateOne(
      { _id: ObjectId(data.reading_list_id) },
      { $push: { books: { "$ref": "books", "$id": ObjectId(getBook._id) } } }
    )

    return {
      rows: [updateReadingList]
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteReadingListByID(reading_list_id) {
  console.log(reading_list_id)
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    const res = await db.collection("reading_lists").deleteOne(
      { _id: ObjectId(reading_list_id) }
    );

    if (res.deletedCount >= 1) {
      return {
        rows: [res]
      }
    }

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

async function deleteBookFromReadingListByID(data){
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    // Get the book ObjectID
    const findBook = await db.collection("books").findOne(
      { book_uuid: data.book_uuid }
    );

    const updateReadingList = await db.collection("reading_lists").updateOne(
      { _id: ObjectId(data.reading_list_id) },
      { $pull: { books: { "$ref": "books", "$id": ObjectId(findBook._id) } } }
    )
    
    if (updateReadingList.modifiedCount >= 1){
      return{
        rows: [findBook]
      }
    }

    return {
      rows: []
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllBooksFromReadingList(readingListID) {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");

    const getBook = await db.collection("books").findOne(
      { book_uuid: readingListID.book_uuid }
    )

    const res = await db.collection("reading_lists").aggregate([
      { '$match': { _id: ObjectId(readingListID) } },
      {
        $lookup:
        {
          from: "books",
          localField: "books.$id",
          foreignField: "_id",
          as: "book"
        },
      },
      {
        $unwind: "$book"
      },
      {
        $project: {
          "book_uuid": "$book.book_uuid",
          "title": "$book.title",
          "_id": 0
        }
      },
    ]).toArray();

    return {
      rows: res
    }

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
  getAllBooksFromReadingList,
  checkBookInReadingListExists,
  addBookList,
  deleteBookFromReadingListByID
};
