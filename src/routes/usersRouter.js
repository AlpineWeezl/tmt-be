import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUserByUserId, logIn, updateUser, verifySession } from "../controller/usersController.js";
import { adminCheck, authorization, createToken, encryptPassword, credentialCheck, ownAccount } from "../middlewares/auth.js";
import { doubleEmailUsernameCheck } from "../middlewares/userChecks.js";

export const usersRouter = Router();

usersRouter
    .route('/')
    .get(authorization, adminCheck, getAllUsers)
    .post(encryptPassword, createUser) // The token will be created after creating user, because of the need of the userId
    .all();

usersRouter
    .route('/auth')
    .get(authorization, adminCheck, verifySession)
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