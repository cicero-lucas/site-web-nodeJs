const multer = require('multer');
import path from 'path';

export const storage = multer.diskStorage({
        destination:(req,file,callback)=>{
            callback(null,path.resolve("server"));
        },
        filename:(req,file,callback)=>{
            const time = new Date().getTime();
            callback(null,)`${time}_${file.originalname}`;

        }
    })


// outro 

const upload = multer({storage:storage})