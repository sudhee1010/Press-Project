import { Router } from "express";
import { createPrintingUnit, getAllUnits,getUnitById,updateUnit,deleteUnit} from "../controller/printingPressunitcontroller.js";
import authorizeRoles from "../middleware/authMiddleware.js";

const printingUnitRouter = Router();
printingUnitRouter.route("/createPrintingUnit").post(authorizeRoles("admin","superadmin"),createPrintingUnit);
printingUnitRouter.route("/getallunits").get(authorizeRoles("superadmin"),getAllUnits);
printingUnitRouter.route("/getunitbyid/:id").get(authorizeRoles("superadmin"),getUnitById);
printingUnitRouter.route("/updateunit/:id").put(authorizeRoles("admin","superadmin"),updateUnit);
printingUnitRouter.route("/deleteunit/:id").delete(authorizeRoles("superadmin"),deleteUnit);



export default printingUnitRouter;
