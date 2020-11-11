import { Injectable, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ILike } from 'apps/likes-service/src/interfaces/like.interface';
import { LikesService } from 'apps/likes-service/src/likes.service';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/post.dto';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_MODEL') private readonly postModel: Model<IPost>,
        @Inject('LIKE_MODEL') private readonly likeModel: Model<ILike>,
        //private readonly likesService: LikesService,
    ) {}

    private populate(model) {
        return model
            .populate('author', 'login avatar avatarId')
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
        let posts = await this.populate(
            this.postModel
                .find()
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit),
        );

        posts = await Promise.all(posts.map(async (post) => {
            const likes = await this.likeModel.find({contentId: post._id});
            console.log({ ...post._doc, likes })
            return { ...post._doc, likes };
        }));

        return { amount, posts };
    }

    async getPostById(postId: string): Promise<IPost> {
        const post = await this.populate(this.postModel.findById(postId));
        const likes = await this.likeModel.find({contentId: post._id})
        return { ...post._doc, likes };
    }

    async getUserPosts(uId: string): Promise<IPost[]> {
        const posts = await this.populate(this.postModel.find({ author: uId }));
        return await Promise.all(posts.map(async (post) => {
            const likes = await this.likeModel.find({contentId: post._id})
            console.log({ ...post._doc, likes })
            return { ...post._doc, likes };
        }));
    }

    async updatePost(uId: string, newData): Promise<IPost> {
        const post = await this.populate(
            this.postModel.findByIdAndUpdate(uId, newData, { new: true }),
        );
        const likes = await this.likeModel.find({contentId: post._id})
        return { ...post._doc, likes };
    }

    async deletePost(postId: string): Promise<IPost> {
        return await this.postModel.findByIdAndDelete(postId);
    }
}
