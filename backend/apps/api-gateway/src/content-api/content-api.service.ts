import { Injectable } from "@nestjs/common";
import { v2 } from 'cloudinary';
import 'dotenv/config';

@Injectable()
export class ContentApiService {
    private cloudinary = v2;
    constructor() {
        this.cloudinary.config({
            cloud_name: `${process.env.CLOUD_NAME}`,
            api_key: `${process.env.CLOUD_API_KEY}`,
            api_secret: `${process.env.CLOUD_API_SECRET}`
        });
    }

    async uploadImage(uId, file) {
        const { buffer, mimetype } = file;
        const data = buffer.toString('base64');
        const uri = `data:${mimetype};base64,${data}`;
        return await this.cloudinary.uploader.upload(uri, { folder: `user_${uId}` });
    }

}