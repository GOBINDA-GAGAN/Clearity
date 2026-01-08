import mongoose, { Schema, Types, Model } from "mongoose";
export interface IComment {

    blogId: Types.ObjectId,
    userId: Types.ObjectId,
    content: string
}

const CommentSchema = new Schema<IComment>(
    {
        blogId: {
            type: Schema.Types.ObjectId,
        },
        content: {
            type: String, required: [true, 'Content is required'],
            maxLength: [1000, 'Content must be lessthen 1000 character']
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

export const Comment: Model<IComment> =
    mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
