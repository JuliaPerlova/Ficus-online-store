import { NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

export class FilesMiddleware implements NestMiddleware {
    async use(req, res, next) {
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });
        const uploader = upload.single('upload');
        uploader(req, res);
        next();
        //console.log(upload);
        //next();
    }
}
