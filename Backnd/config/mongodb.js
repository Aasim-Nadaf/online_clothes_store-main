import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";

  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  // Try to connect to the configured MongoDB URI first
  if (uri) {
    try {
      await mongoose.connect(uri, {
        dbName: "online_clothes_store",
        serverSelectionTimeoutMS: 5000,
      });
      return;
    } catch (error) {
      console.warn("Could not connect to external MongoDB:", error.message);
      console.log("Falling back to in-memory MongoDB server...");
    }
  }

  // Fallback: use mongodb-memory-server for local development
  try {
    mongoMemoryServer = await MongoMemoryServer.create();
    const memUri = mongoMemoryServer.getUri();
    console.log("In-memory MongoDB URI:", memUri);
    await mongoose.connect(memUri, {
      dbName: "online_clothes_store",
    });
  } catch (error) {
    console.error("Failed to start in-memory MongoDB:", error.message);
    console.warn("Continuing to run the server without a successful DB connection.");
  }
};

export default connectDB;