import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// מביא את המשתמשים
export async function fetchAllUsers(req,res) {
    const db =getDB()
    const users=await db.collection("users").find().toArray()
    res.send(users)
    
}

// יצירת משתשמ
export async function registerUser(req, res) {
  const db = getDB();
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    user_type: req.body.user_type,
    
  };
  const result = await db.collection("users").insertOne(newUser);
  res.send(result);
}

// למחוק משתמש
export async function deleteUser(req, res) {
  const db = getDB();
  const idFromUrl = req.params.id;
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(idFromUrl) });
  res.send(result);
}

