import { userModel } from 'apps/user-service/src/models/user.model';
import * as mongoose from 'mongoose';

export const ReplySchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: userModel,
        },
        text: { type: String, required: true },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
    },
    { timestamps: true },
);
