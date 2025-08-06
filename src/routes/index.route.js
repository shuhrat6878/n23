import { Router } from "express";
import userRouter from "./user.routes.js"
import davlatRouter from "./davlat.routes.js"
import manzilRouter from "./manzil.routes.js"


const router  = Router()

router 
    .use('/users',userRouter)
    .use('/davlati',davlatRouter)
    .use('/manzili',manzilRouter)


export default router;