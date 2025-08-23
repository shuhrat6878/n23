import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Countries1Service } from './countries1.service';
import { CreateCountries1Dto } from './dto/create-countries1.dto';
import { UpdateCountries1Dto } from './dto/update-countries1.dto';

@Controller('countries1')
export class Countries1Controller {
  constructor(private readonly countries1Service: Countries1Service) { }

  @Post()
  create(@Body() createCountries1Dto: CreateCountries1Dto) {
    return this.countries1Service.create(createCountries1Dto);
  }

  @Get()
  findAll() {
    return this.countries1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countries1Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountries1Dto: UpdateCountries1Dto) {
    return this.countries1Service.update(id, updateCountries1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countries1Service.remove(id);
  }

}
