import { Module } from '@nestjs/common';
import { SellerModule } from './seller/seller.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { dbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    dbModule,
    SellerModule,
    CategoryModule,
    ProductModule],
})
export class AppModule { }
