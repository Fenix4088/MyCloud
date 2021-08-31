const userModel = require('../models/userModel.js');

class AuthService {
  async checkIsUserExist(email) {
    return userModel.findOne({ email });
  }
}

module.exports = new AuthService();
