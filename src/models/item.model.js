import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true, // Each image URL is required
      },
    ],
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Boolean,
      default: false,
    },
    discount_price: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

// Define the category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    available: {
      type: Boolean,
      default: true,
    },

    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export { Category, Item };
