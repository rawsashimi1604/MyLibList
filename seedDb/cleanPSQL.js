import setupEnv from "./lib/utils/setupEnv.js";
import databases from "../db/index.js";

// Set up dotenv environment from .env file.
setupEnv("../../.env");

// Create PostgreSQL database object (current database object in use)
const database = databases.PSQLDatabase;

// Insert cleaning algorithm here...
// ...
