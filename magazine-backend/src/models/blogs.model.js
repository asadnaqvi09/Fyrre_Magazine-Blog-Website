import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    blogSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    blogContent: {
      type: String,
      required: true
    },
    blogExcerpt: {
      type: String,
      maxlength: 300
    },
    blogCoverImage: {
      url: String,
      public_id: String
    },
    blogCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true
    },
    blogTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    blogAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    blogStatus: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true
    },
    blogReadTime: {
      type: Number
    },
    blogViews: {
      type: Number,
      default: 0
    },
    blogLikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    }],
    publishedAt: {
      type: Date
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;