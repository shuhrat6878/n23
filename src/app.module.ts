import { Module}from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import {  User } from "src/user/models/user.model";
import {  UsersModules } from "src/user/user.module";
import { Shahar } from "./shahar/models/shahar.entity";
import { ShaharModule } from "./shahar/shahar.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect:'postgres',
            host:String(process.env.DB_HOST),
            port:Number(process.env.DB_PORT),
            username: String(process.env.DB_USER),
            password: String(process.env.DB_PASS),
            database:String(process.env.DB_NAME),
            logging:false,
            synchronize: true,
            autoLoadModels: true,
            models: [User,Shahar]
        }),
        UsersModules,
        ShaharModule
    ],
})
export class AppModule {}