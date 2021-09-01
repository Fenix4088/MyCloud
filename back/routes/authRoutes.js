const Router = require('express');
const UserController = require('../controllers/userController.js');
const { check } = require('express-validator');


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

module.exports = router;
