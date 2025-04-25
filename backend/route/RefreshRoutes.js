import express from "express";
import { refreshAccessToken, logoutUser } from "../controller/RefreshController.js";

const refreshRouter = express.Router();

refreshRouter.route("/refresh").post(refreshAccessToken);
refreshRouter.route("/logout").post(logoutUser);

export default refreshRouter;
