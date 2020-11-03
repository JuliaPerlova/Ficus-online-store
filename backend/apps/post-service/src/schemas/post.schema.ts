import * as mongoose from 'mongoose';
import { userModel } from 'apps/user-service/src/models/user.model';

import { AttachmentSchema } from './attachment.schema';

export const PostSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: userModel,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                index: { unique: true, dropDups: true },
                default: [],
            },
        ],
        body: {
            text: {
                type: String,
                required: true,
            },
            preview: {
                type: String,
                default: null,
            },
            attachment: { type: [AttachmentSchema], default: null },
        },
    },
    { timestamps: true },
);
