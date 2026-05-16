import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online_clothes_store";

  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  try {
    await mongoose.connect(uri, {
      dbName: "online_clothes_store",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.warn("Continuing to run the server without a successful DB connection.");
  }
};

export default connectDB;