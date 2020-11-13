import * as mongoose from 'mongoose';
import { postModel } from 'apps/post-service/src/models/post.model';
import { userModel } from 'apps/user-service/src/models/user.model';

export const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: postModel,
        },
        commentId: {
            type: mongoose.Types.ObjectId,
            ref: 'Comment',
            default: null
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: userModel,
        },
        text: { type: String, required: true }
    },
    { timestamps: true },
);
