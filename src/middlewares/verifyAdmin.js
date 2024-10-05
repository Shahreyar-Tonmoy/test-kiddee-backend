import { Author } from "../models/author.models.js";


const verifyAdmin = async (req, res) => {
  const email = req.params.email;

  // Ensure the authMiddleware has set req.user
  if (!req.user) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  // Check if the email in the request params matches the decoded email from the token
  if (email !== req.user.email) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  // Find the author by email
  const author = await Author.findOne({ email: email });

  // Check if the author exists and if they are an admin
  const isAdmin = author?.role === "admin";

  // Return the isAdmin status
  res.send({ isAdmin });
};

export { verifyAdmin };
