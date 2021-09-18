const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const FileController = require('../controllers/fileController');
const config = require('config')

const multer = require("multer");
const upload = multer({ dest: config.get('fileStoragePath') })

const router = new Router();

router.post('/create', authMiddleware, (req, res) => FileController.createDir(req, res));

router.get('/get', authMiddleware, (req, res) => FileController.getFiles(req, res));

router.post('/upload', authMiddleware, upload.single('file'), (req, res) => FileController.uploadFile(req, res));

module.exports = router;
