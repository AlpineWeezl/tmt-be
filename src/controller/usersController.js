import { User } from "../models/User.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ------------------------------------------ Sign up ------------------------------------------------
export const createUser = async (req, res) => {
    const { username, email, encryptedPassword, message } = req.body;
    const { token } = req.headers;
    try {
        const newUser = {
            username: username,
            email: email,
            password: encryptedPassword
        }
        const createdUser = await User.create(newUser);
        res.set({ 'authorization': token }).status(201).json({ users: createdUser, message: message })
    } catch (error) {
        res.status(500).json({ error: 'Creation of the new user failed!' })
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ error: 'Users request failed' })
    }
}

// ------------------------------------------- Single By ID ---------------------------------------------
export const getSingleUserByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).json({ error: 'User request failed' })
    }
}

// ######################################## Update #####################################################
// -------------------------------------- Update User --------------------------------------------------
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { user } = req.body;
    try {
        user.modifiedAt = new Date;
        const resUser = await User.findByIdAndUpdate(userId, user, { new: true });
        res.status(200).json({ user: resUser });
    } catch (error) {
        res.status(500).json({ error: 'Modifying of the user failed!' })
    }
}

// ######################################## Delete #####################################################
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Deleting of the user failed!' })
    }
}

// ###################################################################################################
// ####################################### Advanced CRUD #############################################
// ###################################################################################################
// ----------------------------------------- LogIn ---------------------------------------------------
export const logIn = async (req, res) => {
    const { token } = req.headers;
    try {
        res
            .set("authorization", token)
            .status(200)
            .json({ message: "User successfully logged in" });
    } catch (error) {
        res.status(500).json({ error: 'Login failed!' });
    }
};

// -------------------------------- create the response if succesfully verified ----------------------
export const verifySession = async (req, res) => {
    const { token } = req.headers;
    try {
        token && await res
            .set("authorization", token)
            .status(200)
            .json({ message: 'User successfully verified!' });

        !token && await res
            .status(401)
            .json({ message: 'User could NOT be verified!' })
    } catch (error) {
    }
};