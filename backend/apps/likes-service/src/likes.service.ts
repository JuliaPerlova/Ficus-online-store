import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ILike } from './interfaces/like.interface';

@Injectable()
export class LikesService {
  constructor(@Inject('LIKE_MODEL') private likeModel: Model<ILike>,) {}

  async getLikes(contentId: string): Promise<ILike[]> {
    return await this.likeModel.find({ contentId }).exec();
  }

  async addLike(author: string, contentId: string, onContent: string): Promise<ILike[]> {
    const like = await this.likeModel.findOne({ contentId, author });
    if (!like) {
      const model = new this.likeModel({ author, contentId, onContent })
      await model.save();
    }
    
    return await this.likeModel.find({contentId}).exec();
  }

  async dislike(author: string, contentId: string): Promise<ILike[]> {
    await this.likeModel.deleteOne({ author, contentId });
    return await this.likeModel.find({ contentId }).exec();
  }
}
