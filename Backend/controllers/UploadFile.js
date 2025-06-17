const File = require('../models/fileModel');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Upload raw buffer to Cloudinary
const uploadToCloudinary = (buffer, fileName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
        {
            folder: 'sheetviz',
            resource_type: 'raw',
            public_id: fileName.replace(/\.[^/.]+$/, '') + '.xlsx' // remove extension
        },
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

// convert readable size
exports.formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 

// POST
exports.uploadFile = async (req, res) => {

    try {
        
        const file = req.file;
        const previewData = JSON.parse(req.body.previewData);
        const userId = req.body.userId;
        const fileSize = this.formatBytes(file.size);

        if (!file || !userId) {
            return res.status(400).json({ error: 'File and userId are required.' });
        }

        const cloudResult = await uploadToCloudinary(file.buffer, file.originalname);

        const newFile = new File({
            author: userId,
            fileName: file.originalname,
            size: fileSize,
            cloudinaryURL: cloudResult.secure_url,
            previewData,
        });

        const saved = await newFile.save();
        res.status(201).json({ message: 'Uploaded successfully', file: saved });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed', reason: err.message });
    }
};
