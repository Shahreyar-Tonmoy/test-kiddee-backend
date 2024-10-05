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

import connectDB from "./db/index.js";
import { app, startServer } from "./app.js";
import ItemRouter from "./router/item.routes.js";
import CategoryRouter from "./router/category.routes.js";
import AuthorRouter from "./router/author.routes.js";
import SearchRouter from "./router/search.routes.js";
import OrderRouter from "./router/order.routes.js"; // Ensure the import path is correct
import { Server } from "socket.io";


const PORT = process.env.PORT || 8000;

const tryStartServer = (port) => {
  const { server, io } = startServer(PORT);

  server.on("listening", () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use. Trying a different port...`);
      tryStartServer(port + 1); // Try the next port
    } else {
      console.error("Error starting the server:", err);
      process.exit(1);
    }
  });

  return io; // Return the io instance
};



connectDB()
  .then(() => {
    // Start the server and get the io instance
    const io = tryStartServer(PORT);

    // Add your routers, passing the io instance to OrderRouter
    app.use("/api", ItemRouter);
    app.use("/api", CategoryRouter);
    app.use("/api", AuthorRouter);
    app.use("/api", SearchRouter);
    app.use("/api", OrderRouter(io)); 

    // Root route
    app.get("/", (req, res) => {
      res.send(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to start the server:", err);
  });
