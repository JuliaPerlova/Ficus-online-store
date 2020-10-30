import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class ReactionService {
    constructor(
        @Inject('COMMENT_MODEL') private commentModel: Model<IComment>,
    ) {}

    async createComment(createCommentDto: CreateCommentDto): Promise<IComment> {
        return (await new this.commentModel(createCommentDto).save())
            .populate('author', 'login avatar avatarId')
            .execPopulate();
    }

    async getComments(postId: string): Promise<IComment[]> {
        return await this.commentModel
            .find({ postId })
            .populate('author', 'login avatar avatarId')
            .exec();
    }

    async getCommentById(commentId: string): Promise<IComment> {
        return await this.commentModel
            .findById(commentId)
            .populate('author', 'login avatar avatarId')
            .exec();
    }

    async like(commentId: string, uId: string): Promise<IComment> {
        return await this.commentModel
            .findByIdAndUpdate(
                commentId,
                { $push: { likes: uId } },
                { new: true },
            )
            .populate('author', 'login firstName lastName avatar avatarId')
            .populate('likes', 'login firstName lastName avatar avatarId')
            .exec();
    }

    async dislike(commentId: string, uId: string): Promise<IComment> {
        return await this.commentModel
            .findByIdAndUpdate(
                commentId,
                { $pull: { likes: uId } },
                { new: true },
            )
            .populate('author', 'login firstName lastName avatar avatarId')
            .populate('likes', 'login firstName lastName avatar avatarId')
            .exec();
    }

    async updateComment(commentId: string, newData): Promise<IComment> {
        return await this.commentModel
            .findByIdAndUpdate(commentId, newData, { new: true })
            .populate('author', 'username avatar avatarId')
            .exec();
    }

    async deleteComment(commentId: string): Promise<IComment> {
        return await this.commentModel.findByIdAndDelete(commentId);
    }
}
