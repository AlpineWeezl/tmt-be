import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usagesSchema = new Schema(
    {
        passId: { type: String, required: true },
        userId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        begin: { type: Date, required: true },
        end: { type: Date, required: true },
        comment: { type: String, required: false },
        createdAt: { type: Date, required: true, default: Date.now },
        modifiedAt: { type: Date, required: true, default: Date.now }
    }
);

export const Usage = model('Usage', usagesSchema);