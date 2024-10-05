import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
import { Author } from "../models/author.models.js";

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const registerAuthor = async (req, res) => {
  const { full_name, email, password, phone_no } = req.body;

  try {
    // Check if the email is already registered
    const existingAuthor = await Author.findOne({ email });
    if (existingAuthor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Validate phone number
    if (!validator.isMobilePhone(phone_no, 'any')) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new author instance with hashed password
    const newAuthor = new Author({
      full_name,
      email,
      password: hashedPassword,
      phone_no,
    });

    // Save the author to the database
    const author = await newAuthor.save();

    // Create a token
    const token = createToken(author._id);

    // Return success response with token
    return res.status(201).json({ message: "Author registered successfully", token });
  } catch (error) {
    console.error("Error registering author:", error);
    return res.status(500).json({ message: "Error registering author", error: error.message });
  }
};

const loginAuthor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the author exists
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, author.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create a token
    const token = createToken(author._id);

    // Return success response with token
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const currentAuthor = async (req, res) => {
  try {
    // Find the current author and populate the 'cart_items' array with details
    const author = await Author.findById(req.user._id)

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Return the author object with populated 'cart_items'
    res.json({ author });
  } catch (error) {
    console.error("Error fetching current author:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    res.status(200).json({ authors });
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "Error fetching authors", error: error.message });
  }
};

export { registerAuthor, getAllAuthors, loginAuthor, currentAuthor };
