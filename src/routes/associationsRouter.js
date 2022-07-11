import { Router } from "express";
import { createAssociation, deleteAssociation, getAllAssociations, getSingleAssociationByAssociationId, updateAssociation } from "../controller/assciationsController.js";
import { adminCheck, authorization } from "../middlewares/auth.js";

export const associationsRouter = Router();

associationsRouter
    .route('/')
    .get(authorization, adminCheck, getAllAssociations)
    .post(authorization, adminCheck, createAssociation)
    .all();

associationsRouter
    .route('/:associationId')
    .get(authorization, adminCheck, getSingleAssociationByAssociationId)
    .put(authorization, adminCheck, updateAssociation)
    .delete(authorization, adminCheck, deleteAssociation)
    .all();
    