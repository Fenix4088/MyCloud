const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

class UserService {
  async create(newUserData) {
    const { email, password } = newUserData;
    const hashPassword = await bcrypt.hash(password, 15);
    const newUser = await userModel.create({ email, password: hashPassword });
    await newUser.save();
  }

  async findUserBy(payload) {
    return userModel.findOne(payload)
  }
}

module.exports = new UserService();
