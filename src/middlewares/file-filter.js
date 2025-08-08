import path from 'path';
import {extention} from '../const/index.js';


const fileFilter=(req,file,cb)=>{
    const ext=path.extname(file.originalname).toLocaleLowerCase();
    
    if(extention.ruhsatExt.includes(ext)){
        cb(null,true)
    }else{
        cb(new Error("bunday extentionli fayllarga ruhsat etilmaydi"),false)
    }
};

export default fileFilter;
