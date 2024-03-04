import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'auth/guards';
import { FileTypeValidationPipe } from './pipes/file-type-validation.pipe';
import { FilesService } from './files.service';

@Controller('files')
@UseGuards(JwtGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(new FileTypeValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.filesService.upload(file);
  }
}
