import mongoose, { Document, Schema } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

// Define the User interface
export interface IUser extends Document {
  id: string;
  email: string;
  name: string;
  image?: string;
  phone?: string;
  profession?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    profession: {
      type: String,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Check if the model exists before creating it to avoid overwriting
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// Helper function to find or create a user
export async function findOrCreateUser(userData: {
  id: string;
  email: string;
  name: string;
  image?: string;
}): Promise<IUser> {
  try {
    console.log("Connecting to database for findOrCreateUser...");
    await connectToDatabase();
    console.log("Connected to database. Finding user with ID:", userData.id);

    // Try to find the user
    let user = await User.findOne({ id: userData.id });
    console.log("Find user result:", user ? "User found" : "User not found");

    // If user doesn't exist, create a new one
    if (!user) {
      console.log(
        "Creating new user with data:",
        JSON.stringify({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          image: userData.image ? "present" : "not present",
        })
      );

      user = await User.create({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        image: userData.image,
        onboardingCompleted: false,
      });

      console.log("User created successfully. User ID:", user.id);
    }

    return user;
  } catch (error) {
    console.error("Error in findOrCreateUser:", error);
    // Retry with direct connection
    console.log("Retrying with direct connection...");
    try {
      // Ensure mongoose is connected
      if (mongoose.connection.readyState !== 1) {
        const MONGODB_URI =
          process.env.MONGODB_URI || "mongodb://localhost:27017/kohinoor";
        console.log("Connecting directly to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Direct connection successful");
      }

      // Try again to find the user
      let user = await User.findOne({ id: userData.id });

      // If user doesn't exist, create a new one
      if (!user) {
        user = await User.create({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          image: userData.image,
          onboardingCompleted: false,
        });
        console.log("User created on retry. User ID:", user.id);
      }

      return user;
    } catch (retryError) {
      console.error("Retry failed:", retryError);
      throw new Error(
        `Failed to create user: ${
          retryError instanceof Error ? retryError.message : String(retryError)
        }`
      );
    }
  }
}

// Helper function to get a user by ID
export async function getUserById(id: string): Promise<IUser | null> {
  try {
    console.log("Getting user by ID:", id);
    await connectToDatabase();
    const user = await User.findOne({ id });
    console.log("getUserById result:", user ? "User found" : "User not found");
    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    return null;
  }
}

// Helper function to update a user
export async function updateUser(
  id: string,
  userData: Partial<IUser>
): Promise<IUser | null> {
  try {
    console.log("Updating user with ID:", id);
    console.log("Update data:", JSON.stringify(userData));
    await connectToDatabase();

    // First check if user exists
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      console.error("Cannot update non-existent user:", id);
      return null;
    }

    const updatedUser = await User.findOneAndUpdate(
      { id },
      { $set: userData },
      { new: true }
    );

    console.log(
      "Update result:",
      updatedUser ? "User updated" : "Update failed"
    );
    return updatedUser;
  } catch (error) {
    console.error("Error in updateUser:", error);
    return null;
  }
}
