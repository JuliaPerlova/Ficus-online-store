import { LikeSchema } from 'apps/likes-service/src/schema/likes.schema';
import { Connection } from 'mongoose';
import { CommentSchema } from './schemas/comment.schema';

export const reactionProviders = [
    {
        provide: 'COMMENT_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Comment', CommentSchema),
        inject: ['DATABASE_CONNECTION1'],
    },

    {
        provide: 'LIKE_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Like', LikeSchema),
        inject: ['DATABASE_CONNECTION1'],
    },
];
