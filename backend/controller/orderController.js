import { Order } from '../model/OrderSchema.js';

// Create a new Order
const CreateOrder = async (req, res) => {
    try {
        const shopId=req.user?.shopId;
        const onlineCustomerid=req.body;
        if (!shopId) {
            return res.status(400).json({ message: "No shopId found in token" });
          }
        

        const order = await Order.create({
          ...req.body,
          shopId: shopId,  
          onlineCustomerid:onlineCustomerid||null
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const { shopId } = req.query; 

        if (!shopId) {
          return res.status(400).json({ message: 'shopId is required' });
        }
        const orders = await Order.find({shopId: shopId})
            .populate('onlineCustomer createdBy assignedDesigner printingUnit');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Order
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('onlineCustomer createdBy assignedDesigner printingUnit');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Order (Designer / Printing / Production / Admin updates)
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Order (Admin only)
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { CreateOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
