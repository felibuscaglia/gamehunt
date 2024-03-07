import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'auth/guards';
import { ImageTypeValidationPipe } from './pipes/image-type-validation.pipe';
import { ImagesService } from './images.service';

@Controller('images')
@UseGuards(JwtGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(new ImageTypeValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.imagesService.upload(file);
  }

  @Post('/bulk')
  @UseInterceptors(FilesInterceptor('files'))
  bulkUploadImages(
    @UploadedFiles(new ImageTypeValidationPipe())
    files: Array<Express.Multer.File>,
  ) {
    return this.imagesService.bulkUpload(files);
  }

  @Delete('/:imageExternalId')
  deleteImage(@Param('imageExternalId') imageExternalId: string) {
    return this.imagesService.delete(imageExternalId);
  }
}
