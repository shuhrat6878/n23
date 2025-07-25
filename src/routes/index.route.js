import { Router } from "express";

import adminRouter from "./admin.route.js";
import router from "./admin.route.js";


const route = Router();

router 
    .use('/admin',adminRouter)



export default router;