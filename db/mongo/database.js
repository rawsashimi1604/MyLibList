import { mongoClient } from "./config.js";
import { setupMongo } from "./setup.js";
import relations from "./relations/index.js";

const MongoDatabase = {
  client: mongoClient,
  setup: setupMongo,
  relations,
};

export default MongoDatabase;
