import { Pass } from "../models/Pass.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ----------------------------------------- new Pass ------------------------------------------------
export const createPass = async (req, res) => {
    const { pass } = req.body;
    console.log(pass);
    const { token } = req.headers;
    const { userId } = req.params;
    pass.userId = userId;
    try {
        const createdPass = await Pass.create(pass);
        res.set({ 'authorization': token }).status(201).json({ pass: createdPass, message: 'pass was created successfully' })
    } catch (error) {
        console.log(error);
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
        const passes = await Pass.find({ userId: userId });
        if (passes) {
            res.status(200).json({ passes: passes });
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
        const pass = await Pass.findById(passId);
        console.log(pass);
        res.status(200).json({ pass })
    } catch (error) {
        res.status(500).json({ error: 'Pass request failed' })
    }
}

// ######################################## Update ###################################################
// -------------------------------------- Update Pass ------------------------------------------------
export const updatePass = async (req, res) => {
    const { passId } = req.params;
    console.log(passId);
    const { pass } = req.body;
    try {
        pass.modifiedAt = new Date();
        const resPass = await Pass.findByIdAndUpdate(passId, pass, { new: true });
        console.log(resPass);
        res.status(200).json({ pass: resPass });
    } catch (error) {
        res.status(500).json({ error: 'Modifying of the Pass failed!' })
    }
}

// ######################################## Delete ###################################################
export const deletePass = async (req, res) => {
    const { passId } = req.params;
    console.log(passId);

    try {
        await Usage.deleteMany({ passId: passId });
        await Pass.findByIdAndDelete(passId);
        res.status(200).json({ message: 'Pass successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Deleting of the Pass failed!' })
    }
}