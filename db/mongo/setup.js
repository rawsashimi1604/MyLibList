import { mongoClient } from "./config.js";

async function setupMongo() {

  // Conncet to the database
  const client = await mongoClient();

  try {
    await client.close()
    await client.connect();

    console.log("setting up mongo db")

    // Create default db
    const db = client.db("defaultdb");
    const usersCollection = await db.collection("users")
    const readingListsCollection = await db.collection("reading_lists")
    const booksCollection = await db.collection("books")
    const refreshTokenCollection = await db.collection("refresh_token")

    const collections = await db.listCollections().toArray();
    console.log(collections)
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

await setupMongo();

// node db/mongo/setup.js