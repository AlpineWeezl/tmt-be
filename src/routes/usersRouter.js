import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getSingleUserByUserId, updateUser } from "../controller/usersController.js";
import { adminCheck, verifyToken } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter
    .route('/')
    .get(verifyToken, adminCheck, getAllUsers)
    .post(createUser)
    .all()

usersRouter
    .route('/:userId')
    .get(getSingleUserByUserId)
    .all()