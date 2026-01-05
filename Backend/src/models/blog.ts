import mongoose, { Schema, Types, Model } from "mongoose";
export interface IBlog {
  title: string;
  slug: string;
  content: string;

  banner: {
    publicId: string;
    url: string;
    width: number;
    height: number;
  };

  author: Types.ObjectId;

  viewsCount: number;
  likesCount: number;
  commentsCount: number;

  status: 'draft' | 'published';
}



const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },

    banner: {
      publicId: { type: String, required: true },
      url: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },

    author: { type:Schema.Types.ObjectId, ref: "User", required: true },

    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
