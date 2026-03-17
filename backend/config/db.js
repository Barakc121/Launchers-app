import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db("backenddb");
    console.log("DB connect ");
  } catch {
    console.log("error connect, db.js");
  }
}

export function getDB() {
  return db;
}
