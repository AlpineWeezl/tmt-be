import { Company } from "../models/Company.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ----------------------------------------- new company ------------------------------------------------
export const createCompany = async (req, res) => {
    const { company } = req.body;
    const { associationId } = req.params;
    company.associationId = associationId;
    try {
        const createdCompany = await Company.create(company);
        res.status(201).json({ company: createdCompany, message: 'Company was created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Creation of the new company failed!' })
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json({ companies: companies })
    } catch (error) {
        res.status(500).json({ error: 'Companys request failed' })
    }
}

export const getAllCompaniesByAssociationId = async (req, res) => {
    const { associationId } = req.params;
    console.log(associationId);
    try {
        const companies = await Company.find({ associationId: associationId });
        if (companies) {
            res.status(200).json({ companies: companies });
        } else {
            res.status(404).json({ message: `No companies for associationId ${companyId} found!` });
        };
    } catch (error) {
        res.status(500).json({ error: 'Companies request failed' })
    }
}

// ------------------------------------------- Single By ID ------------------------------------------
export const getSingleCompanyByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    try {
        const company = await Company.findById(companyId);
        res.status(200).json({ company: company })
    } catch (error) {
        res.status(500).json({ error: 'Company request failed' })
    }
}

// ######################################## Update ###################################################
// -------------------------------------- Update company ------------------------------------------------
export const updateCompany = async (req, res) => {
    const { companyId } = req.params;
    const { company } = req.body;
    try {
        Company.modifiedAt = new Date();
        const resCompany = await Company.findByIdAndUpdate(companyId, company, { new: true });
        res.status(200).json({ company: resCompany });
    } catch (error) {
        res.status(500).json({ error: 'Modifying of the company failed!' });
        console.log(error);
    }
}

// ######################################## Delete ###################################################
export const deleteCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
        await company.findByIdAndDelete(companyId);
        res.status(200).json({ message: 'Company successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Deleting of the Company failed!' })
    }
}