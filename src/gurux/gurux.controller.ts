import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuruxService } from './gurux.service';
import { CreateGuruxDto } from './dto/create-gurux.dto';
import { UpdateGuruxDto } from './dto/update-gurux.dto';

@Controller('gurux')
export class GuruxController {
  constructor(private readonly guruxService: GuruxService) {}

  @Post()
  create(@Body() createGuruxDto: CreateGuruxDto) {
    return this.guruxService.create(createGuruxDto);
  }

  @Get()
  findAll() {
    return this.guruxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guruxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuruxDto: UpdateGuruxDto) {
    return this.guruxService.update(+id, updateGuruxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guruxService.remove(+id);
  }
}
