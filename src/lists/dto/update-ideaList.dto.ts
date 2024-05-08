import { PartialType } from '@nestjs/mapped-types';
import { CreateIdeaListDto } from './create-ideaList.dto';

export class UpdateIdeaListDto extends PartialType(CreateIdeaListDto) {}
