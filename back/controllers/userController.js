const { validationResult } = require('express-validator');
const userModel = require('../models/userModel.js');
const UserService = require('../services/userService.js');
const AuthService = require('../services/authService.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findUserBy({ email });

      if (!user) return res.status(404).json({ message: 'User not found' });

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) return res.status(404).json({ message: 'Invalid password' });

      const token = this.generateToken(user.id);

      const {id, email: userEmail, diskSpace, usedSpace, avatar} = user;

      return res.status(200).send({
        message: "You are logged in!",
        token,
        user: {
          id,
          email: userEmail,
          diskSpace,
          usedSpace,
          avatar
        }

      });

    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  async checkIsAuth(req, res) {
    try {
      const {id} = req.user;
      const user = await UserService.findUserBy({id});

      if(!user) return res.status(404).json({message: 'User not found'});

      const token = this.generateToken(user.id);

      const {email: userEmail, diskSpace, usedSpace, avatar} = user;

      return res.status(200).send({
        message: "You are authorized!",
        token,
        user: {
          id,
          email: userEmail,
          diskSpace,
          usedSpace,
          avatar
        }

      });


    } catch(e) {
      return res.status(500).json(e);
    }
  }

  generateToken(userId) {
    return jwt.sign({id: userId}, config.get('secret'), {expiresIn: '1h'});
  }
}

module.exports = new UserController();
