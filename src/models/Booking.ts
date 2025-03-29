import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  spaceId: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
bookingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export interface IBooking {
  userId: string;
  spaceId: string;
  startTime: Date;
  endTime: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
