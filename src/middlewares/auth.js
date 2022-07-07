import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// ------------------------------------------------- encrypt the password before passing via the req.body --------------------------------------------
export const encryptPassword = async (req, res, next) => {
    const { password } = req.body;
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
    try {
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET); // { expiresIn: "1h" } -> optional
        req.headers.token = token;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Creation of the Token failed' });
    }
}

// --------------------------------- verify the token to ensure the user is authorized to access the desired route ------------------------------------
export const authorization = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) { res.status(401).json({ error: "API Access denied" }); }
    try {
        const decryptedToken = jwt.verify(authorization, process.env.JWT_SECRET);
        req.decryptedToken = decryptedToken;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalid!' });
    }
};

// ------------------------------------------------------------------- check if the credential matches ----------------------------------------------------
export const credentialCheck = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).select("+password");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
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
        res.status(500).json({ error: 'Account check failed' });
    }
}

// -------------------------------------------------------------- check if the user has admin privilleges -----------------------------------------------
export const adminCheck = async (req, res, next) => {
    const { decryptedToken, token } = req.headers;
    const { email } = req.body;
    let tempEmail = null;
    decryptedToken ? tempEmail = decryptedToken : email;

    try {
        const user = User.findOne({ email: tempEmail });
        console.log(user);
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