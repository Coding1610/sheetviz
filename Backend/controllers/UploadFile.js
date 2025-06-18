const File = require('../models/fileModel');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const User = require('../models/userModel');
const {sendMailToAuthor} = require('../helpers/email');
const { handleError } = require('../helpers/handleError');

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

        const user = await User.findById(userId);

        if(user){
            const subject = `✅ "${file?.originalname}" Uploaded Successfully – SheetViz`;

            const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <div style="background-color: #38A169; color: white; padding: 16px 24px;">
                <h2 style="margin: 0;">📈 File Uploaded</h2>
                </div>

                <div style="padding: 20px;">
                <p style="font-size: 16px;">Hi <strong>${user?.name}</strong>,</p>
                <p style="font-size: 15px;">
                    Your file <strong>"${file?.originalname}"</strong> has been successfully uploaded to SheetViz.
                </p>
                <p>You can now explore insights, summaries, and generate stunning 2D & 3D charts.</p>

                <div style="margin: 30px 0;">
                    <a href="http://localhost:5173/" style="background-color: #38A169; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">📊 View My Insights</a>
                </div>

                <hr style="border-top: 1px solid #ddd;" />
                <p style="font-size: 13px; color: #888;">Thanks for using SheetViz!</p>
                </div>
            </div>
            `;

            const text = `Hi ${user?.name}, your file "${file?.originalname}" was uploaded successfully on SheetViz. Explore insights now at https://sheetviz.vercel.app/`;
            
            await sendMailToAuthor({ to: user?.email, subject, html, text });
        }
        else{
            handleError(404,'User Not Found');
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed', reason: err.message });
    }
};
