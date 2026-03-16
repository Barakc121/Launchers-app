import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// מביא לי את כל הנתונים שהכנסתי לו
export async function getall(req, res) {
  const db = getDB();
  const data = await db.collection("launchers").find().toArray();
  res.send(data);
}

// מביא לי אחד לפי ה
export async function getone(req, res) {
  const db = getDB();
  const idFromUrl = req.params.id;
  const item = await db
    .collection("launchers")
    .findOne({ _id: new ObjectId(idFromUrl) });
  res.send(item);
}

// מוסיף משגר
export async function addone(req, res) {
  const db = getDB();
  const newLauncher = {
    city: req.body.city,
    rocketType: req.body.rocketType,
    name: req.body.name,
    latitude: Number(req.body.latitude),
    longitude: Number(req.body.longitude),
  };
  const result = await db.collection("launchers").insertOne(newLauncher);
  res.send(result);
}

// ומוחק לפי
export async function deleteOne(req, res) {
  const db = getDB();
  const idFromUrl = req.params.id;
  const result = await db
    .collection("launchers")
    .deleteOne({ _id: new ObjectId(idFromUrl) });
  res.send(result);
}

