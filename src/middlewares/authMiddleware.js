import jwt from "jsonwebtoken";
import { Author } from "../models/author.models.js";


const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the author by the ID encoded in the token
    const author = await Author.findById(decoded.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Attach the author object to the request object for future middleware/routes
    req.user = author;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};

export { authMiddleware };
