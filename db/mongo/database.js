import { mongoClient } from "./config.js";
import { setupMongo } from "./setup.js";

const MongoDatabase = {
  client: mongoClient,
  setup: setupMongo,
};

export default MongoDatabase;
