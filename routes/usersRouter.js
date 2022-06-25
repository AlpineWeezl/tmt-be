import { Router } from "express";


const usersRouter = Router();

usersRouter
    .route('/')
    .get()
    .post()
    .all()

usersRouter
    .route('/:userName')
    .get()
    .all()

usersRouter
    .route('/:userId')
    .get()
    .put()
    .delete()
    .all()