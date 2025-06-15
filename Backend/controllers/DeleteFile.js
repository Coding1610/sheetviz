const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');

exports.DeleteFile = async(req,res,next) => {

    try {

        const {fileId} = req.params;
        const deletedFile = await File.findByIdAndDelete(fileId);

        res.status(200).json(
            {
                success:true,
                message:"File Deleted Successfully",
                deletedFile,
            }
        )

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};