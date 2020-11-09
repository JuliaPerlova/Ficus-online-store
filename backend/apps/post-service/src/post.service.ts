import { Injectable, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/post.dto';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_MODEL') private readonly postModel: Model<IPost>,
    ) {}

    private populate(model) {
        return model
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async create(uId: string, createPostDto: CreatePostDto): Promise<IPost> {
        const newPost = new this.postModel({ author: uId, ...createPostDto });
        return (await newPost.save())
            .populate('author', 'login avatar avatarId')
            .execPopulate()
            .catch(err => {
                console.log(err);
                return err;
            });
    }

    async getAll(page: number, limit: number) {
        const amount = (await this.postModel.find()).length;
        const posts = await this.populate(
            this.postModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit),
        );
        return { amount, posts };
    }

    async like(postId: string, uId: string): Promise<IPost> {
        return await this.populate(
            this.postModel.findByIdAndUpdate(
                postId,
                { $addToSet: { likes: uId } },
                { new: true },
            ),
        );
    }

    async dislike(postId: string, uId: string): Promise<IPost> {
        return await this.populate(
            this.postModel.findByIdAndUpdate(
                postId,
                { $pull: { likes: uId } },
                { new: true },
            ),
        );
    }

    async getPostById(postId: string): Promise<IPost> {
        return await this.populate(this.postModel.findById(postId));
    }

    async getUserPosts(uId: string): Promise<IPost[]> {
        return await this.populate(this.postModel.find({ author: uId }));
    }

    async updatePost(uId: string, newData: CreatePostDto): Promise<IPost> {
        return await this.populate(
            this.postModel.findByIdAndUpdate(uId, newData, { new: true }),
        );
    }

    async deletePost(postId: string): Promise<IPost> {
        return await this.postModel.findByIdAndDelete(postId);
    }
}
