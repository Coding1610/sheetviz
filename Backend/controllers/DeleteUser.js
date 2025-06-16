const User = require('../models/userModel');
const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');

exports.DeleteUser = async(req,res,next) => {

    try {
        const {id} = req.params;

        // Delete files uploaded by the user
        await File.deleteMany({author:id});

        // Delete the user itself
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return next(handleError(404,'User Not Found'));
        }

        res.status(200).json(
            {
                success:true,
                message:"User and related data deleted Successfully",
                deletedUser
            }
        )

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};