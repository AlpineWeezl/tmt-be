import { User } from "../models/User.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ------------------------------------------ Sign up ------------------------------------------------
export const createUser = async (req, res) => {
    const { user, encryptedPassword } = req.body;
    const { token } = req.headers;
    try {
        const newUser = {
            ...user,
            password: encryptedPassword
        }
        const createdUser = await User.create(newUser);
        createTokenForNewUser(createdUser);
        res.set({ 'authorization': token }).status(201).json({ user: createdUser, message: 'success' });

    } catch (error) {
        res.status(500).json({ error: 'Creation of new user failed!' })
    }
}

const createTokenForNewUser = async (user) => {
    const { userId, email, username } = user;
    try {
        const token = await jwt.sign({ userId, email, username }, process.env.JWT_SECRET); // { expiresIn: "1h" } -> optional
        req.headers.token = token;
    }
    catch (error) {
        res.status(500).json({ error: 'Creation of the token failed' });
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users })
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
        user.modifiedAt = new Date();
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
    const { user } = req.body;
    try {
        res
            .set("authorization", token)
            .status(200)
            .json({ user: user, message: "User successfully logged in" });
    } catch (error) {
        res.status(500).json({ error: 'Login failed!' });
    }
};

// -------------------------------- create the response if succesfully verified ----------------------
export const verifySession = async (req, res) => {
    const { token } = req.headers;
    const { user } = req.body;
    try {
        token && await res
            .set("authorization", token)
            .status(200)
            .json({user: user, message: 'User successfully verified!' });

        !token && await res
            .status(401)
            .json({ message: 'User could NOT be verified!' })
    } catch (error) {
    }
};