const File = require('../models/fileModel');
const {handleError} = require('../helpers/handleError');
const {sendMailToAuthor} = require('../helpers/email');

exports.DeleteFileByAdmin = async(req,res,next) => {

    try {

        const {fileId} = req.params;
        const deletedFile = await File.findByIdAndDelete(fileId).populate('author', 'name email');

        res.status(200).json(
            {
                success:true,
                message:"File Deleted Successfully",
                deletedFile,
            }
        )

        const subject = `🗑️ Your File Has Been Deleted – SheetViz`;

        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <div style="background-color: #ED8936; color: white; padding: 16px 24px;">
            <h2 style="margin: 0;">📁 File Deleted</h2>
            </div>

            <div style="padding: 20px;">
            <p style="font-size: 16px;">Hi <strong>${deletedFile?.author?.name}</strong>,</p>
            <p style="font-size: 15px;">
                One of your uploaded files <strong>"${deletedFile?.fileName}"</strong> was deleted by an administrator on SheetViz.
            </p>
            <p>This may be due to a policy violation or manual data management.</p>
            <p>If you need help or believe this was in error, contact support.</p>

            <hr style="border-top: 1px solid #ddd;" />
            <p style="font-size: 13px; color: #888;">We’re always here to help if you have any questions.</p>
            </div>
        </div>
        `;

        const text = `Hi ${deletedFile?.author?.name}, your uploaded file "${deletedFile?.fileName}" was deleted by an admin on SheetViz. If you need help, contact support.`;
        
        await sendMailToAuthor({ to: deletedFile?.author?.email, subject, html, text });

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};