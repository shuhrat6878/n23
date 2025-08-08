import { Router } from "express";
import controller from "../controllers/dastafka.controller.js";

const router = Router();

router

    .post('/',controller.createDastafka)
    .get('/',controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)


export default router;