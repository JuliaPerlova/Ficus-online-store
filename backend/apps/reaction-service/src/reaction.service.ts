import { Inject, Injectable } from '@nestjs/common';
import { ILike } from 'apps/likes-service/src/interfaces/like.interface';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment } from './interfaces/comment.interface';
import { IReply } from './interfaces/reply.interface';

@Injectable()
export class ReactionService {
    constructor(
        @Inject('COMMENT_MODEL') private commentModel: Model<IComment>,
        @Inject('REPLY_MODEL') private replyModel: Model<IReply>,
        @Inject('LIKE_MODEL') private likeModel: Model<ILike>,
    ) {}

    private populate(model) {
        return model
            .populate('author', 'login avatar avatarId')
            .populate('replies')
            .populate({
                path: 'replies',
                populate: { path: 'author', select: 'login avatar avatarId' },
            })
            .exec();
    }

    async createComment(createCommentDto: CreateCommentDto): Promise<IComment> {
        return (await new this.commentModel(createCommentDto).save())
            .populate('author', 'login avatar avatarId')
            .execPopulate();
    }

    async getComments(postId: string): Promise<IComment[]> {
        let comments = await this.populate(this.commentModel.find({ postId }));
        comments = await Promise.all(
            comments.map(async comment => {
                const commentLikes = await this.likeModel.find({
                    contentId: comment._id,
                });
                let replies = comment.replies;
                replies = await Promise.all(
                    replies.map(async reply => {
                        const replyLikes = await this.likeModel.find({
                            contentId: reply._id,
                        });
                        return { ...reply._doc, likes: replyLikes };
                    }),
                );
                return { ...comment._doc, likes: commentLikes, replies };
            }),
        );
        return comments;
    }

    async getCommentById(commentId: string): Promise<IComment> {
        return await this.populate(this.commentModel.findById(commentId));
    }

    async addReply(commentId: string, createReplyDto): Promise<IReply> {
        const reply = await new this.replyModel(createReplyDto).save();
        console.log(reply);
        return await this.populate(
            this.commentModel.findByIdAndUpdate(
                commentId,
                { $push: { replies: reply._id } },
                { new: true },
            ),
        );
    }

    async updateReply(
        commentId: string,
        replyId: string,
        newData,
    ): Promise<IReply> {
        await this.replyModel.findByIdAndUpdate(replyId, newData, {
            new: true,
        });
        return await this.populate(this.commentModel.findById(commentId));
    }

    async deleteReply(commentId: string, replyId: string): Promise<IReply> {
        const reply = await this.replyModel.findByIdAndDelete(replyId);
        return await this.populate(
            this.commentModel.findByIdAndUpdate(
                commentId,
                { $pull: { replies: reply._id } },
                { new: true },
            ),
        );
    }

    async updateComment(commentId: string, newData): Promise<IComment> {
        return await this.populate(
            this.commentModel.findByIdAndUpdate(commentId, newData, {
                new: true,
            }),
        );
    }

    async deleteComment(commentId: string): Promise<IComment> {
        return await this.commentModel.findByIdAndDelete(commentId);
    }
}
