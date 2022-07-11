import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema(
    {
        associationId: {type: String, required: true},
        title: { type: String, required: true },
        shortTitle: { type: String, required: true, unique: true },
        street: { type: String, required: false},
        housenumber: { type: String, required: false },
        postalcode: { type: String, required: false },
        city: { type: String, required: false},
        country: { type: String, required: false},
        description: { type: String, required: false},
        createdAt: { type: Date, required: true, default: Date.now },
        modifiedAt: { type: Date, required: true, default: Date.now }
    }
);

export const Company = model('Company', companySchema);