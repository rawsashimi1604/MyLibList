import { DBRef } from "mongodb";
import { ObjectId } from "mongodb";
import { mongoClient } from "../config.js";

async function checkUserExists(email) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const res = await db.collection("users").find({ email: email }).toArray();

    return {
      rows: res,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addUser(user) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    // Add likes array to user when creating
    user["likes"] = [];
    await db.collection("users").insertOne(user);

    const res = await db
      .collection("users")
      .find({ email: user.email })
      .toArray();

    return {
      rows: res,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUserByEmail(email) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const res = await db.collection("users").find({ email: email }).toArray();

    return {
      rows: res,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllBooksUsersLikes(email) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const getBooks = await db
      .collection("users")
      .aggregate([
        { $match: { email: email } },
        {
          $lookup: {
            from: "books",
            localField: "likes.$id",
            foreignField: "_id",
            as: "likes",
          },
        },
        {
          $unwind: "$likes",
        },
        {
          $project: {
            book_uuid: "$likes.book_uuid",
            title: "$likes.title",
            date_created: "$likes.date_created",
          },
        },
      ])
      .toArray();

    return {
      rows: getBooks,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateHashedUserPassword(user) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const res = await db
      .collection("users")
      .updateOne({ email: user.email }, { $set: { password: user.password } });

    if (res.modifiedCount === 1) {
      const dbUser = await db
        .collection("users")
        .find({ email: user.email })
        .toArray();

      return {
        rows: dbUser,
      };
    }

    return {
      rows: [],
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getHashedUserPassword(user) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const res = await db.collection("users").findOne({ email: user.email });

    return {
      rows: [{ password: res.password }],
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  checkUserExists,
  addUser,
  getUserByEmail,
  updateHashedUserPassword,
  getHashedUserPassword,
  getAllBooksUsersLikes,
};
