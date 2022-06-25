import express from "express";
import cors from 'cors';
import "./db/client.js";

const app = express();
app.use(cors());
app.use(express.json());

// ############################################################################################
// ----------------------------- Router -------------------------------------------------------
// ############################################################################################
app.use('/user')

const port = process.env.PORT || 5000;

app.listen(() => console.log(`The server is running on port ${port}`));