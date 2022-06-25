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
    .route('/profile')
    .get()
    .put()
    .delete()
    .all()