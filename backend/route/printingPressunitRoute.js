import { Router } from "express";
import { createPrintingUnit, getAllUnits,getUnitById,deleteUnit,signin, verifyPrintingUnit,adminLogout,adminupdateUnit} from "../controller/printingPressunitcontroller.js";
import authorizeRoles from "../middleware/authMiddleware.js";
import authenticateToken from "../middleware/authenticateToken.js";


const printingUnitRouter = Router();
printingUnitRouter.route("/createPrintingUnit").post(createPrintingUnit);
printingUnitRouter.route("/getallunits").get(getAllUnits);
printingUnitRouter.route("/getunitbyid/:id").get(authenticateToken,authorizeRoles("superadmin"),getUnitById);
// printingUnitRouter.route("/updateunit/:id").put(updateUnit);
printingUnitRouter.route("/deleteunit/:id").delete(authenticateToken,authorizeRoles("superadmin"),deleteUnit);
printingUnitRouter.route("/signin").post(signin);
// printingUnitRouter.route('/:id/verify').put(authenticateToken, authorizeRoles('superadmin'), verifyPrintingUnit);
printingUnitRouter.route('/adminlogout').post(authenticateToken, authorizeRoles('admin'),adminLogout);
printingUnitRouter.route("/adminupdateunit").put(adminupdateUnit);


export default printingUnitRouter;
