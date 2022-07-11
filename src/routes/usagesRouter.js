import { Router } from "express";
import { deleteUsage, getAllUsages, getSingleUsageByUsageId, updateUsage } from "../controller/usagesController.js";
import { adminCheck, authorization, ownAccount } from "../middlewares/auth.js";

export const usagesRouter = Router();

usagesRouter
    .route('/')
    .get(authorization, adminCheck, getAllUsages)
    .all();

usagesRouter
    .route('/:usageId')
    .get(authorization, ownAccount, getSingleUsageByUsageId)
    .put(authorization, ownAccount, updateUsage)
    .delete(authorization, ownAccount, deleteUsage)
    .all();

usagesRouter
    .route('/user/:userId')
    .get(authorization, ownAccount, getAllUsageByUserId)
    .post(authorization, ownAccount, createUsage)
    .all();

usagesRouter
    .route('/pass/:passId')
    .get(authorization, ownAccount, getAllUsageByUserId)
    .post(authorization, ownAccount, createUsage)
    .all();

usagesRouter
    .route('/usage/:usageId')
    .get(authorization, ownAccount, getAllUsageByUserId)
    .post(authorization, ownAccount, createUsage)
    .all();