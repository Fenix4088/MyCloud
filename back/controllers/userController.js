const { validationResult } = require('express-validator');
const userModel = require('../models/userModel.js');
const UserService = require('../services/userService.js');
const AuthService = require('../services/authService.js');

class UserController {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ message: 'Incorrect request', errors });

      const { email, password } = req.body;

      const candidate = await AuthService.checkIsUserExist(email);

      if (candidate) return res.status(400).json({ message: `User ${email} already exist` });

      await UserService.create({ email, password });

      return res.status(200).json({ message: `User created ${email}` });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}

module.exports = new UserController();
