import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { logindata } from "./BusinessLogic/userlogin.mjs";
import { userAuth } from "./BusinessLogic/userAuth.mjs";
import { changePassword, sendOtp, verifyOtp } from "./BusinessLogic/userPasswordUpdate.mjs";
import { getTotalDeveloperByRole, getTotalUsersByRole } from "./BusinessLogic/AdminDashboard/admindashboarddata.mjs";
import { deleteUserById, getAllDeveloper, getAllUsers, updateUserRoleByEmail } from "./BusinessLogic/AdminDashboard/admintotalUser.mjs";
import { createTool, deleteTool, getAllTools, getToolById, getToolByIdAndMainCatagory, getToolByIdAndSubCatagory, getToolByIdAndSubSubCatagory, updateTool } from "./BusinessLogic/DeveloperDashboard/toolManagement.mjs";
import bodyParser from 'body-parser';

// mongoDb connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{console.log("mongoDb connected")})
.catch((err)=>{console.log("error",err)});

// /port connection
const app = express();
const port = 8080;
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
app.get('/gettotalUserCounts',getTotalUsersByRole)
app.get('/gettotalDeveloperCounts',getTotalDeveloperByRole)
app.get('/getallUser',getAllUsers)
app.get('/getallDeveloper',getAllDeveloper)
app.get('/updateUserRoleByEmail',updateUserRoleByEmail)
app.delete('/users/:id', deleteUserById);
// Developer end points
app.post('/toolCreated', createTool);
app.get('/tools', getAllTools);
app.get('/tools/:id', getToolById);
app.get('/toolsByMainCatagory/:id/:toolMainCatagory', getToolByIdAndMainCatagory);
app.get('/toolsBySubCatagory/:id/:toolSubCatagory', getToolByIdAndSubCatagory);
app.get('/toolsBySubSubCatagory/:id/:toolSubSubCatagory', getToolByIdAndSubSubCatagory);
app.put('/toolsUpdate/:id', updateTool);
app.delete('/toolsDelete/:id', deleteTool);




// port listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});