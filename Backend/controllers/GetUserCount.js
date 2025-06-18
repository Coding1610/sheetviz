const User = require('../models/userModel');
const {handleError} = require('../helpers/handleError');

exports.GetUserCount = async(req,res,next) => {
    try{
        const userCount = await User.countDocuments();
        if(userCount === 0){
            return next(handleError(404,'No User Found'));
        }
        res.status(200).json({
            success:true,
            message:"User Counted Successfully",
            userCount
        });
    } catch(error){
        return next(handleError(500,error.message));
    }
};