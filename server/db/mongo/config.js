import { MongoClient } from "mongodb";

async function mongoClient() {
  return MongoClient.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nosql-db:${process.env.MONGO_PORT}/`
  );
}

export { mongoClient };
