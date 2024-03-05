import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageTypeValidationPipe implements PipeTransform {
  async transform(dto: Express.Multer.File | Array<Express.Multer.File>) {
    const MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

    if (Array.isArray(dto)) {
      for (const file of dto) {
        if (!MIME_TYPES.includes(file.mimetype)) {
          throw new BadRequestException('Invalid file type.');
        }
      }
    } else {
      if (!MIME_TYPES.includes(dto.mimetype)) {
        throw new BadRequestException('Invalid file type.');
      }
    }

    return dto;
  }
}
