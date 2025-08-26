import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShaharService } from './shahar.service';
import { CreateShaharDto } from './dto/create-shahar.dto';
import { UpdateShaharDto } from './dto/update-shahar.dto';

@Controller('shahar')
export class ShaharController {
  constructor(private readonly shaharService: ShaharService) {}

  @Post()
  create(@Body() createShaharDto: CreateShaharDto) {
    return this.shaharService.create(createShaharDto);
  }

  @Get()
  findAll() {
    return this.shaharService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shaharService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShaharDto: UpdateShaharDto) {
    return this.shaharService.update(+id, updateShaharDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shaharService.remove(+id);
  }
}
