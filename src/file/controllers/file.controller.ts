import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { UploadFileDto } from '../dto/upload-file.dto';
import { UploadFilesDto } from '../dto/upload-files.dto';
import { FileService } from '../services/file.service';
import { UploadFileMulterDto } from '../dto/upload-file-multer.dto';
import { Users } from 'src/users/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: UploadFileMulterDto,
  ) {
    return this.fileService.uploadFile(file);
  }

  @Post('/upload-multiple')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @CurrentUser() user: Users,
    @Body() uploadFilesDto: UploadFilesDto,
    @UploadedFiles() files: UploadFileMulterDto[],
  ) {
    return this.fileService.uploadFiles(files, user.id);
  }
}
