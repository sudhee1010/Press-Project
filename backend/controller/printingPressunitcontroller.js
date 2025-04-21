// import { printingPressunit } from '../model/printingPressunit';

// const PrintingUnit = require('../models/printingUnitSchema');

// // Create a new printing unit
// exports.createPrintingUnit = async (req, res) => {
//     try {
//         const unit = await PrintingUnit.create(req.body);
//         res.status(201).json(unit);
//     }
//     catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get all printing units 
// exports.getAllUnits = async (req, res) => {
//     try {
//         const units = await PrintingUnit.find();
//         res.status(200).json(units);
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message });
//     }

// }
// export {createPrintingUnit, getAllUnits};


import { printingPressunit } from "../model/printingPressunit.js";

// Create a new printing unit 
const createPrintingUnit = async (req, res) => {
    try {
        const unit = await printingPressunit.create(req.body);
        res.status(201).json({ data: unit, message: 'Printing unit created successfully' });
    } 
    catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
};

// Get all printing units 
const getAllUnits = async (req, res) => { 
    try { 
        const units = await printingPressunit.find();
         res.status(200).json({ data: units });
         }
          catch (err) { 
            res.status(500).json({ error: err.message });
         } };

export { createPrintingUnit, getAllUnits };