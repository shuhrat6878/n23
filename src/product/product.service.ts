import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Pool } from 'pg';

@Injectable()
export class ProductService {
  constructor(@Inject('PG_POOL') private pool: Pool) { }

  async create(createProductDto: CreateProductDto) {
    const { name, price, sellerId, categoryId }= createProductDto;
    const result = await this.pool.query('INSERT INTO product(name, price, sellerId, categoryId) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, sellerId, categoryId],
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await this.pool.query(`SELECT p.*, s.name as seller_name, c.name as category_name
      from product p
      join seller s ON p.sellerId = s.id
      join category c ON p.categoryId = c.id`
    );
    return result.rows;
  }

  async findOne(id: number) {
    const result = await this.pool.query(`SELECT p.*, s.name as seller_name, c.name as category_name
      from product p
      join seller s ON p.sellerId = s.id
      join category c ON p.categoryId = c.id`,
      [id],
    );
    return result.rows[0];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, price, sellerId, categoryId } = updateProductDto;
    const result = await this.pool.query('update product set name = $1, price = $2, sellerId = $3, categoryId = $4 where id = $5 RETURNING *',
      [name, price, sellerId, categoryId],
    );
    return result.rows[0];
  }

  async remove(id: number) {
    const result = await this.pool.query('DELETE FROM product where id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  }
}
