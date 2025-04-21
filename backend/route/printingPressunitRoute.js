import { Router } from "express";
import { createPrintingUnit, getAllUnits } from "../controller/printingPressunitcontroller.js";

const printingUnitRouter = Router();
printingUnitRouter.route("/createPrintingUnit").post(createPrintingUnit);
printingUnitRouter.route("/getallunits").get(getAllUnits);

export default printingUnitRouter;
