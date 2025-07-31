import { Router } from "express";

import adminRouter from "./admin.route.js";
import router from "./admin.route.js";
import { pageError } from "../error/page-not-found.error.js";
import sallerRouter from "./saller.route.js"


const route = Router();

router 
    .use('/admin',adminRouter)
    .use('/saller',sallerRouter)
    .use(pageError)



export default router;