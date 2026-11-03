import dns from "dns";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Force Node.js to use public DNS resolvers for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "PennyPilot server is flying ✈️" });
});

const PORT = process.env.PORT || 5000;

// Connect to database and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });