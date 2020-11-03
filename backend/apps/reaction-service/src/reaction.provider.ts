import { Connection } from 'mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { ReplySchema } from './schemas/reply.schema';

export const reactionProviders = [
    {
        provide: 'COMMENT_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Comment', CommentSchema),
        inject: ['DATABASE_CONNECTION1'],
    },
    {
        provide: 'REPLY_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Reply', ReplySchema),
        inject: ['DATABASE_CONNECTION1'],
    },
];
