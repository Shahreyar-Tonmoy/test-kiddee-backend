import mongoose from "mongoose";


const authorSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },

});

export const Author = mongoose.model("Author", authorSchema);


