import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Pool } from 'pg';

@Injectable()
export class CategoryService {
  constructor(@Inject('PG_POOL') private pool: Pool) { } 

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.pool.query(
      'INSERT INTO category (name) VALUES ($1) RETURNING *',
      [createCategoryDto.name],
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await this.pool.query('SELECT * from category');
      return result.rows;
  }

  async findOne(id: number) {
    const result = await this.pool.query('select * from category where id = $1',
      [id],
    );
    return result.rows[0];
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.pool.query('update category set name = $1 where id = $2 RETURNING *',
    [updateCategoryDto.name, id],
    );
    return result.rows[0];
  }

  async remove(id: number) {
    const result = await this.pool.query('DELETE FROM category where id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  }
}
