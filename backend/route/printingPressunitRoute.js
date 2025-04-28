import { Router } from "express";
import { createPrintingUnit, getAllUnits,getUnitById,updateUnit,deleteUnit,signin} from "../controller/printingPressunitcontroller.js";
import authorizeRoles from "../middleware/authMiddleware.js";
import authenticateToken from "../middleware/authenticateToken.js";


const printingUnitRouter = Router();
printingUnitRouter.route("/createPrintingUnit").post(createPrintingUnit);
printingUnitRouter.route("/getallunits").get(getAllUnits);
printingUnitRouter.route("/getunitbyid/:id").get(authenticateToken,authorizeRoles("superadmin"),getUnitById);
printingUnitRouter.route("/updateunit/:id").put(updateUnit);
printingUnitRouter.route("/deleteunit/:id").delete(authenticateToken,authorizeRoles("superadmin"),deleteUnit);
printingUnitRouter.route("/signin").post(authenticateToken,signin);


export default printingUnitRouter;
