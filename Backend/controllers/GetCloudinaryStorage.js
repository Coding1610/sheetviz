// const cloudinary = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2
const { handleError } = require('../helpers/handleError');

exports.GetCloudinaryStorage = async (req, res, next) => {

    try {
      const result = await cloudinary.api.usage();

      const storageBytes = result?.storage?.usage || 0;
  
      const sizeInMB = (storageBytes / (1024 * 1024)).toFixed(2);
  
      res.status(200).json({
        success: true,
        message: 'Cloudinary storage usage fetched successfully',
        storage: {
          megabytes: sizeInMB,
        }
      });
    } catch (error) {
      return next(handleError(500, error.message));
    }
  };