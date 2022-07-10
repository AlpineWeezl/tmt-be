import mongoose from "mongoose";

const { Schema, model } = mongoose;

const passSchema = new Schema(
    {
        userId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        begin: { type: String, required: true },
        end: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
        modifiedAt: { type: Date, required: true, default: Date.now }
    }
);

export const Pass = model('Pass', passSchema);