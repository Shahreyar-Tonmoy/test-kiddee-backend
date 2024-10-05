// import express from "express";
// import {
//   createOrder,
//   deleteOrder,
//   getPendingOrders,
//   getOrderById,
//   updateOrder,
//   getConfirmOrders,
//   getDeliveredOrders,
// } from "../controllers/order.controller.js";

// const OrderRouter = express.Router();


// OrderRouter.post("/order", createOrder); // Create a new order
// OrderRouter.get("/pending-orders", getPendingOrders);
// OrderRouter.get("/confirm-orders", getConfirmOrders);
// OrderRouter.get("/delivered-orders", getDeliveredOrders);
// OrderRouter.get("/order/:id", getOrderById); // Get a single order by ID
// OrderRouter.put("/order/:id", updateOrder); // Update an order by ID
// OrderRouter.delete("/order/:id", deleteOrder); // Delete an order by ID

// export default OrderRouter;








import express from "express";
import {
  createOrder,
  deleteOrder,
  getPendingOrders,
  getOrderById,
  updateOrder,
  getConfirmOrders,
  getDeliveredOrders,
} from "../controllers/order.controller.js";  // Import the order controller functions

const OrderRouter = express.Router();  // Create a new router

// Define routes and map to controller functions

OrderRouter.post("/order", createOrder);  // Create a new order
OrderRouter.get("/pending-orders", getPendingOrders);  // Get all pending orders
OrderRouter.get("/confirm-orders", getConfirmOrders);  // Get all confirmed orders
OrderRouter.get("/delivered-orders", getDeliveredOrders);  // Get all delivered orders
OrderRouter.get("/order/:id", getOrderById);  // Get a single order by ID
OrderRouter.put("/order/:id", updateOrder);  // Update an order by ID
OrderRouter.delete("/order/:id", deleteOrder);  // Delete an order by ID

export default OrderRouter;  // Export the router
