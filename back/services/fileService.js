const fs = require('fs');
const config = require('config');

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

}

module.exports = new FileService();