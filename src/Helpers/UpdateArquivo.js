const multer = require('multer');
const path = require('path');

// Definição do local de armazenamento e do nome do arquivo
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("assets/server/img"));
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();
        callback(null, `${time}_${file.originalname}`);
    }
});

module.exports = {storage};