
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, telephones } = req.body;

  if (!name || !email || !password || !telephones) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    telephones,
  });

  try {
    const savedUser = await user.save();

    const { password, ...userWithoutPassword } = savedUser._doc;
    const { _id, created_at, modified_at } = userWithoutPassword
    res.status(200).json({
      id: _id,
      created_at: created_at,
      modified_at: modified_at
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {

    res.status(400).json({ message: err.message });
  }
});

router.get("/user", async (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    const user = await User.findById(id);

    res.status(200).json({
      email: user.email,
      id: user._id,
      telephones: user.telephones,
      created_at: user.created_at,
      modified_at: user.modified_at,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Exporta o roteador para ser usado em outro lugar
export default router;
