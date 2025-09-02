import { PartialType } from '@nestjs/mapped-types';
import { CreateGuruxDto } from './create-gurux.dto';

export class UpdateGuruxDto extends PartialType(CreateGuruxDto) {}
