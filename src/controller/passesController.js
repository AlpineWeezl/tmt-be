import { Pass } from "../models/Pass.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ----------------------------------------- new Pass ------------------------------------------------
export const createPass = async (req, res) => {
    const { pass } = req.body;
    const { token } = req.headers;
    try {
        const newPass = {
            pass
        }
        const createdPass = await Pass.create(newPass);
        res.set({ 'authorization': token }).status(201).json({ pass: createdPass, message: 'pass was created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Creation of the new Pass failed!' })
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllPasses = async (req, res) => {
    try {
        const pass = await Pass.find();
        res.status(200).json({ pass })
    } catch (error) {
        res.status(500).json({ error: 'Passs request failed' })
    }
}

export const getAllPassesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const pass = await Pass.find({ userId: userId });
        if (pass) {
            res.status(200).json({ pass });
        } else {
            res.status(404).json({ message: `No passes for userId ${userId} found!` });
        };
    } catch (error) {
        res.status(500).json({ error: 'Passs request failed' })
    }
}

// ------------------------------------------- Single By ID ------------------------------------------
export const getSinglePassByPassId = async (req, res) => {
    const { passId } = req.params;
    try {
        const pass = await Pass.findById(PassId);
        res.status(200).json({ pass })
    } catch (error) {
        res.status(500).json({ error: 'Pass request failed' })
    }
}

// ######################################## Update ###################################################
// -------------------------------------- Update Pass ------------------------------------------------
export const updatePass = async (req, res) => {
    const { PassId } = req.params;
    const { Pass } = req.body;
    try {
        Pass.modifiedAt = new Date();
        const resPass = await Pass.findByIdAndUpdate(PassId, Pass, { new: true });
        res.status(200).json({ Pass: resPass });
    } catch (error) {
        res.status(500).json({ error: 'Modifying of the Pass failed!' })
    }
}

// ######################################## Delete ###################################################
export const deletePass = async (req, res) => {
    const { PassId } = req.params;
    try {
        await Pass.findByIdAndDelete(PassId);
        res.status(200).json({ message: 'Pass successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Deleting of the Pass failed!' })
    }
}