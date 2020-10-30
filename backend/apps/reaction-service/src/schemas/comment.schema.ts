import * as mongoose from 'mongoose';
import { postModel } from 'apps/post-service/src/models/post.model';
import { userModel } from 'apps/user-service/src/models/user.model';

import { ReplySchema } from './reply.schema';

export const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: postModel,
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: userModel,
        },
        text: { type: String, required: true },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
        replies: { type: [ReplySchema], default: [] },
    },
    { timestamps: true },
);
