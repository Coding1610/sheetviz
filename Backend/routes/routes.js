const express = require('express');
const router = express.Router();
const {upload} = require('../config/multer');
const {uploadExcel} = require('../config/multer');

// import middleware
const {Authenticate} = require('../middlewares/Authenticate');
const {AdminView} = require('../middlewares/AdminView');

// import handler
const {Register} = require('../controllers/Register');
const {Login} = require('../controllers/Login');
const {GoogleAuth} = require('../controllers/GoogleAuth');
const {Logout} = require('../controllers/Logout');
const {GetUser} = require('../controllers/GetUser');
const {UpdateUser} = require('../controllers/UpdateUser');
const { GetAllUsers } = require('../controllers/GetAllUsers');
const { DeleteUser } = require('../controllers/DeleteUser');
const UploadFile = require('../controllers/UploadFile');
const { GetUploadedFilesById } = require('../controllers/GetUploadedFilesById');
const { DeleteFile } = require('../controllers/DeleteFile');
const { GetSingleFile } = require('../controllers/GetSingleFile');
const { GetAllFiles } = require('../controllers/GetAllFiles');
const { DeleteFileByAdmin } = require('../controllers/DeleteFileByAdmin');
const { GetUserCount } = require('../controllers/GetUserCount');
const { GetFileCount } = require('../controllers/GetFileCount');
const { GetFilesStorage } = require('../controllers/GetFilesStorage');
const { GetCloudinaryStorage } = require('../controllers/GetCloudinaryStorage');

// create routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/google-auth', GoogleAuth);
router.get('/logout', Authenticate, Logout);

router.get('/get-user/:userid', Authenticate, GetUser);
router.put('/update-user/:userid', Authenticate, upload.single('file'), UpdateUser);
router.delete('/user/delete/:id', Authenticate, DeleteUser);

// Upload File Route
router.post('/upload-file', Authenticate, uploadExcel.single('file'), UploadFile.uploadFile);

// Get Uploaded file by User Id
router.get('/uploaded-files/:id', Authenticate, GetUploadedFilesById);

// Delete file by File Id - User
router.delete('/delete-file/:fileId', Authenticate, DeleteFile);

// Delete file by File Id - Admin
router.delete('/delete-file-by-admin/:fileId', AdminView, DeleteFileByAdmin);

// Get single file by Id
router.get('/file-view/:fileId', Authenticate, GetSingleFile);

// Get all files
router.get('/get-all-files', AdminView, GetAllFiles);

// Get all users
router.get('/get-all-users', AdminView, GetAllUsers);

// Get user count
router.get('/get-user-count', AdminView, GetUserCount);

// Get files count
router.get('/get-file-count', AdminView, GetFileCount);

// Get mongoDB file storage
router.get('/get-file-storage', AdminView, GetFilesStorage);

// Get cloudinary storage
router.get('/get-cloudinary-storage', AdminView, GetCloudinaryStorage);

module.exports = router;