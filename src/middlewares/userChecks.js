// import pkg from 'joi';
// const { object, string } = pkg;

import { User } from "../models/User.js";

// const schema = object()
//     .keys({
//         email:
//             string()
//                 .email()
//                 .required(),
//         username:
//             string()
//                 .min(4)
//                 .max(40)
//                 .required(),
//         password:
//             pass()
//                 .min(8)
//                 .max(127)
//                 .required(),
//     })
// const data = {
//     name: 'Srajan',
//     age: 10
// };
// export const result = schema.validate(data);
// console.log(result);

// ------------------------------------ double email check ------------------------------------------------
export const doubleEmailUsernameCheck = (req, res, next) => {
    const { email, username } = req.body.user;
    const existingEmail = User.find({ email: email });
    console.log(existingEmail);
    const existingUsername = User.findOne({ username: username });
    if (existingEmail) {
        console.log('email exists');
        res.status(400).json({ message: "user cannot be created!" });
    } else if (existingUsername) {
        console.log('username exists');
        res.status(400).json({ message: "user cannot be created!" });
    } else {
        next();
    }
}