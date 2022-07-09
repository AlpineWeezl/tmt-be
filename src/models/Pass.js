import mongoose from "mongoose";

const { Schema, model } = mongoose;

const passSchema = new Schema(
    {        
        userId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true},
        price: { type: String, required: true, select: false },
        start: { type: String, required: true },
        end: { type: Boolean, required: true, default: false },
        createdAt: { type: Date, required: true, default: Date.now },
        modifiedAt: { type: Date, required: true, default: Date.now }
    }
);

export const User = model('User', passSchema);