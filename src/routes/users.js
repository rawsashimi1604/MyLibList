import express from "express";

import UsersController from "../controller/users.js";
import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into user Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.get("/", UsersController.handleIndex);
  router.post("/", asyncErrorHandler(UsersController.handleAddUser));
  router.get("/all", authenticateToken, asyncErrorHandler(UsersController.handleAllUsers));

  return router;
}
