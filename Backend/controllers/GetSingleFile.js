const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');

exports.GetSingleFile = async(req,res,next) => {

    try {   
        const {fileId} = req.params;
        const file = await File.findById({_id:fileId}).lean().exec(); 
        res.status(200).json({
            success:true,
            message:"Your File Fteched Successfully",
            file
        });
    } catch (error) {
        next(handleError(500, `Error occure while fetching your files, ${error.message}`));
    }

};