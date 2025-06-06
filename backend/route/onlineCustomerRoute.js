import { Router } from "express";
import { onlineSignup, onlineSignin, onlineCustomerProfile, uploadFile, onlineLogout,getCustomersByShop, updateOnlineCustomer, getAllOnlineCustomers, deleteCustomer, changeOnlineCustomerPassword,getOnlineCustomerOrders, getOnlineCustomerProfile, requestPasswordReset, resetPassword } from "../controller/onlineCustomercontroller.js";
import authenticateToken from "../middleware/authenticateToken.js";
// import mongoose from "mongoose";
import upload from "../file-upload/onlineCustomerFileUpload.js";
import validateObjectId from "../middleware/validateObjectId.js";

const onlineCustomerRouter = Router();
onlineCustomerRouter.route("/signup").post(onlineSignup);
onlineCustomerRouter.route("/signin").post(onlineSignin);
// Route to get the customer profile (with token authentication)
onlineCustomerRouter.route('/profile/:id').get( authenticateToken, validateObjectId, onlineCustomerProfile);
onlineCustomerRouter.route("/upload/:id").post(authenticateToken,upload.array("upload",5),uploadFile);
onlineCustomerRouter.route("/logout").post(onlineLogout);
onlineCustomerRouter.route("/shop/:shopId/customers").get(authenticateToken, validateObjectId, getCustomersByShop);
onlineCustomerRouter.route("/updateOnlineCustomer").put(authenticateToken,updateOnlineCustomer);
onlineCustomerRouter.route("/getAllOnlineCustomers").get(authenticateToken,getAllOnlineCustomers);
onlineCustomerRouter.route("/deleteCustomer/:id").delete(authenticateToken,validateObjectId,deleteCustomer);
onlineCustomerRouter.route("/changeOnlineCustomerPassword/:id").put(authenticateToken,validateObjectId,changeOnlineCustomerPassword);
onlineCustomerRouter.route("/getOnlineCustomerOrders").get(authenticateToken,validateObjectId,getOnlineCustomerOrders);
onlineCustomerRouter.route("/getOnlineCustomerProfile").get(authenticateToken,getOnlineCustomerProfile);
onlineCustomerRouter.route("/forgot-password").post(authenticateToken,validateObjectId,requestPasswordReset);
onlineCustomerRouter.route("/reset-password/:token").post(authenticateToken,validateObjectId,resetPassword);










export default onlineCustomerRouter;