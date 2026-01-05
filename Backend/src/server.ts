import dotenv from "dotenv";
dotenv.config();
// import "@/types/express/index";

import cookieParser from "cookie-parser";
import helmet from "helmet";
import express, { Request, Response } from "express";
import compression from "compression";
import limiter from "@/lib/expressRateLimit";
import v1Routes from "@/routes/v1";
import authRoute from "@/routes/v1/auth"
import userRoute from "@/routes/v1/user"
import blogRoute from '@/routes/v1/blog'
import { connectDb, disconnectDb } from "@/lib/connectDb";

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------- MIDDLEWARES ----------------------
app.use(helmet());
app.use(cookieParser());
app.use(compression({ threshold: 1024 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);


// ---------------------- ROUTES ----------------------

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/blog", blogRoute)


// ---------------------- Root ROUTES ----------------------
app.use("/api/v1", v1Routes);

// ---------------------- SERVER START ----------------------
let server: any;

const startServer = async () => {
  try {
    await connectDb();
    server = app.listen(PORT, () => {
      console.log(`
=======================================
🚀 Server is running!
Port       : ${PORT}
Environment: ${process.env.NODE_ENV || "development"}
Timestamp  : ${new Date().toLocaleString()}
=======================================
      `);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};


// ---------------------- GRACEFUL SHUTDOWN ----------------------
const handleShutdown = async (signal: string) => {
  console.log(`\n⚠️ Received ${signal}. Shutting down server...`);
  await disconnectDb();

  if (server) {
    server.close(() => {
      console.log("✅ Server closed gracefully.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", () => handleShutdown("SIGINT")); // CTRL+C
process.on("SIGTERM", () => handleShutdown("SIGTERM")); // kill process

// Start server
startServer();
