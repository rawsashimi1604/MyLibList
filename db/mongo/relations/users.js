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
    console.log("check users exists");
    console.log(res);

    return {
      rows: res
    };

  } catch (err) {
    console.log(err)
    throw err;
  }
}

async function addUser(user) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    console.log("add user")
    await db.collection("users").insertOne(user);

    const res = await db.collection("users").find({ email: user.email }).toArray();

    return {
      rows : res
    }

  } catch (err) {
    console.log(err)
    throw err;
  }
}

export default {
  checkUserExists,
  addUser
}