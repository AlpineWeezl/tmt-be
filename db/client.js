import mongoose from "mongoose"

const dbURL = process.env.MONGO_DB_CONN;

try {
    mongoose.connect(dbString);
    console.log('MongoDB successfully connected');
} catch (error) {
    console.log(error);
}