import express from 'express';
import { createItem, getAllFoodWithCategories, getAllItems, getAllItemsRandomly, getItemById } from '../controllers/item.controller.js';

const ItemRouter = express.Router();



ItemRouter.get('/get-categories',getAllFoodWithCategories);
ItemRouter.post('/add-items',createItem);
ItemRouter.get('/items-randomly/:id',getAllItemsRandomly);
ItemRouter.get('/get-all-item',getAllItems);
ItemRouter.get('/get-item/:id',getItemById);

export default ItemRouter;
