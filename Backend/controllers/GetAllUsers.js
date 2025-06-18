const User = require('../models/userModel');
const {handleError} = require('../helpers/handleError');

exports.GetAllUsers = async(req,res,next) => {

    console.log("Hello");

    try {  
        const allUsers = await User.find();
        console.log("Hello 2");
        res.status(200).json(
            {
                success:true,
                message:"All Users Fetched successfully",
                allUsers
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while fetching all users, ${error.message}`));
    }

};