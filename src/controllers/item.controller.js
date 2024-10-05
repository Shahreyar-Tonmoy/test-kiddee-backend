import { Category, Item } from "../models/item.model.js";

const getAllFoodWithCategories = async (req, res) => {
  try {
    // Find all Categories documents and populate the 'items' array within each category
    const categories = await Category.find().populate("items");

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, images, description, price, category } = req.body;

    // Validate input data
    if (!name || !images || !images.length || !price || !category) {
      return res.status(400).json({
        message:
          "Name, at least one image URL, price, and category are required",
      });
    }

    // Create a new item with multiple images
    const newItem = new Item({
      name,
      images, // Save the array of image URLs
      description,
      price,
      category,
    });

    // Save the item to the database
    const savedItem = await newItem.save();

    // Update the category to include this new item
    await Category.findByIdAndUpdate(category, {
      $push: { items: savedItem._id },
    });

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the item by its ID
    const item = await Item.findById(id).populate("category"); // Optionally populate the category

    // If item not found, send a 404 response
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send the found item as a response
    res.status(200).json(item);
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllItems = async (req, res) => {
  try {
    // Fetch all items and populate the category field if needed
    const items = await Item.find({ available: true }).populate("category");

    // Send the fetched items as a response
    res.status(200).json(items);
  } catch (error) {
    // Handle errors and send a 500 response
    res.status(500).json({ message: "Error fetching items", error });
  }
};




const getAllItemsRandomly = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the latest 10 available items and populate the category field
    const items = await Item.aggregate([
      { $match: { available: true } }, // Match only available items
      { $sort: { createdAt: -1 } }, // Sort by createdAt in descending order to get the latest items
      { $limit: 10 }, // Limit the results to the latest 10 items
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } } // Populate category field
    ]);

    // Filter out the item with the specified id
    const filteredItems = items.filter(item => item._id.toString() !== id); // Ensure id comparison is correct

    // Send the fetched items as a response
    res.status(200).json(filteredItems);
  } catch (error) {
    // Handle errors and send a 500 response
    res.status(500).json({ message: "Error fetching items", error });
  }
};







export { getAllFoodWithCategories, createItem, getAllItems, getItemById,getAllItemsRandomly };
