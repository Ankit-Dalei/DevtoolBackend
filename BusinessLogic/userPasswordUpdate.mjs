import multer from "multer";
import { User } from "../Services/userService.mjs";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { emailFormat } from "../emailFormat.mjs";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
        user: "codehub976@gmail.com",
        pass: "",
    },
});

// Set up multer to handle form-data
const upload = multer();

// In-memory storage for OTPs and tokens
const otpStore = new Map();
const tokenStore = new Map();

// Generate a random OTP
const generateOtp = () => crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP

// Middleware to send OTP to user's email
export const sendOtp = [
    upload.none(),
    async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const otp = generateOtp();
            otpStore.set(email, { otp, expiresAt: Date.now() + 300000 }); // OTP valid for 5 minutes

            // Send OTP email
            await transporter.sendMail({
                from: 'codehub976@gmail.com',
                to: email,
                subject: 'Your OTP for Password Reset',
                // text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
                html: emailFormat(otp)
            });

            return res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error('Error sending OTP:', error);
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
    }
];

// Middleware to verify OTP and generate a password reset token
export const verifyOtp = [
    upload.none(),
    async (req, res) => {
        const { email, otp } = req.body;

        try {
            const storedOtp = otpStore.get(email);
            if (!storedOtp || storedOtp.expiresAt < Date.now()) {
                return res.status(400).json({ message: 'OTP expired or invalid' });
            }

            if (storedOtp.otp !== otp) {
                return res.status(400).json({ message: 'Incorrect OTP' });
            }

            // Generate a password reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            tokenStore.set(email, resetToken);

            // Return the reset token
            return res.status(200).json({ message: 'OTP verified', resetToken });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return res.status(500).json({ message: 'Failed to verify OTP' });
        }
    }
];

// Middleware to change the password
export const changePassword = [
    upload.none(),
    async (req, res) => {
        const { email, resetToken, newPassword } = req.body;

        try {
            const storedToken = tokenStore.get(email);
            if (storedToken !== resetToken) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Hash the new password before saving
            user.password = newPassword;
            await user.save();

            // Clean up the token
            tokenStore.delete(email);

            return res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error('Error updating password:', error);
            return res.status(500).json({ message: 'Failed to update password' });
        }
    }
];
