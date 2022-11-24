import { DBRef } from "mongodb";
import { ObjectId } from "mongodb";
import { mongoClient } from "../config.js";

async function getAllReadingList() {
  const client = await mongoClient();
  try {
    await client.close();
    await client.connect();

    const db = client.db("defaultdb");
    const res = await db.collection("reading_lists").find().toArray();

    // $lookup:
    //  {
    //    from: <collection to join>,
    //    localField: <field from the input documents>,
    //    foreignField: <field from the documents of the "from" collection>,
    //    as: <output array field>
    //  }

    const otherRes = await db.collection("reading_lists").aggregate([
      {'$match': { _id : {$exists: true} } },
      { $lookup : 
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
        $project : { 
          "email": "$email.email",
          "name": 1,
          "timestamp_created_on": 1
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
        "$ref" : "users",
        "$id": ObjectId(objectId._id)
      }
    });

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
