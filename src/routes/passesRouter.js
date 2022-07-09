import { Router } from "express";
import { createPass, deletePass, getAllPasses, getAllPassesByUserId, getSinglePassByPassId, updatePass } from "../controller/passesController.js";
import { adminCheck, authorization, ownAccount } from "../middlewares/auth.js";

export const passesRouter = Router();

passesRouter
    .route('/')
    .get(authorization, adminCheck, getAllPasses)
    .all();

passesRouter
    .route('/:passId')
    .get(authorization, ownAccount, getSinglePassByPassId)
    .put(authorization, ownAccount, updatePass)
    .delete(authorization, ownAccount, deletePass)
    .all();

passesRouter
    .route('/user/:userId')
    .get(authorization, ownAccount, getAllPassesByUserId)
    .post(authorization, ownAccount, createPass)
    .all();