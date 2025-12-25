# SheetViz – Visualize Excel Data with Ease

SheetViz is a MERN-based web application that allows users to upload `.xlsx`, `.csv`, or `.xls` files and visualize data using interactive 2D and 3D charts. It also provides AI-generated insights for better data understanding. The platform supports both normal users and administrators with dedicated dashboards.

---

## Screenshots

<img src="./Screenshots/landing page.png" />
<img src="./Screenshots/sign-up page.png" />
<img src="./Screenshots/user dashboard 1.png" />
<img src="./Screenshots/user file history.png" />
<img src="./Screenshots/delete file dialog box.png" />
<img src="./Screenshots/file upload form.png" />
<img src="./Screenshots/2d & 3d charts.png" />
<img src="./Screenshots/download chart as png & pdf.png" />
<img src="./Screenshots/file insights (OPEN AI).png" />
<img src="./Screenshots/admin dashboard.png" />
<img src="./Screenshots/uploaded all users files.png" />
<img src="./Screenshots/delete user dialog box.png" />
<img src="./Screenshots/email - welcome.png" />
<img src="./Screenshots/email - file uploaded.png" />
<img src="./Screenshots/email - account deleted.png" />
<img src="./Screenshots/email - file deleted.png" />

---

## Features

### Landing Page
- Hero section with sign up and sign in actions  
- Feature overview cards  
- Developer profile section  

### Authentication
- JWT-based authentication  
- Zod validation for forms  
- Google sign-in using Firebase  
- Cookie-based session valid for seven days  

---

## Roles and Dashboards

### Normal User
- Upload Excel and CSV files using form or drag and drop  
- Preview files after upload  
- Select X and Y axis for visualization  
- View charts in 2D and 3D formats  
- Generate AI-based insights  
- Download charts as PNG or PDF  
- Store files in Cloudinary  
- Manage uploaded files  
- Receive email on file upload  

### Admin
- View platform analytics  
- Manage users and files  
- Receive system notification emails  

---

## Tech Stack

| Category | Tools |
|--------|-------|
| Frontend | React, Redux, Tailwind CSS, shadcn/ui |
| Authentication | Firebase, JWT, Zod, Cookies |
| Backend | Node.js, Express.js, MongoDB Atlas |
| Emails | Nodemailer |
| Charts | Highcharts |
| Cloud | Cloudinary |
| AI | OpenAI API |

---

## Middleware

- `authMiddleware` validates JWT tokens  
- `adminMiddleware` restricts admin access  

---

## Project Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Coding1610/sheetviz
```

### Step 2: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 3: Environment Variables

#### Backend .env
```env
PORT=
CLOUD_NAME=
API_KEY=
API_SECRET=
DATABASE_URL=
FRONTEND_URL=
JWT_SECRET_KEY=
NODE_ENV=
EMAIL_USER=
EMAIL_PASS=
```

#### Frontend .env
```env
VITE_API_BASE_URL=
VITE_OPENAI_API_KEY=
VITE_FIREBASE_API_KEY=
```

## Dummy User
Email: dummyme00@gmail.com
Password: plokijuh00
