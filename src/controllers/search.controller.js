import mongoose from 'mongoose';
import { Item } from '../models/item.model.js';


// Search controller using text input (from query parameters)
const searchItems = async (req, res) => {
  try {
    const { searchText } = req.query; // Extract search text from query parameters

    // Build aggregation pipeline
    const pipeline = [];

    // If searchText is provided, match it against both name and category fields
    if (searchText) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: searchText, $options: 'i' } }, // Case-insensitive search in name
            {
              category: mongoose.Types.ObjectId.isValid(searchText)
                ? mongoose.Types.ObjectId(searchText)
                : null, // Match if the text is a valid ObjectId for category
            },
          ],
        },
      });
    }

    // Lookup to join category details
    pipeline.push({
      $lookup: {
        from: 'categories', // The collection name of categories
        localField: 'category', // Field from the Item model
        foreignField: '_id', // Field from the Category model
        as: 'categoryDetails', // Output field with category details
      },
    });

    // Project the specific fields to return
    pipeline.push({
      $project: {
        name: 1,
        images: 1,
        description: 1,
        price: 1,
        discount: 1,
        discount_price: 1,
        available: 1,
        categoryDetails: { $arrayElemAt: ['$categoryDetails', 0] }, // Unwind category details
      },
    });

    // Execute the aggregation pipeline
    const items = await Item.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while searching for items',
      error: error.message,
    });
  }
};

export { searchItems };
