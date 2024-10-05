// import connectDB from "./db/index.js";

// import { app } from "./app.js";
// import ItemRouter from "./router/item.routes.js";
// import CategoryRouter from "./router/category.routes.js";
// import AuthorRouter from "./router/author.routes.js";
// import SearchRouter from "./router/search.routes.js";
// import OrderRouter from "./router/order.routes.js";

// const startServer = (port) => {
//   return app.listen(port);
// };

// const tryStartServer = (port) => {
//   const server = startServer(port);
//   server.on("listening", () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });

//   server.on("error", (err) => {
//     if (err.code === "EADDRINUSE") {
//       console.log(`Port ${port} is already in use. Trying a different port...`);
//       tryStartServer(port + 1); // Try the next port
//     } else {
//       console.error("Error starting the server:", err);
//       process.exit(1);
//     }
//   });
// };

// const PORT = process.env.PORT || 8000;

// connectDB()
//   .then(() => {
//     app.use("/api", ItemRouter);
//     app.use("/api", CategoryRouter);
//     app.use("/api", AuthorRouter);
//     app.use("/api", SearchRouter);
//     app.use("/api", OrderRouter);

//     // end router call
//     app.get("/", (req, res) => {
//       res.send(`Server is running at http://localhost:${PORT}`);
//     });

//     tryStartServer(PORT);
//   })
//   .catch((err) => {
//     console.log("Failed to start the server:", err);
//   });
















import dotenv from "dotenv";
import connectDB from "./db/index.js";  // Assuming this is your MongoDB connection function
import { app, server, io } from "./app.js";  // Import the app, server, and Socket.io from your app.js
import ItemRouter from "./router/item.routes.js";
import CategoryRouter from "./router/category.routes.js";
import AuthorRouter from "./router/author.routes.js";
import SearchRouter from "./router/search.routes.js";
import OrderRouter from "./router/order.routes.js";

// Load environment variables
dotenv.config();

// Function to start the server on a specific port
const startServer = (port) => {
  return server.listen(port);  // Start HTTP server (which is integrated with Socket.io)
};

// Function to handle retrying on port conflict
const tryStartServer = (port) => {
  const activeServer = startServer(port);

  activeServer.on("listening", () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  activeServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use. Trying the next port...`);
      tryStartServer(port + 1);  // Retry with the next port
    } else {
      console.error("Error starting the server:", err);
      process.exit(1);  // Exit on critical error
    }
  });
};

// Define the port from environment variables or use a default port
const PORT = process.env.PORT || 8000;

// Connect to the database and start the server
connectDB()
  .then(() => {
    // Register API routes
    app.use("/api", ItemRouter);  // RESTful routing for items
    app.use("/api", CategoryRouter);
    app.use("/api", AuthorRouter);
    app.use("/api", SearchRouter);
    app.use("/api", OrderRouter);

    // Default route for checking if the server is running
    app.get("/", (req, res) => {
      res.send(`Server is running at http://localhost:${PORT}`);
    });

    // Start the server and handle any port conflicts
    tryStartServer(PORT);
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);  // Exit the process if the DB connection fails
  });
