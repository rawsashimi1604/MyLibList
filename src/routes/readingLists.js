import express from "express";

import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import BooksController from "../controller/books.js";
import ReadingListsController from "../controller/readingLists.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into user Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.get("/", asyncErrorHandler(ReadingListsController.handleIndex));
  router.get("/all", asyncErrorHandler(ReadingListsController.handleAllReadingList));
  router.post("/addReadingList", asyncErrorHandler(ReadingListsController.handleAddReadingList));
  router.delete("/", asyncErrorHandler(ReadingListsController.handleDeleteReadingList));
  router.post("/book", asyncErrorHandler(ReadingListsController.handleAddBookToReadingList));
  router.delete("/book", asyncErrorHandler(ReadingListsController.handleDeleteBookFromReadingList));

  return router;
}