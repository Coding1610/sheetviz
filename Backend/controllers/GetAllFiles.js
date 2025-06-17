const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');

exports.GetAllFiles = async(req,res,next) => {

    try {   
        const files = await File.find().populate('author','name avatar').sort({createdAt:-1}).lean().exec(); 
        res.status(200).json({
            success:true,
            message:"Files are Fteched Successfully",
            files
        });
    } catch (error) {
        next(handleError(500, `Error occure while fetching your files, ${error.message}`));
    }

};