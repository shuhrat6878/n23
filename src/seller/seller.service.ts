import { Inject, Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Pool } from 'pg';

@Injectable()
export class SellerService {
constructor(@Inject('PG_POOL') private pool: Pool) { }

  async create(createSellerDto: CreateSellerDto) {
    const {fullName, email, age } = createSellerDto;
    const result = await this.pool.query(
      'INSERT INTO seller (fullName, email, age) VALUES ($1, $2, $3) RETURNING *',
      [fullName, email, age],
    );
    return result.rows[0]
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM seller');
    return result.rows
  }

  async findOne(id: number) {
    const result = await this.pool.query('SELECT * FROM seller WHERE id = $1',
    [id],
    );
    return result.rows[0];
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    const { fullName, email, age } = updateSellerDto;
    const result = await this.pool.query('UPDATE seller SET name = $1, email = $2, age = $3 where id = $4 RETURNING *',
    [fullName, email, age, id],
  );
  return result.rows[0];
  }

  async remove(id: number) {
    const result = await this.pool.query('DELETE FROM seller WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  }
}
