import { Category }  from "../models/item.model.js";


// Controller to create a new category
const createCategory = async (req, res) => {
  try {
    const { name, url, description } = req.body;

    // Create and save the new category directly in the Category collection
    const newCategory = new Category({ name, url, description });
    const savedCategory = await newCategory.save();

    // Return the saved category as the response
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export { createCategory };
