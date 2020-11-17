import { model } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';

export const userModel = model('User', UserSchema);
