import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { UploadFileMulterDto } from '../dto/upload-file-multer.dto';
import { FileRepository } from '../repositories/file.repository';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async uploadFile(file: UploadFileMulterDto) {
    return this.fileRepository.uploadFile({ ...file });
  }

  async uploadAnonymousFile(file: UploadFileMulterDto) {
    return this.fileRepository.uploadFile(file);
  }

  async uploadFiles(files: UploadFileMulterDto[], userId?: string) {
    const filesPromise = [];
    for (const file of files) {
      filesPromise.push(
        this.fileRepository.uploadFile({ ...file, createdBy: userId }),
      );
    }
    return Promise.all(filesPromise);
  }
}
