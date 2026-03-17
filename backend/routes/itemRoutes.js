import express from "express";
import { getall,getone,addone,deleteOne } from "../controllers/launcherControler.js";


const router = express.Router();
// מביא לי את כל הנתונים שהכנסתי לו
router.get("/", getall);

// מביא לי אחד לפי ה
router.get("/:id", getone);

// מוסיף לי משגר 
router.post("/", addone);

// ומוחק לפי
router.delete("/:id", deleteOne);


export default router