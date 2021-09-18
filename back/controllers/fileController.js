const fileService = require('../services/fileService.js');
const FileModel = require('../models/fileModel.js');
const UserService = require('../services/userService');
const FileService = require('../services/fileService');
const fs = require('fs');

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

  async getFiles(req, res) {
    try {
      const { parent } = req.query;
      const { id } = req.user;

      const files = await FileModel.find({ user: id, parent });

      return res.status(200).json(files);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async uploadFile(req, res) {
    try {
      const { file, user } = req;

      // * file data
      const { size, destination, originalname } = file;

      if (!file) return res.status(404).send({ message: 'File not found!' });

      const currentUser = await UserService.findUserBy({ _id: user.id });

      const parent = await FileService.findFileBy({ user: user.id, _id: req.body.parent });

      if (!currentUser) return res.status(404).send({ message: 'User not found!' });

      // * user data
      const { diskSpace, usedSpace } = currentUser;

      if (usedSpace + size > diskSpace) return res.status(404).send({ message: 'Not enough disk space!' });

      currentUser.usedSpace += size;

      console.log(currentUser);
      let path;
      if (parent) {
        path = `${destination}/${user.id}/${parent.path}/${originalname}`;
      } else {
        path = `${destination}/${user.id}/${originalname}`;
      }

      if (fs.existsSync(path)) {
        return res.status(404).send({ message: 'File already exist!' });
      }


      await FileService.createFile(file, parent.path, path, user.id, parent._id);

      return res.status(200).send({ message: 'File added!' });
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

module.exports = new FileController();
