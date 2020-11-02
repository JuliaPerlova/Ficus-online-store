import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment } from './interfaces/comment.interface';
import { IReply } from './interfaces/reply.interface';

@Injectable()
export class ReactionService {
    constructor(
        @Inject('COMMENT_MODEL') private commentModel: Model<IComment>,
        @Inject('REPLY_MODEL') private replyModel: Model<IReply>
    ) {}

    private populate (model) {
        return model
        .populate('author', 'login avatar avatarId')
        .populate('likes', 'login avatar avatarId')
        .populate('replies')
        .populate({path: 'replies', populate: {path: 'author', select: 'login avatar avatarId'}})
        .populate({path: 'replies', populate: {path: 'likes', select: 'login avatar avatarId'}})
        .exec()
    }

    async createComment(createCommentDto: CreateCommentDto): Promise<IComment> {
        return (await new this.commentModel(createCommentDto).save())
            .populate('author', 'login avatar avatarId')
            .execPopulate();
    }

    async getComments(postId: string): Promise<IComment[]> {
        return await this.populate(this.commentModel.find({ postId }));
    }

    async getCommentById(commentId: string): Promise<IComment> {
        return await this.populate(this.commentModel.findById(commentId));
    }

    async like(commentId: string, uId: string): Promise<IComment> {
        return await this.populate(this.commentModel.findByIdAndUpdate(commentId, { $push: { likes: uId } }, { new: true }));
    }

    async dislike(commentId: string, uId: string): Promise<IComment> {
        return await this.populate(this.commentModel
            .findByIdAndUpdate(
                commentId,
                { $pull: { likes: uId } },
                { new: true },
            ));
    }

    async addReply(commentId: string, createReplyDto): Promise<IReply> {
        const reply = await new this.replyModel(createReplyDto).save();
        console.log(reply);
        return await this.populate(this.commentModel.findByIdAndUpdate(
            commentId, 
            { $push: { replies: reply._id } }, 
            { new: true },
            ));
    }

    async updateReply(commentId: string, replyId: string, newData): Promise<IReply> {
        await this.replyModel.findByIdAndUpdate(replyId, newData, { new: true });
        return await this.populate(this.commentModel.findById(commentId));
    }

    async deleteReply(commentId: string, replyId: string): Promise<IReply> {
        const reply = await this.replyModel.findByIdAndDelete(replyId);
        return await this.populate(this.commentModel.findByIdAndUpdate(
            commentId,
            { $pull: { replies: reply._id } }, 
            { new: true },
            ));
    }

    async updateComment(commentId: string, newData): Promise<IComment> {
        return await this.populate(this.commentModel.findByIdAndUpdate(commentId, newData, { new: true }));
    }

    async deleteComment(commentId: string): Promise<IComment> {
        return await this.commentModel.findByIdAndDelete(commentId);
    }
}
