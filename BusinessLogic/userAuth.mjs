import mongoose from "mongoose";
import multer from "multer";
import { User } from "../Services/userService.mjs";
import { encryptId, decryptId } from "../toolsAuth/decryption.mjs"; // Import encryption & decryption functions
import crypto from "crypto"; // Optional: to generate a unique random value

// Set up multer to handle form-data
const upload = multer();

export const userAuth = [
    upload.none(), // Middleware to parse text fields in form-data
    async (req, res, next) => {
        const { Username, email, password } = req.body;

        try {
            let AuthUser;
            if (Username) {
                // Find the user by Username
                AuthUser = await User.findByUsername(Username);
            } else if (email) {
                // Find the user by email
                AuthUser = await User.findByEmail(email);
            } else {
                return res.status(400).send({ message: "Username or email is required" });
            }

            if (!AuthUser) {
                return res.status(404).send({ message: "User not found" });
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await User.comparePassword(password, AuthUser);
            if (!isMatch) {
                return res.status(401).send({ message: "Invalid password" });
            }

            // Generate a dynamic component for encryption (optional but recommended)
            const uniqueValue = crypto.randomBytes(16).toString("hex"); // Generate a unique value
            const dynamicData = `${AuthUser._id.toString()}-${uniqueValue}`; // Combine the user ID with a unique value

            // Encrypt the dynamic data to create a new encrypted ID each time
            const encryptedId = encryptId(dynamicData);

            // Successful authentication, send encrypted _id
            res.status(200).send({
                message: "Authentication successful",
                user: {
                    ...AuthUser.toObject(),
                    _id: encryptedId // Send new encrypted _id
                }
            });
        } catch (err) {
            res.status(500).send({ error: "Server error", details: err.message });
        }
    }
];
