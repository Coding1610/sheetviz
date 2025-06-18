const File = require('../models/fileModel');
const { handleError } = require('../helpers/handleError');

exports.GetFilesStorage = async (req, res, next) => {
  try {
    const files = await File.find({}, 'size');

    if (!files || files.length === 0) {
      return next(handleError(404, 'No files found'));
    }

    // Extract numeric value from strings like "5.92 KB"
    const validSizes = files
      .map(file => {
        const match = String(file.size).match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      })
      .filter(size => !isNaN(size) && size > 0);

    const totalKB = validSizes.reduce((sum, size) => sum + size, 0);
    const totalMB = totalKB / 1024;
    const totalGB = totalKB / (1024 * 1024);

    res.status(200).json({
      success: true,
      message: 'Total storage size calculated from database (KB)',
      storage: {
        kilobytes: `${totalKB.toFixed(2)} KB`,
        megabytes: `${totalMB.toFixed(2)} MB`,
        gigabytes: `${totalGB.toFixed(4)} GB`
      }
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
