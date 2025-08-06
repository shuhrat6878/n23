import { Router } from "express";
import userController from "../controllers/user.controller.js";




const router = Router();

router
    .get('/join',userController.JoinUser)
    
    .post('/', userController.create)
    .get('/', userController.getAll)
    .get('/:id',userController.getById)
    .patch('/:id', userController.update)
    .delete('/:id', userController.delete)



export default router