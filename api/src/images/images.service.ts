import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { uploadFile } from '@uploadcare/upload-client';
import { Image } from 'entities';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  public async upload(image: Express.Multer.File) {
    try {
      const uploadedImage = await uploadFile(image.buffer, {
        publicKey: this.configService.get('UPLOADCARE_API_KEY'),
        fileName: image.originalname,
        contentType: image.mimetype,
      });

      const newImage = new Image();

      newImage.url = uploadedImage.cdnUrl;

      return newImage;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async bulkUpload(images: Array<Express.Multer.File>) {
    const uploadedImages = [];

    for (const image of images) {
      try {
        uploadedImages.push(await this.upload(image));
      } catch (err) {
        console.error(err);
      }
    }

    return uploadedImages;
  }
}
