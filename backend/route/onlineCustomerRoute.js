import { Router } from "express";
import { onlineSignup, onlineSignin, onlineCustomerProfile, uploadFile, onlineLogout } from "../controller/onlineCustomercontroller.js";
import authenticateToken from "../middleware/authenticateToken.js";
// import mongoose from "mongoose";
import upload from "../file-upload/onlineCustomerFileUpload.js";
import validateObjectId from "../middleware/validateObjectId.js";

const onlineCustomerRouter = Router();
onlineCustomerRouter.route("/signup").post(onlineSignup);
onlineCustomerRouter.route("/signin").post(onlineSignin);
// Route to get the customer profile (with token authentication)
onlineCustomerRouter.route('/profile/:id').get( authenticateToken, validateObjectId, onlineCustomerProfile);
onlineCustomerRouter.route("/upload").post(authenticateToken,upload.single("file"),uploadFile);
onlineCustomerRouter.route("/logout").post(onlineLogout);



export default onlineCustomerRouter;