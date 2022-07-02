import { User } from "../models/User.js"

// ###################################################################################################
// ######################################## BASIC CRUD ###############################################
// ###################################################################################################

// ########################################## Create #################################################
// ------------------------------------------ Sign UP ------------------------------------------------

export const createUser = async (req, res) => {
    const { username, email, encryptedPassword } = req.body;
    try {
        const newUser = {
            username: username,
            email: email,
            password: encryptedPassword
        }
        console.log(User.findOne({ email: newUser.email }));
        if (User.findOne({ email: newUser.email }) && User.findOne({ username: newUser.username }).length > 0) {
            await User.create(newUser);
            res.status(201).json({ users: newUser })
        } else {
            res.status(500).json({ error: 'User already exists' })
        }
    } catch (error) {
        console.log(error);
    }
}

// ######################################## Read #####################################################
// ----------------------------------------- All -----------------------------------------------------
export const getAllUsers = async (req, res) => {
    console.log(req.body);
    try {
        const users = User.find();
        // console.log(users);
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ error })
    }
}

// ---------------------------------- Single By UserName ---------------------------------------------
// ------------- Single By token (The token middleware puts the id into req.body) --------------------
export const getSingleUserByUserId = (req, res) => {

}

// ---------------------------------- Single By UserName ---------------------------------------------



// ######################################## Update #####################################################

// ------------- Single By token (The token middleware puts the id into req.body) --------------------
export const updateUser = (req, res) => {

}

// ######################################## Delete #####################################################
export const deleteUser = (req, res) => {

}