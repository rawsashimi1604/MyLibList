import express from "express";

import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import BooksController from "../controller/books.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into user Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.get("/", asyncErrorHandler(BooksController.handleIndex));
  router.delete("/", asyncErrorHandler(BooksController.handleDeleteBook));
  router.put("/addBookmark", asyncErrorHandler(BooksController.handleUpdateBookmark));
  router.post("/like", asyncErrorHandler(BooksController.handleAddLike));
  router.put("/status", asyncErrorHandler(BooksController.handleUpdateStatus));
  router.get("/topBooks", asyncErrorHandler(BooksController.handleGetTopBooks));

  return router;
}
