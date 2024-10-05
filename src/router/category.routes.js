import express from "express";
import { createCategory } from "../controllers/category.controller.js";

const CategoryRouter = express.Router();

// Route to create a new category
CategoryRouter.post("/category", createCategory);

export default CategoryRouter;
