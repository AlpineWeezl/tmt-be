import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUserByUserId, logIn, updateUser } from "../controller/usersController.js";
import { adminCheck, authorization, createToken, encryptPassword, credentialCheck, ownAccount } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter
    .route('/')
    .get(authorization, adminCheck, getAllUsers)
    .post(encryptPassword, createToken, createUser)
    .all();

usersRouter
    .route('/login')
    .post(credentialCheck, createToken, adminCheck, logIn)
    .all();

usersRouter
    .route('/:userId')
    .get(authorization, getSingleUserByUserId)
    .put(authorization, ownAccount, updateUser)
    .delete(authorization, ownAccount, deleteUser)
    .all();