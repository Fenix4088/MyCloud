const Router = require('express');
const UserController = require('../controllers/userController.js');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');


const router = new Router();

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must be longer then 3 and shorter than 30').isLength({ min: 3, max: 30 }),
  ],
  UserController.create
);

router.post('/login', (req, res) => UserController.login(req, res));

router.get('/', authMiddleware, async (req, res) => UserController.checkIsAuth(req, res));

module.exports = router;
