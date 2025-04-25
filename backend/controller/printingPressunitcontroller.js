
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
    }
};

//  Get a Single Printing Unit by ID
const getUnitById = async (req, res) => {
    try {
        const unit = await printingPressunit.findById(req.params.id);
        if (!unit) return res.status(404).json({ message: 'Printing unit not found' });
        res.status(200).json({ data: unit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Update a Printing Unit
const updateUnit = async (req, res) => {
    try {
        const updated = await printingPressunit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Printing unit not found' });
        res.status(200).json({ data: updated, message: 'Unit updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Delete a Printing Unit
const deleteUnit = async (req, res) => {
    try {
        const deleted = await printingPressunit.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Printing unit not found' });
        res.status(200).json({ message: 'Unit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






export { createPrintingUnit, getAllUnits, getUnitById ,updateUnit,deleteUnit};