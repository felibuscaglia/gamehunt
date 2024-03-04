import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    const MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

    if (!MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type.');
    }

    return file;
  }
}
