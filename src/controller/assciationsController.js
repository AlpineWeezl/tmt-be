import { Association } from "../models/Association.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ----------------------------------------- new association ------------------------------------------------
export const createAssociation = async (req, res) => {
    const { association } = req.body;
    const { passId } = req.params;
    association.passId = passId;
    try {
        const createdAssociation = await Association.create(association);
        res.status(201).json({ association: createdAssociation, message: 'association was created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Creation of the new association failed!' })
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllAssociations = async (req, res) => {
    try {
        const association = await Association.find();
        res.status(200).json({ associations: association })
    } catch (error) {
        res.status(500).json({ error: 'associations request failed' })
    }
}

// ------------------------------------------- Single By ID ------------------------------------------
export const getSingleAssociationByAssociationId = async (req, res) => {
    const { associationId } = req.params;
    try {
        const association = await Association.findById(associationId);
        res.status(200).json({ association: association })
    } catch (error) {
        res.status(500).json({ error: 'Association request failed' })
    }
}

// ######################################## Update ###################################################
// -------------------------------------- Update association ------------------------------------------------
export const updateAssociation = async (req, res) => {
    const { associationId } = req.params;
    const { association } = req.body;
    try {
        association.modifiedAt = new Date();
        const resAssociation = await Association.findByIdAndUpdate(associationId, association, { new: true });
        res.status(200).json({ association: resAssociation });
    } catch (error) {
        res.status(500).json({ error: 'Modifying of the association failed!' });
        console.log(error);
    }
}

// ######################################## Delete ###################################################
export const deleteAssociation = async (req, res) => {
    const { associationId } = req.params;
    try {
        await Association.findByIdAndDelete(associationId);
        res.status(200).json({ message: 'Association successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Deleting of the association failed!' })
    }
}