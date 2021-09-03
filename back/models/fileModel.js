const {Schema, model} = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    user: {type: ObjectId, ref: 'User'},
    parent: {type: ObjectId, ref: 'File'},
    children: [{type: ObjectId, ref: 'File'}]
});

module.exports = model('File', File);