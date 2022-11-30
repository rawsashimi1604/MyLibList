import express from "express";

import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import UsersController from "../controller/users.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into user Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.post("/", asyncErrorHandler(UsersController.handleRegisterUser));
  router.get("/", asyncErrorHandler(UsersController.handleGetUserData));
  router.put(
    "/changePassword",
    asyncErrorHandler(UsersController.handleChangePassword)
  );
  router.post(
    "/likedBooks",
    asyncErrorHandler(UsersController.handleGetLikeBooks)
  );
  router.post(
    "/readingLists",
    asyncErrorHandler(UsersController.handleGetReadingListsByEmail)
  );

  return router;
}
