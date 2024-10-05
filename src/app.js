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
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure your frontend URL is set in .env
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

// Create HTTP server and attach Socket.io to it
const server = http.createServer(app);

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "https://kiddeebd.com", // Replace with your actual frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling']
});


// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle any custom events if needed
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Export the app and server for starting the server
export { app, server, io };
