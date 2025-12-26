// const User = require('../models/userModel');
// const jwt = require('jsonwebtoken');
// const {handleError} = require('../helpers/handleError');

// exports.AdminView = async(req,res,next) => {

//     try {       
//         const token = req.cookies.cookie_name;

//         // console.log(token);

//         if(!token){
//             return next(handleError(456,'Unathorized'));
//         }

//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         const id = '68528468dd8c0b7917a127ec';
       
//         const freshUser = await User.findById(id);
        
//         if(freshUser.role !== decodeToken.role) {
//             decodeToken.role = freshUser.role;
//         }

//         if(decodeToken.role === 'Admin'){
//             req.user = decodeToken;
//             next();
//         }
//         else{
//             return next(handleError(403,'Unathorized'));
//         }

//     } catch (error) {
//         next(handleError(500, error.message));
//     }   

// };


// middleware/adminMiddleware.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { handleError } = require('../helpers/handleError');

exports.AdminView = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_name;

        if (!token) {
            // Changed from 456 to 401 (Unauthorized) for better standards
            return next(handleError(401, 'Session expired. Please login again.'));
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // FIX: Remove hardcoded ID. Use the ID from the decoded JWT token.
        const freshUser = await User.findById(decodeToken._id);

        if (!freshUser) {
            return next(handleError(404, 'User not found.'));
        }

        // Check if the user is an Admin
        if (freshUser.role === 'Admin') {
            req.user = freshUser; // Attach the full user object to the request
            next();
        } else {
            // Forbidden for non-admins
            return next(handleError(403, 'Access Denied: Admin privileges required.'));
        }

    } catch (error) {
        return next(handleError(500, error.message));
    }
};