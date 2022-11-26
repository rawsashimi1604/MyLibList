import { DBRef } from "mongodb";
import { ObjectId } from "mongodb";
import { mongoClient } from "../config.js";

async function addToken(refreshToken) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const res = await db.collection("refresh_token").insertOne(
      { token: refreshToken }
    ) 

    return {
      res: [refreshToken]
    }

  } catch (err) {
    console.log(err)
    throw err;
  }
}

async function checkTokenExists(refreshToken) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const token = await db.collection("refresh_token").findOne(
      { token : refreshToken }
    )
    
    if (token) {
      return { rows: [token] }
    } 

    return { rows: [] }
  } catch (err) {
    console.log(err)
    throw err;
  }
}

async function deleteToken(refreshToken) {
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();
    const db = client.db("defaultdb");

    const res = await db.collection("refresh_token").deleteOne(
      { token : refreshToken }
    )
    
    return { rows: [res] }
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export default {
  addToken,
  checkTokenExists,
  deleteToken
}