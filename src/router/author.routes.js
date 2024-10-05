import express from "express";
import { currentAuthor, getAllAuthors, loginAuthor, registerAuthor } from "../controllers/author.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const AuthorRouter = express.Router();

AuthorRouter.post("/sign-up", registerAuthor);
AuthorRouter.post("/get-user", getAllAuthors);
AuthorRouter.post("/sign-in", loginAuthor);
AuthorRouter.get("/current-user", authMiddleware, currentAuthor);
AuthorRouter.get("/admin/:email", authMiddleware, verifyAdmin);
AuthorRouter.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});






export default AuthorRouter;
