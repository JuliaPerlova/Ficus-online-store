import { model } from 'mongoose';
import { PostSchema } from '../schemas/post.schema';

export const postModel = model('Post', PostSchema);
