import path, { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import { v4 } from 'uuid';
import fileFilter from './file-filter.js';
import { extention } from '../const/index.js';

const uploadDir = join(process.cwd(), "uploads");
const imagePath = join(process.cwd(), "uploads/image");
const videoPath = join(process.cwd(), "uploads/video");

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
} if (!existsSync(imagePath)) {
    mkdirSync(imagePath, { recursive: true })
} if (!existsSync(videoPath)) {
    mkdirSync(videoPath)
}


const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const ext = path.extname(file.originalname).toLocaleLowerCase();
        if (extention.rasmlarExt.includes(ext)) {
            cb(null, imagePath)
        } else if (extention.videolarExt.includes(ext)) {
            cb(null, videoPath)
        } else {
            cb(new Error("bunday extentionga ruhsat etilmaydi"), false)
        }
    },

    filename: function (req, file, cb) {
        const filename = `${v4()}_${file.originalname}`
        cb(null, filename)
    }

})
const limits = {
    fileSize: 50 * 1024 * 1024
};

export const uploadFile = multer({
    storage,
    fileFilter,
    limits

})