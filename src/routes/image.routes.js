import { Router } from "express";
import controller from "../controllers/image.controller.js";
import { uploadFile } from "../middlewares/file-upload.js";


const router = Router();

router

    .post('/',uploadFile.array('file',5),controller.createImage)
    .get('/',controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)


export default router;