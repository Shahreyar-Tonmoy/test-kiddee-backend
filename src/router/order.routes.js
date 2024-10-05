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
} from "../controllers/order.controller.js";

const OrderRouter = (io) => {
  const router = express.Router();

  // Define your routes
  router.post("/order", (req, res) => createOrder(req, res, io));
  router.get("/pending-orders", getPendingOrders);
  router.get("/confirm-orders", getConfirmOrders);
  router.get("/delivered-orders", getDeliveredOrders);
  router.get("/order/:id", getOrderById);
  router.put("/order/:id", (req, res) => updateOrder(req, res, io));
  router.delete("/order/:id", (req, res) => deleteOrder(req, res, io));

  return router; // Return the router instance
};

export default OrderRouter;
