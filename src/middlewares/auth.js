import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";


export const encryptPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        req.body.encryptedPassword = encryptedPassword;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Password encrytion failed!' });
    }
}

export const createToken = async (req, res, next) => {
    const token = jwt.sign(
        {
            email: req.body.email
        },
        process.env.JWT_SECRET
        // { expiresIn: "1h" } // options
    );
    if (token && newUser) {
        res
            .status(201)
            .set("authorization", token)
            .send("User successfully created");
    }
}

export const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) { res.status(401).json({ error: "API Access denied" }); }
    try {
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.decryptedToken = decryptedToken;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalid!' });
    }
};

export const adminCheck = async (req, res, next) => {
    const { decryptedToken } = req;
    try {
        const user = User.find({ email: decryptedToken.email });
        user.admin ? req.admin = true : req.admin = false;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Password encrytion failed!' });
    }
}