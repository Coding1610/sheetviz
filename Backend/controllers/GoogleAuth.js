const {handleError} = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendMailToAuthor } = require('../helpers/email');

// GoogleAuth Controller
exports.GoogleAuth = async(req,res,next) => {

    try {

        // fetch data
        const {name,email,avatar} = req.body;

        // check email is present or not
        const isEmail = await User.findOne({email});

        const finalUser = isEmail

        // absent then
        if(!isEmail){
            // create new user
            const password = Math.round(Math.random()*1000000).toString();
            const hashPassword = await bcrypt.hash(password,10);
            finalUser = await User.create({name,email,password:hashPassword,avatar});
        }

        // create jwt 
        const token = jwt.sign({
            _id:finalUser._id,
            name:finalUser.name,
            email:finalUser.email,
            avatar:finalUser.avatar
        },process.env.JWT_SECRET_KEY);

        // create cookie
        res.cookie('cookie-name', token , {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path:'/'
        });

        finalUser.password = undefined;

        // response send
        res.status(200).json(
            {
                success:true,
                message:"Login Successfully",
                user:finalUser
            }
        );

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
                <a href="http://localhost:5173/" style="background-color: #7A1CAC; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">📂 Go to SheetViz</a>
            </div>
        
            <hr style="border-top: 1px solid #ddd;" />
            <p style="font-size: 13px; color: #888;">If you didn’t sign up for SheetViz, you can ignore this email.</p>
            </div>
        </div>
        `;
        
        const text = `Welcome to SheetViz, ${name}! Upload your spreadsheet and get insights with visual charts. Visit https://sheetviz.vercel.app/`;        

        await sendMailToAuthor({ to: email, subject, html, text });

    } catch(error) {
        return next(handleError(500,error.message));
    }
}
