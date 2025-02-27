import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let db;
const startServer = async () => {
  try {
    db = await connectDB();
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

startServer();

app.get("/api/products", async (req, res) => {
    if (!db) return res.status(500).json({ error: "Database not initialized" });
  
    try {
      const products = await db.collection("product_list").find({}).toArray(); // Use 'product_list' instead of 'products'
      console.log("Fetched products from DB:", products); // Debugging log
      res.json(products);
    } catch (error) {
      console.error("Failed to fetch data", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });
  
