import { Usage } from "../models/Usage.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ----------------------------------------- new Usage ------------------------------------------------
export const createUsage = async (req, res) => {
    const { usage } = req.body;
    const { passId } = req.params;
    usage.passId = passId;
    try {
        const createdUsage = await Usage.create(usage);
        res.status(201).json({ usage: createdUsage, message: 'Usage was created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Creation of the new usage failed!' })
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllUsages = async (req, res) => {
    try {
        const Usage = await Usage.find();
        res.status(200).json({ Usage })
    } catch (error) {
        res.status(500).json({ error: 'Usages request failed' })
    }
}

export const getAllUsageesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const usages = await Usage.find({ userId: userId });
        if (usages) {
            res.status(200).json({ usages: usages });
        } else {
            res.status(404).json({ message: `No Usagees for userId ${userId} found!` });
        };
    } catch (error) {
        res.status(500).json({ error: 'Usages request failed' })
    }
}

export const getAllUsagesByPassId = async (req, res) => {
    const { passId } = req.params;
    try {
        const usages = await Usage.find({ passId: passId });
        if (usages) {
            res.status(200).json({ usages: usages });
        } else {
            res.status(404).json({ message: `No Usagees for passId ${passId} found!` });
        };
    } catch (error) {
        res.status(500).json({ error: 'Usages request failed' })
    }
}

// ------------------------------------------- Single By ID ------------------------------------------
export const getSingleUsageByUsageId = async (req, res) => {
    const { usageId } = req.params;
    try {
        const usage = await Usage.findById(usageId);
        res.status(200).json({ usage: usage })
    } catch (error) {
        res.status(500).json({ error: 'Usage request failed' })
    }
}

// ######################################## Update ###################################################
// -------------------------------------- Update Usage ------------------------------------------------
export const updateUsage = async (req, res) => {
    const { usageId } = req.params;
    const { usage } = req.body;
    try {
        Usage.modifiedAt = new Date();
        const resUsage = await Usage.findByIdAndUpdate(usageId, usage, { new: true });
        res.status(200).json({ usage: resUsage });
    } catch (error) {
        res.status(500).json({ error: 'Modifying of the Usage failed!' })
    }
}

// ######################################## Delete ###################################################
export const deleteUsage = async (req, res) => {
    const { usageId } = req.params;
    try {
        await Usage.findByIdAndDelete(usageId);
        res.status(200).json({ message: 'Usage successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Deleting of the Usage failed!' })
    }
}