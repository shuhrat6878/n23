import { Global, Module } from "@nestjs/common";
import { PrismaSrvice } from "./prisma.service";

@Global()
@Module({
    providers:[PrismaSrvice],
    exports:[PrismaSrvice]
})
export class PrismaModule{}