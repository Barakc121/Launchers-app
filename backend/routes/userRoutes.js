import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/allUsers", fetchAllUsers);

router.post("/register", registerUser);

router.delete("/deleteUser/:id", deleteUser);

export default router