import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usagesSchema = new Schema(
    {
        passId: { type: String, required: true },
        userId: { type: String, required: true },
        associationId: {type: String, required: true },
        companyId: {type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: false },
        date: { type: Date, required: true, default: Date.now },
        price: { type: Number, required: true },
        duration: { type: Number, required: false },
        durationUnit: { type: String, required: false },
        comment: { type: String, required: false },
        createdAt: { type: Date, required: true, default: Date.now },
        modifiedAt: { type: Date, required: true, default: Date.now }
    }
);

export const Usage = model('Usage', usagesSchema);