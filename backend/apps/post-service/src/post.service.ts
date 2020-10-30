import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/post.dto';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_MODEL') private readonly postModel: Model<IPost>,
    ) {}

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

    async getAll(): Promise<IPost[]> {
        return await this.postModel
            .find()
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async like(postId: string, uId: string): Promise<IPost> {
        console.log(postId);
        console.log(uId);
        return await this.postModel
            .findByIdAndUpdate(postId, { $push: { likes: uId } }, { new: true })
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async dislike(postId: string, uId: string): Promise<IPost> {
        return await this.postModel
            .findByIdAndUpdate(postId, { $pull: { likes: uId } }, { new: true })
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async getPostById(postId: string): Promise<IPost> {
        return await this.postModel
            .findById(postId)
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async getUserPosts(uId: string): Promise<IPost[]> {
        return await this.postModel
            .find({ author: uId })
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async updatePost(uId: string, newData: CreatePostDto): Promise<IPost> {
        return await this.postModel
            .findByIdAndUpdate(uId, newData, { new: true })
            .populate('author', 'login avatar avatarId')
            .populate('likes', 'login avatar avatarId')
            .exec();
    }

    async deletePost(postId: string): Promise<IPost> {
        return await this.postModel.findByIdAndDelete(postId);
    }
}
