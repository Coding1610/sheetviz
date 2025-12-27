// create instance of express
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// load config of .env file
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// middleware for body parsing
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}))

// import routes and mounting
const routes = require('./routes/routes');
app.use('/api',routes);

// db connection
const dbConnect = require('./config/database');
dbConnect();

// cloudinary connection
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// app listen
app.listen(PORT, () => {
    console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

// default route
app.get("/", (req,res) => {
    res.send('<h1> SheetViz </h1>');
});

// handle error middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message =  err.message || "Internal Error";
    res.status(statusCode).json(
        {
            success:false,
            statusCode,
            message
        }
    )
});