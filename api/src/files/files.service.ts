import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { uploadFile } from '@uploadcare/upload-client';
import { File } from 'entities';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  public async upload(file: Express.Multer.File) {
    try {
      const uploadedFile = await uploadFile(file.buffer, {
        publicKey: this.configService.get('UPLOADCARE_API_KEY'),
        fileName: file.originalname,
        contentType: file.mimetype,
      });

      const newFile = new File();

      newFile.url = uploadedFile.cdnUrl;

      return newFile;
    } catch (err) {
      throw new Error(err);
    }
  }
}
