import { Router } from "express";
import davlatiController from "../controllers/davlat.controller.js";




const router = Router();

router
    .get('/join',davlatiController.JoinDavlat)
    
    .post('/', davlatiController.create)
    .get('/', davlatiController.getAll)
    .get('/:id',davlatiController.getById)
    .patch('/:id', davlatiController.update)
    .delete('/:id', davlatiController.delete)



export default router