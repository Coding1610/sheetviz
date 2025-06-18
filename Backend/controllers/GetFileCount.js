const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');

exports.GetFileCount = async(req,res,next) => {
    try{
        const fileCount = await File.countDocuments();
        if(fileCount === 0){
            return next(handleError(404,'No File Found'));
        }
        res.status(200).json({
            success:true,
            message:"File Counted Successfully",
            fileCount
        });
    } catch(error){
        return next(handleError(500,error.message));
    }
};