import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { Pass } from "../models/Pass.js";

// ------------------------------------------------- encrypt the password before passing via the req.body --------------------------------------------
export const encryptPassword = async (req, res, next) => {
    const { password } = req.body.user;
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        req.body.encryptedPassword = encryptedPassword;
        req.body.user.password = encryptedPassword;
        next();
    } catch (err) {
        res.status(500).json({ error: 'Password encrytion failed!' });
    }
}

// ------------------------------------------------------- create a token for passing via the req.headers --------------------------------------------
export const createToken = async (req, res, next) => {
    const { body } = req;
    try {
        const user = await User.findOne({ or: [{ email: body.email }, { username: body.username }] });
        const userId = user._id;
        const email = user.email;
        const username = user.username;
        !req.body.user && (req.body.user = user);
        const token = jwt.sign({ userId, email, username }, process.env.JWT_SECRET); // { expiresIn: "1h" } -> optional
        req.headers.token = token;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Creation of the token failed' });
    }
}

// --------------------------------- verify the token to ensure the user is authorized to access the desired route ------------------------------------
export const authorization = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "API Access denied" });
    } else {
        try {
            const decryptedToken = jwt.verify(authorization, process.env.JWT_SECRET);
            const user = await User.findById(decryptedToken.userId);
            (!req.body.user) && (req.body.user = user);
            req.decryptedToken = decryptedToken;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Token invalid!' });
        }
    }
};

// ------------------------------------------------------------------- check if the credential matches ----------------------------------------------------
export const credentialCheck = async (req, res, next) => {
    const { user } = req.body;
    try {
        const newUser = await User.findOne({ $or: [{ email: user.email }, { username: user.username }] }).select("+password");
        const isPasswordCorrect = await bcrypt.compare(user.password, newUser.password);
        const decryptedToken = {
            userId: newUser._id,
            email: newUser.email,
            username: newUser.username
        }
        req.decryptedToken = decryptedToken;
        req.body.user = newUser;
        !user && res.status(401).json({ error: 'Please create an account!' });
        isPasswordCorrect ? next() : res.status(401).json({ error: 'Password incorrect!' });
    } catch (error) {
        res.status(500).json({ error: 'Password check failed' });
    }
}

// ------------------------------------------------- check if the account to be modified is owned by the user reqeusted ---------------------------------
export const ownAccount = async (req, res, next) => {
    const { passId } = req.params;
    const { email, userId } = req.decryptedToken;
    try {
        const user = await User.findById(userId);
        const pass = await Pass.findById(passId);
        if ((pass && (pass.userId === userId || user.admin)) || (!pass && (email === user.email || user.admin))) {
            next()
        } else {
            res.status(401).json({ error: `You don't own this account!` })
        }
    } catch (error) {
        res.status(401).json({ error: 'Account check failed' });
    }
}

// -------------------------------------------------------------- check if the user has admin privillegues -----------------------------------------------
export const adminCheck = async (req, res, next) => {
    const { user } = req.body;
    if (user.email) {
        try {
            // const user = await User.findOne({ email: decryptedToken.email });
            if (user.admin) {
                req.body.admin = true
                next();
            } else {
                req.body.admin = false;
                req.body.statusMessage = 'You have no admin privilleges!';
                next();
            }
        } catch (error) {
            res.status(401).json({ error: 'Admin check failed!' });
        }
    } else {
        req.body.admin = false;
        next();
    }
}