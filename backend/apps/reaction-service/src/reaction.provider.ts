import { Connection } from 'mongoose';
import { CommentSchema } from './schemas/comment.schema';

export const reactionProviders = [
    {
        provide: 'COMMENT_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Comment', CommentSchema),
        inject: ['DATABASE_CONNECTION1'],
    },
];
