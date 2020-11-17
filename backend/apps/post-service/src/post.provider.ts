import { Connection } from 'mongoose';
import { PostSchema } from './schemas/post.schema';
import { LikeSchema } from 'apps/likes-service/src/schema/likes.schema';

export const postProviders = [
    {
        provide: 'POST_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Post', PostSchema),
        inject: ['DATABASE_CONNECTION1'],
    },

    {
        provide: 'LIKE_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Like', LikeSchema),
        inject: ['DATABASE_CONNECTION1'],
    },
];
