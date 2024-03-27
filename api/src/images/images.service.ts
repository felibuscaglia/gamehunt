import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UploadcareSimpleAuthSchema,
  deleteFile,
} from '@uploadcare/rest-client';
import { uploadFile } from '@uploadcare/upload-client';
import { Image } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  public async upload(image: Express.Multer.File) {
    try {
      const uploadedImage = await uploadFile(image.buffer, {
        publicKey: this.configService.get('UPLOADCARE_API_KEY'),
        fileName: image.originalname,
        contentType: image.mimetype,
      });

      const newImage = new Image();

      newImage.url = uploadedImage.cdnUrl;
      newImage.externalId = uploadedImage.uuid;

      return this.imagesRepository.save(newImage);
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

  public delete(externalId: string) {
    this.imagesRepository.delete({ externalId });

    deleteFile(
      {
        uuid: externalId,
      },
      {
        authSchema: new UploadcareSimpleAuthSchema({
          publicKey: this.configService.get('UPLOADCARE_API_KEY'),
          secretKey: this.configService.get('UPLOADCARE_SECRET_KEY'),
        }),
      },
    );
  }
}
