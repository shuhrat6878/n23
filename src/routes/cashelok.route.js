import { Router } from "express";
import controller from "../controllers/cashelok.controller.js";

const router = Router();

router

    .post('/',controller.createCashelok)
    .get('/',controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)


export default router;