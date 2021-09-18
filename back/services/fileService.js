const fs = require('fs');
const config = require('config');
const FileModel = require("../models/fileModel.js");

class FileService {
    createDir(file) {
        const filePath = `${config.get('fileStoragePath')}/${file.user}/${file.path}`;
        return new Promise((res, rej) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                    return res({message: 'File was created'});
                } else {
                    return rej({message: 'File already exist!'});
                }

            } catch(e) {
                return rej({message: 'File error!'});
            }
        })
    }

    findFileBy(payload) {
        return FileModel.findOne(payload);
    }

    async createFile(file, parentPath, path, userId, parentId) {

        try {
            const {originalname, size} = file;

            await fs.writeFileSync(path, originalname);

            // const type = originalname.split('.').pop();

            const newFile = await FileModel.create({
                name: originalname,
                type: 'file',
                size,
                path: parentPath,
                user: userId,
                parent: parentId
            });

            await newFile.save();
        } catch(e) {
            console.log(e);
        }


    }

}

module.exports = new FileService();