import { Router } from "express";
import { uploadFile } from "./upload.js";
import { join } from "path";

const router = Router();
router
    .post('/files', uploadFile.array('files', 5), (req, res) => {
    const uploadedFiles = req.files;

    const fileObjectsToSave = uploadedFiles.map(file => {
        const relativePath = join(file.destination.split('uploads')[1], file.filename);
        return {
            original_name: file.originalname,
            store_name: file.filename,
            mime_type: file.mimetype,
            size: file.size,
            path: `uploads${relativePath}`.replace(/\\/g, '/') 
        };
    });

    res.status(200).json({ message: 'Fayllar muvaffaqiyatli yuklandi', files: fileObjectsToSave });
});

export default router;