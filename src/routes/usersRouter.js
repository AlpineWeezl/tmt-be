import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUserByUserId, logIn, updateUser, verifySession } from "../controller/usersController.js";
import { adminCheck, authorization, createToken, encryptPassword, credentialCheck, ownAccount } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter
    .route('/')
    .get(authorization, adminCheck, createToken, getAllUsers)
    .post(encryptPassword, createToken, createUser)
    .all();

usersRouter
    .route('/auth')
    .get(authorization, adminCheck, createToken, verifySession)
    .all();

usersRouter
    .route('/login')
    .post(credentialCheck, adminCheck, createToken, logIn)
    .all();

usersRouter
    .route('/:userId')
    .get(authorization, getSingleUserByUserId)
    .put(authorization, createToken, ownAccount, updateUser)
    .delete(authorization, ownAccount, deleteUser)
    .all();