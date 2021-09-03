const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const FileController = require('../controllers/fileController');

const router = new Router();

router.post('/create', authMiddleware, (req, res) => FileController.createDir(req, res));

module.exports = router;
