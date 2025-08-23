import { PartialType } from '@nestjs/mapped-types';
import { CreateCountries1Dto } from './create-countries1.dto';

export class UpdateCountries1Dto extends PartialType(CreateCountries1Dto) {}
