import { mongoClient } from "./config.js";

async function setupMongo() {
  // Conncet to the database
  const client = await mongoClient();

  try {
    await client.close();
    await client.connect();

    console.log("setting up mongo db");

    // Create default db
    const db = client.db("defaultdb");

    const collections = await db.listCollections().toArray();

    // Create collections
    if (!"users" in Object.values(collections))
      await db.createCollection("users");
    if (!"reading_lists" in Object.values(collections))
      await db.createCollection("reading_lists");
    if (!"books" in Object.values(collections))
      await db.createCollection("books");
    if (!"refresh_token" in Object.values(collections))
      await db.createCollection("refresh_token");
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

export { setupMongo };

// node db/mongo/setup.js
