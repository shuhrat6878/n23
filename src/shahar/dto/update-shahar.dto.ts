import { PartialType } from '@nestjs/mapped-types';
import { CreateShaharDto } from './create-shahar.dto';

export class UpdateShaharDto extends PartialType(CreateShaharDto) {}
