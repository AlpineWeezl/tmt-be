import 'dotenv/config';
import express from "express";
import "./src/db/client.js";
import cors from 'cors';
import { usersRouter } from './src/routes/usersRouter.js';

const app = express();
const port = process.env.PORT || 5000;

// ############################################################################################
// ----------------------------- Middlewares --------------------------------------------------
// ############################################################################################
const corsOptions = {
  origin: process.env.REACT_APP_URI, // nur Zugriff von dieser Domain erlauben
  exposedHeaders: "Authorization", //dem Frontend Zugriff auf die Header-Property "Authorization" geben
};
// app.use(express());
app.use(cors(corsOptions));
app.use(express.json());


// ############################################################################################
// ----------------------------- Router -------------------------------------------------------
// ############################################################################################
app.use('/api/users', usersRouter);

app.listen(port, () => console.log(`The server is running on port ${port}`));