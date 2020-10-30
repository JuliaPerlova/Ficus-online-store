import * as mongoose from 'mongoose';

export const ReplySchema = new mongoose.Schema(
    {
        author: { type: mongoose.Types.ObjectId, required: true },
        text: { type: String, required: true },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
    },
    { timestamps: true },
);
