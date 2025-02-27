import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected");
    return client.db("Amazon"); // Replace with your actual database name
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
