const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { sendMailToAuthor } = require('../helpers/email');
const { handleError } = require('../helpers/handleError');

// Sign-Up Controller
exports.Register = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(handleError(400, 'Please fill all the fields'));
        }

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return next(handleError(409, 'User Already Registered'));
        }

        const hashpassword = await bcrypt.hashSync(password, 10);

        const newUser = await User.create({ name, email, password: hashpassword });

        res.status(200).json({
            success: true,
            message: 'Registration Successfull',
            newUser,
        });

        const subject = `👋 Welcome to SheetViz, ${name}!`;

        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <div style="background-color: #7A1CAC; color: white; padding: 16px 24px;">
            <h2 style="margin: 0;">📊 Welcome to SheetViz</h2>
            </div>
        
            <div style="padding: 20px;">
            <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 15px;">
                We're excited to have you with us! SheetViz lets you upload Excel or CSV files and instantly generate AI insights and 2D/3D visual charts.
            </p>
            <p>✨ Start exploring your data today!</p>
        
            <div style="margin: 30px 0;">
                <a href="https://sheetviz.vercel.app" style="background-color: #7A1CAC; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">📂 Go to SheetViz</a>
            </div>
        
            <hr style="border-top: 1px solid #ddd;" />
            <p style="font-size: 13px; color: #888;">If you didn’t sign up for SheetViz, you can ignore this email.</p>
            </div>
        </div>
        `;
        
        const text = `Welcome to SheetViz, ${name}! Upload your spreadsheet and get insights with visual charts. Visit https://sheetviz.vercel.app/`;        

        await sendMailToAuthor({ to: email, subject, html, text });

    } catch (error) {
        return next(handleError(500, error.message));
    }
};
