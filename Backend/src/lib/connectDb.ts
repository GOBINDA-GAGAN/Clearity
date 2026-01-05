import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables.");
  process.exit(1);
}

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("=".repeat(30));
    
    console.log("📦 MongoDB Connected Successfully!");
    console.log(`📡 Host: ${mongoose.connection.host}`);
    console.log("=".repeat(30));
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// 🔌 Graceful DB Disconnect
export const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB Disconnected!");
  } catch (error) {
    console.error("❌ Error during MongoDB disconnection:", error);
  }
};

// 🔄 Events
mongoose.connection.on("connected", () => {
  console.log("📶 MongoDB Connection Established");
});

mongoose.connection.on("error", (err) => {
  console.error("⚠️ MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 MongoDB Disconnected");
});
