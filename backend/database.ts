import { MongoClient, ObjectId } from "mongo";

import config from "./env.ts";

console.log("Connecting to MongoDB...");
const client = new MongoClient();
const MONGO_URL = new URL(config.MONGO_URL);
if (!MONGO_URL.searchParams.has("authMechanism")) {
  MONGO_URL.searchParams.set("authMechanism", "SCRAM-SHA-1");
}
try {
  await client.connect(MONGO_URL.href);
} catch (err) {
  console.error("Error connecting to MongoDB", err);
  throw err;
}

const db = client.database("RebootRescue");

interface AccountSchema {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  loc: string;
  year: number;
}

export function createUser(
  name: string,
  email: string,
  password: string,
  loc: string,
  year: number
) {}
