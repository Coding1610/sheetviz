const mongoose = require('mongoose');

const excelFileSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    fileName:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    cloudinaryURL:{
        type:String,
        required:true,
    },
    previewData:[mongoose.Schema.Types.Mixed],
},{timestamps:true});

const File = mongoose.model('File', excelFileSchema, 'Files'); //(modelName, schemaName, collectionName)
module.exports = File;