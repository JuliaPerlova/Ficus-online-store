import {
    Controller,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentApiService } from './content-api.service';
import * as multer from 'multer';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
const storage = multer.memoryStorage();

@Controller()
@ApiTags('image upload')
export class ContentApiController {
    constructor(private readonly appService: ContentApiService) {}

    @Post('/:uId/upload_image')
    @ApiHeader({ name: 'x-auth-token' })
    @UseInterceptors(FileInterceptor('upload', { storage }))
    uploadFile(@UploadedFile() file, @Param() { uId }) {
        return this.appService.uploadImage(uId, file);
    }
}
