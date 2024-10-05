import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: {
      type: [itemSchema],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    orderNote: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    shippingMethod: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    order: {
      type: String,
      enum: ["pending", "confirm", "delivered", "returned"],
      default: "pending",
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // This will add createdAt and updatedAt fields
);

// Function to generate a random order ID
const generateOrderId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Available letters
  const randomLetters = Array.from({ length: 2 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join("");
  const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
  return `${randomLetters}${randomNumbers}`; // Combine letters and numbers
};

// Pre-save middleware to generate a unique orderId
orderSchema.pre("validate", async function (next) {
  if (!this.orderId) {
    let isDuplicate = true;
    while (isDuplicate) {
      this.orderId = generateOrderId(); // Generate a new order ID
      const existingOrder = await Order.findOne({ orderId: this.orderId });
      isDuplicate = !!existingOrder; // Check for uniqueness
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
