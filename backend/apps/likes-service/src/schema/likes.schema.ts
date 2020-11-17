import { contentEnum } from '../enum/content.enum';
import * as mongoose from 'mongoose';

export const LikeSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        contentId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'onContent',
        },
        onContent: {
            type: String,
            required: true,
            enum: Object.values(contentEnum),
        },
    },
    { timestamps: true },
);
