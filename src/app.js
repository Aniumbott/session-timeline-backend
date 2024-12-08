import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded data
app.use(
  // Logger
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Routes
app.use("/api/v1", sessionRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Global Error Handler
app.use(errorHandler);

export default app;
