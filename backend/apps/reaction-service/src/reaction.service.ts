import { Inject, Injectable } from '@nestjs/common';
import { ILike } from 'apps/likes-service/src/interfaces/like.interface';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class ReactionService {
    constructor(
        @Inject('COMMENT_MODEL') private commentModel: Model<IComment>,
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

    private async getLikes(comments) {
        return await Promise.all(
            comments.map(async comment => {
                const likes = await this.likeModel.find({
                    contentId: comment._id,
                });
                return { ...comment._doc, likes }
            })
        )
    }

    async createComment(createCommentDto: CreateCommentDto): Promise<IComment> {
        return (await new this.commentModel(createCommentDto).save())
            .populate('author', 'login avatar avatarId')
            .execPopulate();
    }

    async getComments(postId: string): Promise<IComment[]> {
        let comments = await this.populate(this.commentModel.find({ postId, commentId: null }));
        comments = await this.getLikes(comments);

        comments = await Promise.all(comments.map(async (comment) => {
            let replies = await this.populate(this.commentModel.find({ postId, commentId: comment._id }));
            replies = await this.getLikes(replies);
            return { comment, replies };
        }));

        return comments;
    }

    async getCommentById(commentId: string): Promise<IComment> {
        return await this.populate(this.commentModel.findById(commentId));
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
