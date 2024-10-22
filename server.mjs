import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { logindata } from "./BusinessLogic/userlogin.mjs";
import { userAuth } from "./BusinessLogic/userAuth.mjs";
import { changePassword, sendOtp, verifyOtp } from "./BusinessLogic/userPasswordUpdate.mjs";
import { getTotalDeveloperByRole, getTotalUsersByRole } from "./BusinessLogic/AdminDashboard/admindashboarddata.mjs";
import { deleteUserByEmail, getAllDeveloper, getAllUsers, updateUserRoleByEmail } from "./BusinessLogic/AdminDashboard/admintotalUser.mjs";
import { createTool, deleteTool, getAllTools, getCalculatorTools, getConverterTools, getGeneratorTools, getToolById, getToolByIdforrender, getToolBySubCatagory, getToolBySubSubCatagory, getTotalCalculatorCount, getTotalConverterCount, getTotalGeneratorCount, getTotaltoolCount, updateTool } from "./BusinessLogic/DeveloperDashboard/toolManagement.mjs";
import bodyParser from 'body-parser';
import auth from "./toolsAuth/auth.mjs";
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log("error", err);
  });


// /port connection
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Allow CORS for the specific origin
app.use(cors({
  origin: 'https://project-dev-tools-b.vercel.app',
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  credentials: true // If credentials like cookies or headers are needed
}));
app.use(express.json());
// Signup end pointsapp.post('/Signup', logindata, (req, res) => {
app.post('/Signup', logindata, (req, res) => {
  try {
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});


// login end points
app.post('/login',userAuth);
// Forgot password end point
app.post('/send-otp', sendOtp);
app.post('/verify-otp', verifyOtp);
app.post('/change-password', changePassword);
// Admin end points
app.get('/gettotalUserCounts/:userId',auth,getTotalUsersByRole)
app.get('/gettotalDeveloperCounts/:userId',auth,getTotalDeveloperByRole)
app.get('/getallUser/:userId',auth,getAllUsers)
app.get('/getallDeveloper/:userId',auth,getAllDeveloper)
app.put('/updateUserRoleByEmail/:userId',auth,updateUserRoleByEmail)
app.delete('/users/:email/:userId',auth, deleteUserByEmail);
// Developer end points
app.post('/toolCreated/:userId',auth, createTool);
app.get('/tools/:userId',auth, getAllTools);
app.get('/toolsCount/:userId',auth, getTotaltoolCount);
app.get('/toolsCalculatorCount/:userId',auth, getTotalCalculatorCount);
app.get('/toolsConverterCount/:userId',auth, getTotalConverterCount);
app.get('/toolsGeneratorCount/:userId',auth, getTotalGeneratorCount);
app.get('/toolsCalculator/:userId',auth, getCalculatorTools);
app.get('/toolsConverter/:userId',auth, getConverterTools);
app.get('/toolsGenerator/:userId',auth, getGeneratorTools);
app.get('/tools/:id/:userId',auth, getToolById);
app.get('/toolsRender/:id/:userId',auth, getToolByIdforrender);
// app.get('/toolsByMainCatagory/:toolMainCatagory', getToolByIdAndMainCatagory);
app.get('/toolsBySubCatagory/:toolSubCatagory/:userId',auth, getToolBySubCatagory);
app.get('/toolsBySubSubCatagory/:toolSubSubCatagory/:userId',auth, getToolBySubSubCatagory);
app.put('/toolsUpdate/:id/:userId',auth, updateTool);
app.delete('/toolsDelete/:id/:userId',auth, deleteTool);




// Start server
// port listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});