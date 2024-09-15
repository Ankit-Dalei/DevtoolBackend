import mongoose from "mongoose";
import multer from "multer";
import { User } from "../Services/userService.mjs";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const logindata = [
    // upload.single('profilePhoto'),
    async (req, res, next) => {
        const { password, gender, Username, email, lastname, firstName,profilePhoto } = req.body;
        // const profilePhoto = req.file;
        // console.log(req.file)
        // hello

        if (!password || !gender || !Username || !email || !lastname || !firstName) {
            return res.status(400).send(req.body);
        }
        const role="User"
        const newUser = new User({
            profilePhoto: profilePhoto,
            firstName,
            lastname,
            email,
            Username,
            gender,
            password,
            role,
        });

        try {
            await newUser.save();
            next();
        } catch (err) {
            res.status(500).send({ error: "Failed to create user", details: err.message });
        }
    }
];
