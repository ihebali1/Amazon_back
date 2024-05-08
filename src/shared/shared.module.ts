import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
// extract extension
function getExtension(originalname) {
  const regexExtension = new RegExp('[^.]+$');
  return originalname.match(regexExtension).toString();
}

const multerConfig = {
  dest: process.env.FILE_UPLOAD_DIRECTORY_PATH,
  fileFilter(req, file, callback) {
    const authorizedMIMEtypes = [
      'image/*',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'text/csv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.template',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      'application/vnd.ms-access',
      'application/pdf',
      'audio/mpeg',
      'audio/ogg',
      'video/mp4',
      'audio/wav',
      'video/x-msvideo',
    ];

    if (authorizedMIMEtypes.includes(file.mimetype.toLowerCase())) {
      const extension = getExtension(file.originalname);
      file.extension = extension;

      callback(null, true);
    } else {
      callback(new Error('File mimetype not supported.'), false);
    }
  },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.FILE_UPLOAD_DIRECTORY_PATH);
    },
    filename: (req, file, cb) => {
      // format file name to have this: file-{timestamp}.{extension}
      cb(null, `file-${Date.now()}.${getExtension(file.originalname)}`);
    },
  }),
};
@Global()
@Module({
  imports: [MulterModule.register(multerConfig)],
  exports: [MulterModule],
})
export class SharedModule {}
