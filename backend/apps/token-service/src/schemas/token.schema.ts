import * as mongoose from 'mongoose';
import { addDays } from "date-fns";

const expireTokenDefault = () => addDays(Date.now(), 7);

export const TokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    expiredAt: { type: Date, default: expireTokenDefault },
});

TokenSchema.index({ token: 1, uId: 1 }, { unique: true });