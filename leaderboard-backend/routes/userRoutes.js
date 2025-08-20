import express from "express";
import User from "../models/User.js";
import ClaimHistory from "../models/ClaimHistory.js";

const router = express.Router();

// Get all users (sorted leaderboard)
router.get("/", async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Add new user
router.post("/", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

// Claim points
router.post("/claim/:id", async (req, res) => {
  const { id } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.totalPoints += points;
  await user.save();

  const history = new ClaimHistory({ userId: id, pointsClaimed: points });
  await history.save();

  const leaderboard = await User.find().sort({ totalPoints: -1 });

  res.json({ awardedPoints: points, user, leaderboard });
});

export default router;
