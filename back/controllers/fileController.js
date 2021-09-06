const fileService = require('../services/fileService.js');
const FileModel = require('../models/fileModel.js');
const User = require('../models/userModel.js');

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const { id } = req.user;

      const file = new FileModel({ name, type, parent, user: id });
      const parentFile = await FileModel.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileService.createDir(file);
        parentFile.children.push(file._id);
        await parentFile.save();
      }

      await file.save();
      return res.status(200).json(file);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new FileController();
