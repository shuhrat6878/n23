import { Router } from "express";

import adminRouter from "./admin.route.js";
import router from "./admin.route.js";
import { pageError } from "../error/page-not-found.error.js";


const route = Router();

router 
    .use('/admin',adminRouter)
    .use(pageError)



export default router;