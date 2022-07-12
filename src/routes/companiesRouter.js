import { Router } from "express";
import { createCompany, deleteCompany, getAllCompanies, getAllCompaniesByAssociationId, getSingleCompanyByCompanyId, updateCompany } from "../controller/companiesConroller.js";
import { adminCheck, authorization } from "../middlewares/auth.js";

export const companiesRouter = Router();

companiesRouter
    .route('/')
    .get(authorization, adminCheck, getAllCompanies)
    .all();

companiesRouter
    .route('/:companyId')
    .get(authorization, adminCheck, getSingleCompanyByCompanyId)
    .put(authorization, adminCheck, updateCompany)
    .delete(authorization, adminCheck, deleteCompany)
    .all();

companiesRouter
    .route('/association/:associationId')
    .post(authorization, adminCheck, createCompany)
    .get(authorization, adminCheck, getAllCompaniesByAssociationId)
    .all();