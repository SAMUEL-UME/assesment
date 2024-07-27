import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    image: String,
    content: { type: "string", required: true},
    title: { type: "string", required: true, unique: true },
    category: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
