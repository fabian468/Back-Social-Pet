const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatar');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storageVideoHelp = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/video/help');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4|wma/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png) y video (mp4, wma)'));
    }
};


const fileFilterVideo = (req, file, cb) => {
    const filetypes = /mp4|wma/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png)'));
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 15 }
});

const uploadAvatar = multer({
    storage: storageAvatar,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limitar a 5MB
});

const uploadVideo = multer({
    storage: storageVideoHelp,
    fileFilter: fileFilterVideo,
    limits: { fileSize: 1024 * 1024 * 15 } // Limitar a 15MB
});

module.exports = { upload, uploadAvatar, uploadVideo }