import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { logindata } from "./BusinessLogic/userlogin.mjs";
import { userAuth } from "./BusinessLogic/userAuth.mjs";
import { changePassword, sendOtp, verifyOtp } from "./BusinessLogic/userPasswordUpdate.mjs";
import { getTotalDeveloperByRole, getTotalUsersByRole } from "./BusinessLogic/AdminDashboard/admindashboarddata.mjs";
import { deleteUserByEmail, getAllDeveloper, getAllUsers, updateUserRoleByEmail } from "./BusinessLogic/AdminDashboard/admintotalUser.mjs";
import { createTool, deleteTool, getAllTools, getCalculatorTools, getConverterTools, getGeneratorTools, getToolById, getToolBySubCatagory, getToolBySubSubCatagory, getTotalCalculatorCount, getTotalConverterCount, getTotalGeneratorCount, getTotaltoolCount, updateTool } from "./BusinessLogic/DeveloperDashboard/toolManagement.mjs";
import bodyParser from 'body-parser';

// mongoDb connection
mongoose.connect('mongodb://127.0.0.1:27017/DevToolsB')
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
app.put('/updateUserRoleByEmail',updateUserRoleByEmail)
app.delete('/users/:email', deleteUserByEmail);
// Developer end points
app.post('/toolCreated', createTool);
app.get('/tools', getAllTools);
app.get('/toolsCount', getTotaltoolCount);
app.get('/toolsCalculatorCount', getTotalCalculatorCount);
app.get('/toolsConverterCount', getTotalConverterCount);
app.get('/toolsGeneratorCount', getTotalGeneratorCount);
app.get('/toolsCalculator', getCalculatorTools);
app.get('/toolsConverter', getConverterTools);
app.get('/toolsGenerator', getGeneratorTools);
app.get('/tools/:id', getToolById);
// app.get('/toolsByMainCatagory/:toolMainCatagory', getToolByIdAndMainCatagory);
app.get('/toolsBySubCatagory/:toolSubCatagory', getToolBySubCatagory);
app.get('/toolsBySubSubCatagory/:toolSubSubCatagory', getToolBySubSubCatagory);
app.put('/toolsUpdate/:id', updateTool);
app.delete('/toolsDelete/:id', deleteTool);




// port listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});