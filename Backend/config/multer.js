const multer = require('multer');

// Existing diskStorage for images
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Existing image file filter
function fileFilter(req, file, cb) {
    const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if (!allowedFiles.includes(file.mimetype)) {
        cb(new Error("Only Images are allowed."), false);
    } else {
        cb(null, true);
    }
}

// Existing export for image upload
const upload = multer({ storage: storage, fileFilter: fileFilter });


// Excel file upload config (memoryStorage + filter)
const excelStorage = multer.memoryStorage();

function excelFileFilter(req, file, cb) {
    const allowedMimes = [
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ];
    if (!allowedMimes.includes(file.mimetype)) {
        cb(new Error("Only Excel files are allowed."), false);
    } else {
        cb(null, true);
    }
}

const uploadExcel = multer({ storage: excelStorage, fileFilter: excelFileFilter });

// Export both
module.exports = {
    upload,        // Image uploader
    uploadExcel,   // Excel uploader
};