const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');

exports.GetUploadedFilesById = async(req,res,next) => {

    try {   
        const {id} = req.params;
        const files = await File.find({author:id}).sort({createdAt:-1}).lean().exec(); 
        res.status(200).json({
            success:true,
            message:"Your Files are Fteched Successfully",
            files
        });
    } catch (error) {
        next(handleError(500, `Error occure while fetching your files, ${error.message}`));
    }

};