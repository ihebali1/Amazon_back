import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  file: any;
}
