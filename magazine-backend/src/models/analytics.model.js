import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true,
    },
    viewerType: {
      type: String,
      enum: ["User", "Guest"],
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    ipAddress: {
      type: String,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

AnalyticsSchema.index(
  { blog: 1, user: 1 },
  { unique: true, partialFilterExpression: { viewerType: "User" } }
);

AnalyticsSchema.index(
  { blog: 1, ipAddress: 1 },
  { unique: true, partialFilterExpression: { viewerType: "Guest" } }
);

const Analytics = mongoose.model("Analytics", AnalyticsSchema);
export default Analytics;