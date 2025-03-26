import mongoose from "mongoose";

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/kohinoor";

// Global variable to track connection status
let isConnected = false;

// Connect to MongoDB
export async function connectToDatabase() {
  if (isConnected) {
    console.log("[MongoDB] Already connected, reusing connection");
    return;
  }

  try {
    // Set strict query mode for Mongoose to prevent unknown field queries
    mongoose.set("strictQuery", true);

    // Setup MongoDB connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log("[MongoDB] Connecting to MongoDB...");
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, options);

    isConnected = true;
    console.log("[MongoDB] Connected successfully");
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    // Try again with a delay if this was a network issue
    if (
      error instanceof Error &&
      (error.message.includes("ECONNREFUSED") ||
        error.message.includes("getaddrinfo") ||
        error.message.includes("connect ETIMEDOUT"))
    ) {
      console.log(
        "[MongoDB] Network error detected, trying again in 3 seconds..."
      );
      setTimeout(async () => {
        try {
          console.log("[MongoDB] Retrying connection...");
          await mongoose.connect(MONGODB_URI);
          isConnected = true;
          console.log("[MongoDB] Connected successfully on retry");
        } catch (retryError) {
          console.error(
            "[MongoDB] Retry failed:",
            retryError instanceof Error
              ? retryError.message
              : String(retryError)
          );
        }
      }, 3000);
    }
    throw error;
  }
}

// Close MongoDB connection (useful for testing)
export async function disconnectFromDatabase() {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("[MongoDB] Disconnected from MongoDB");
  } catch (error) {
    console.error("[MongoDB] Disconnection error:", error);
    throw error;
  }
}
