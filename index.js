import 'dotenv/config';
import express from "express";
import "./src/db/client.js";
import cors from 'cors';
import { usersRouter } from './src/routes/usersRouter.js';
import { passesRouter } from './src/routes/passesRouter.js';

const app = express();
const port = process.env.PORT || 5000;

// ############################################################################################
// ----------------------------- Middlewares --------------------------------------------------
// ############################################################################################
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: process.env.REACT_APP_URI, // nur Zugriff von dieser Domain erlauben
  exposedHeaders: "Authorization", //dem Frontend Zugriff auf die Header-Property "Authorization" geben
};
// app.use(express());
app.use(cors(corsOptions));


// ############################################################################################
// ----------------------------- Router -------------------------------------------------------
// ############################################################################################
app.use('/api/users', usersRouter);
app.use('/api/passes', passesRouter);

app.listen(port, () => console.log(`The server is running on port ${port}`));