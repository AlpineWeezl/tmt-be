import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// ------------------------------------------------- encrypt the password before passing via the req.body --------------------------------------------
export const encryptPassword = async (req, res, next) => {
    const { password } = req.body.user;
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        req.body.encryptedPassword = encryptedPassword;
        next();
    } catch (err) {
        res.status(500).json({ error: 'Password encrytion failed!' });
    }
}

// ------------------------------------------------------- create a token for passing via the req.headers --------------------------------------------
export const createToken = async (req, res, next) => {
    const { email, username } = req.body;
    try {
        const user = await User.findOne({ or: [{ email: email }, { username: username }] });
        const userId = user._id;
        const token = jwt.sign({ userId, email, username }, process.env.JWT_SECRET); // { expiresIn: "1h" } -> optional
        req.headers.token = token;
        !req.body.user && (req.body.user = user);
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
            req.decryptedToken = decryptedToken;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Token invalid!' });
        }
    }
};

// ------------------------------------------------------------------- check if the credential matches ----------------------------------------------------
export const credentialCheck = async (req, res, next) => {
    const { email, username, password } = req.body.user;
    try {
        const user = await User.findOne({ $or: [{ email: email }, { username: username }] }).select("+password");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        const decryptedToken = {
            userId: user._id,
            email: user.email,
            username: user.username
        }
        req.decryptedToken = decryptedToken;
        !user && res.status(401).json({ error: 'Please create an account!' });
        isPasswordCorrect ? next() : res.status(401).json({ error: 'Password incorrect!' });
    } catch (error) {
        res.status(500).json({ error: 'Password check failed' });
    }
}

// ------------------------------------------------- check if the account to be modified is owned by the user reqeusted ---------------------------------
export const ownAccount = async (req, res, next) => {
    const { userId } = req.params;
    const { email } = req.decryptedToken;
    try {
        const user = await User.findById(userId);
        (email === user.email || user.admin) ? next() : res.status(401).json({ error: `You don't own this account!` })
    } catch (error) {
        res.status(401).json({ error: 'Account check failed' });
    }
}

// -------------------------------------------------------------- check if the user has admin privillegues -----------------------------------------------
export const adminCheck = async (req, res, next) => {
    const { decryptedToken } = req.headers;
    const { email } = req.decryptedToken;
    let tempEmail = null;
    decryptedToken ? tempEmail = decryptedToken : email;

    try {
        const user = await User.findOne({ email: tempEmail });
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
}