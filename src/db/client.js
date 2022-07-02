import { MongoClient } from "mongodb"
import mongoose from "mongoose";

const dbURL = process.env.MONGO_DB_CONN;
const client = new MongoClient(dbURL);

try {
    mongoose.connect(dbURL);
    console.log('MongoDB successfully connected');
} catch (error) {
    console.log(error);
}