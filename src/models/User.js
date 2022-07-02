import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: false }
    }
);
export const User = model('User', usersSchema);