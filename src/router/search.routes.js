import express from 'express';
import { searchItems } from '../controllers/search.controller.js';

const SearchRouter = express.Router();

// Define the route for searching items
SearchRouter.get('/search-items', searchItems);

export default SearchRouter;
