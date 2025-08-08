import { Router } from "express";
import { pageError } from '../error/page-not-found.error.js';
import adminRouter from './admin.routes.js';
import categoryRouter from "./category.route.js";
import clientRouter from "./client.routes.js"
import orderRouter from "./order.routes.js"
import sallerRouter from "./saller.routes.js";
import praducRouter from "./product.route.js";
import imageRouter from "./image.routes.js";
import dastafkaRouter from "./dastafka.route.js";
import cashelokRouter from "./cashelok.route.js";


const router = Router();

router
    .use('/admin', adminRouter)
    .use('/saller', sallerRouter)
    .use('/category', categoryRouter)
    .use('/product',praducRouter)
    .use('/client',clientRouter)
    .use('/image',imageRouter)
    .use('/order', orderRouter)
    .use('/image', imageRouter)
    .use('/dastafka', dastafkaRouter)
    .use('/cashelok', cashelokRouter)
    .use(pageError)

export default router;