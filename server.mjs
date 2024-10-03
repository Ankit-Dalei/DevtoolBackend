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
// mongoDb connection
mongoose.connect('mongodb://127.0.0.1:27017/DevToolsB')
.then(()=>{console.log("mongoDb connected")})
.catch((err)=>{console.log("error",err)});

// /port connection
const app = express();
const port = 8080;
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// Signup end points
app.post('/Signup',logindata,(req, res) => {
  console.log(req.body)
  return res.status(200).json({
    msg:"success"
  });
});
// login end points
app.post('/login',userAuth);
// Forgot password end point
app.post('/send-otp', sendOtp);
app.post('/verify-otp', verifyOtp);
app.post('/change-password', changePassword);
// Admin end points
app.get('/gettotalUserCounts',auth,getTotalUsersByRole)
app.get('/gettotalDeveloperCounts',auth,getTotalDeveloperByRole)
app.get('/getallUser',auth,getAllUsers)
app.get('/getallDeveloper',auth,getAllDeveloper)
app.put('/updateUserRoleByEmail',auth,updateUserRoleByEmail)
app.delete('/users/:email',auth, deleteUserByEmail);
// Developer end points
app.post('/toolCreated',auth, createTool);
app.get('/tools',auth, getAllTools);
app.get('/toolsCount',auth, getTotaltoolCount);
app.get('/toolsCalculatorCount',auth, getTotalCalculatorCount);
app.get('/toolsConverterCount',auth, getTotalConverterCount);
app.get('/toolsGeneratorCount',auth, getTotalGeneratorCount);
app.get('/toolsCalculator',auth, getCalculatorTools);
app.get('/toolsConverter',auth, getConverterTools);
app.get('/toolsGenerator',auth, getGeneratorTools);
app.get('/tools/:id',auth, getToolById);
app.get('/toolsRender/:id',auth, getToolByIdforrender);
// app.get('/toolsByMainCatagory/:toolMainCatagory', getToolByIdAndMainCatagory);
app.get('/toolsBySubCatagory/:toolSubCatagory',auth, getToolBySubCatagory);
app.get('/toolsBySubSubCatagory/:toolSubSubCatagory',auth, getToolBySubSubCatagory);
app.put('/toolsUpdate/:id',auth, updateTool);
app.delete('/toolsDelete/:id',auth, deleteTool);




// port listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});