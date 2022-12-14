import express from "express";
import setupEnv from "./lib/utils/setupEnv.js";

// Router imports
import makeAuthRouter from "./routes/authentication.js";
import makeUsersRouter from "./routes/users.js";
import makeBooksRouter from "./routes/books.js";
import makeReadingListsRouter from "./routes/readingLists.js";

// Middleware imports
import morgan from "morgan";
import cors from "cors";
import ErrorMiddleware from "./middleware/error.js";

// Receive database object from server.js (Dependency injection)
export default function (database) {
  // Set up dotenv environment from .env file.
  setupEnv("../.env");

  const app = express();

  // Enable logging of request hits
  app.use(morgan("combined"));

  // Enable parsing of JSON in req.body
  app.use(express.json());

  // Disable etag to remove 304 errors
  app.disable("etag");

  // Enable CORS (Cross Origin Resource Sharing w/ frontend app)
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // Routes
  app.use("/api/auth", makeAuthRouter(database));
  app.use("/api/user", makeUsersRouter(database));
  app.use("/api/book", makeBooksRouter(database));
  app.use("/api/readingList", makeReadingListsRouter(database));

  // Default Route
  app.get("/", (req, res) => {
    res.send("Hello worldd!");
  });

  //
  app.get("*", (req, res) => {
    res.status(404).send("Route not found");
  });

  // error handling middleware
  app.use(ErrorMiddleware.handleError);

  return app;
}
