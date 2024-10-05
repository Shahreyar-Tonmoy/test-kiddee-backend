// import Order from "../models/order.model.js";

// // Create a new order
// const createOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     return res
//       .status(201)
//       .json({ message: "Order created successfully", order });
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Error creating order", error: error.message });
//   }
// };



// const getPendingOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({order:"pending"})
//     .populate({
//       path: "items",
//       populate: {
//         path: "itemId",
//       }
//     })


//     return res.status(200).json(orders);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error retrieving orders", error: error.message });
//   }
// };




// const getConfirmOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({order:"confirm"})
//     .populate({
//       path: "items",
//       populate: {
//         path: "itemId",
//       }
//     })


//     return res.status(200).json(orders);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error retrieving orders", error: error.message });
//   }
// };


// const getDeliveredOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({order:"delivered"})
//     .populate({
//       path: "items",
//       populate: {
//         path: "itemId",
//       }
//     })


//     return res.status(200).json(orders);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error retrieving orders", error: error.message });
//   }
// };





// // Get a single order by ID
// const getOrderById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     return res.status(200).json(order);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error retrieving order", error: error.message });
//   }
// };

// // Update an order by ID
// const updateOrder = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: `Order ${req.body.order} successfully`, updatedOrder });
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Error updating order", error: error.message });
//   }
// };

// // Delete an order by ID
// const deleteOrder = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(id);
//     if (!deletedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     return res.status(200).json({ message: "Order cancel successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error deleting order", error: error.message });
//   }
// };

// export { createOrder, getPendingOrders,getConfirmOrders,getDeliveredOrders, getOrderById, updateOrder, deleteOrder };




import Order from "../models/order.model.js";

// Create a new order and notify clients via Socket.IO
const createOrder = async (req, res, io) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Emit the "newOrder" event to all clients when an order is created
    io.emit("newOrder", order);

  

    return res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    return res.status(400).json({ message: "Error creating order", error: error.message });
  }
};

// Get pending orders (no change needed for Socket.IO here)
const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ order: "pending" }).populate({
      path: "items",
      populate: {
        path: "itemId",
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};

// Get confirmed orders
const getConfirmOrders = async (req, res) => {
  try {
    const orders = await Order.find({ order: "confirm" }).populate({
      path: "items",
      populate: {
        path: "itemId",
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};

// Get delivered orders
const getDeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.find({ order: "delivered" }).populate({
      path: "items",
      populate: {
        path: "itemId",
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving order", error: error.message });
  }
};

// Update an order by ID and notify clients
const updateOrder = async (req, res, io) => {
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Emit the "orderUpdated" event to all clients when an order is updated
    io.emit("orderUpdated", updatedOrder);

    return res.status(200).json({ message: `Order ${req.body.order} successfully`, updatedOrder });
  } catch (error) {
    return res.status(400).json({ message: "Error updating order", error: error.message });
  }
};

// Delete an order by ID and notify clients
const deleteOrder = async (req, res, io) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Emit the "orderDeleted" event to all clients when an order is deleted
    io.emit("orderDeleted", deletedOrder);

    return res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

export { createOrder, getPendingOrders, getConfirmOrders, getDeliveredOrders, getOrderById, updateOrder, deleteOrder };
