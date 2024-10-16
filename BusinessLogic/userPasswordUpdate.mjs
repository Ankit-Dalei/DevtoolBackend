// import multer from "multer";
// import { User } from "../Services/userService.mjs"; // Assume this handles user DB operations
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';
// import { emailFormat } from "../emailFormat.mjs"; // Your custom email format
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Set up multer to handle form-data
// const upload = multer();

// // In-memory storage for OTPs and tokens (consider using Redis in production)
// const otpStore = new Map();
// const tokenStore = new Map();

// // Generate a random OTP (6-character hex string)
// const generateOtp = () => crypto.randomBytes(3).toString('hex');

// // Middleware to send OTP to user's email
// export const sendOtp = [
//     upload.none(),
//     async (req, res) => {
//         const { email } = req.body;

//         try {
//             const user = await User.findByEmail(email); // Ensure this method exists in your user service
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             const otp = generateOtp();
//             otpStore.set(email, { otp, expiresAt: Date.now() + 300000 }); // OTP valid for 5 minutes

//             // Send OTP email
//             await transporter.sendMail({
//                 from: process.env.EMAIL_USER,
//                 to: email,
//                 subject: 'Your OTP for Password Reset',
//                 html: emailFormat(otp), // Custom email template
//             });

//             return res.status(200).json({ message: 'OTP sent successfully' });
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//             return res.status(500).json({ message: 'Failed to send OTP' });
//         }
//     }
// ];

// // Middleware to verify OTP and generate a password reset token
// export const verifyOtp = [
//     upload.none(),
//     async (req, res) => {
//         const { email, otp } = req.body;

//         try {
//             const storedOtp = otpStore.get(email);
//             if (!storedOtp || storedOtp.expiresAt < Date.now()) {
//                 return res.status(400).json({ message: 'OTP expired or invalid' });
//             }

//             if (storedOtp.otp !== otp) {
//                 return res.status(400).json({ message: 'Incorrect OTP' });
//             }

//             // Generate a password reset token with expiry time
//             const resetToken = crypto.randomBytes(32).toString('hex');
//             tokenStore.set(email, { resetToken, expiresAt: Date.now() + 600000 }); // Token valid for 10 minutes

//             // Return the reset token
//             return res.status(200).json({ message: 'OTP verified', resetToken });
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             return res.status(500).json({ message: 'Failed to verify OTP' });
//         }
//     }
// ];

// // Middleware to change the password
// export const changePassword = [
//     upload.none(),
//     async (req, res) => {
//         const { email, resetToken, newPassword } = req.body;

//         try {
//             const tokenData = tokenStore.get(email);
//             if (!tokenData || tokenData.resetToken !== resetToken || tokenData.expiresAt < Date.now()) {
//                 return res.status(400).json({ message: 'Invalid or expired token' });
//             }

//             const user = await User.findByEmail(email);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             // Hash the new password before saving
//             const hashedPassword = await bcrypt.hash(newPassword, 10);
//             user.password = hashedPassword;
//             await user.save();

//             // Clean up the token
//             tokenStore.delete(email);

//             return res.status(200).json({ message: 'Password updated successfully' });
//         } catch (error) {
//             console.error('Error updating password:', error);
//             return res.status(500).json({ message: 'Failed to update password' });
//         }
//     }
// ];
