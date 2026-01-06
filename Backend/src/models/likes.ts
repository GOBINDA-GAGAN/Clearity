import mongoose, { Schema, Types, Model } from "mongoose";
export interface ILike {
    blogId: Types.ObjectId,
    userId: Types.ObjectId,
    commentId: Types.ObjectId,
}

const LikeSchema = new Schema<ILike>(
    {
        blogId: {
            type: Schema.Types.ObjectId,
        },
        commentId: {
            type: Schema.Types.ObjectId
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }

    }
    ,
    { timestamps: true }
);

export const Like: Model<ILike> =
    mongoose.models.Like || mongoose.model<ILike>("Like", LikeSchema)