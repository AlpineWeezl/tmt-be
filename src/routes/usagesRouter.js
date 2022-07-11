import { Router } from "express";
import { createUsage, deleteUsage, getAllUsageesByUserId, getAllUsages, getAllUsagesByPassId, getSingleUsageByUsageId, updateUsage } from "../controller/usagesController.js";
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
    .get(authorization, ownAccount, getAllUsageesByUserId)
    .post(authorization, ownAccount, createUsage)
    .all();
    
    usagesRouter
    .route('/pass/:passId')
    .get(authorization, ownAccount, getAllUsagesByPassId)
    .post(authorization, ownAccount, createUsage)
    .all();
    