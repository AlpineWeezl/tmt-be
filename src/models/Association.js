import mongoose from "mongoose";

const { Schema, model } = mongoose;

const associationSchema = new Schema({
	title: { type: String, required: true, unique: true },
	shortTitle: { type: String, required: true, unique: true },
	description: { type: String, required: false },
	createdAt: { type: Date, required: true, default: Date.now },
	modifiedAt: { type: Date, required: true, default: Date.now },
});

export const Association = model("Association", associationSchema);
