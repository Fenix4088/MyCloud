const Router = require('express');
const UserController = require('../controllers/userController.js');
const { check } = require('express-validator');
const userModel = require('../models/userModel');

const router = new Router();

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must be longer then 3 and shorter than 30').isLength({ min: 3, max: 30 }),
  ],
  UserController.create
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(404).json({ message: 'Invalid password' });

  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
