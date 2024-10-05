// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();

// import dotenv from "dotenv";

// dotenv.config();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

// app.use(
//   express.json({
//     limit: "16kb",
//   })
// );
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// export { app };





import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Import the http module
import { Server } from "socket.io"; // Import Server from socket.io
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Create the HTTP server from the Express app
const startServer = (port) => {
  const server = http.createServer(app); // Create an HTTP server from the Express app

  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN, 
   
    },
  
  })

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle socket events
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // Return both the server and io instance
  return { server: server.listen(port), io }; // Return server and io
};

export { app, startServer };


