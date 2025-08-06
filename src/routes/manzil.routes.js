import { Router } from "express";
import manziliController from "../controllers/manzil.controller.js";




const router = Router();

router
    .get('/join', manziliController.JoinManzil)

    .post('/', manziliController.create)
    .get('/', manziliController.getAll)
    .get('/:id',manziliController.getById)
    .patch('/:id', manziliController.update)
    .delete('/:id', manziliController.delete)



export default router