import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import { v4 } from 'uuid';

const uploadDir = join(process.cwd(), 'uploads');
const ensureDirExists = (dir) => {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let subDir = '';
        if (file.mimetype.startsWith('image/')) {
            subDir = 'images';
        } else if (file.mimetype.startsWith('video/')) {
            subDir = 'videos';
        } else if (file.mimetype.startsWith('application/') || 
        file.mimetype.startsWith('text/')) {
            subDir = 'documents';
        }

        const destinationPath = join(uploadDir, subDir);
        ensureDirExists(destinationPath);
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const fileName = `${v4()}_${file.originalname}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || 
        file.mimetype.startsWith('video/') ||
        file.mimetype.startsWith('application/') || 
        file.mimetype.startsWith('text/')) {
        cb(null, true);
    } else {
        cb(new Error('Faqat rasm, video va hujjat fayllari yuklanishi mumkin!'), false);
    }
};

export const uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});