import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", TagSchema);
export default Tag;