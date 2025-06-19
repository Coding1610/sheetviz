# 📊 SheetViz – Visualize Excel Data with Ease

Welcome to **SheetViz**, a powerful MERN-based web application that lets users upload `.xlsx`, `.csv`, or `.xls` files to visualize data using beautiful 2D and 3D charts, with AI-generated insights! Built for both regular users and admins, this app provides a seamless data interaction experience.

---

<img className="flex justify-center items-center" src='./Screenshots/landing page.png' />
<img className="flex justify-center items-center" src='./Screenshots/sign-up page.png' />
<img className="flex justify-center items-center" src='./Screenshots/user dashboard 1.png' />
<img className="flex justify-center items-center" src='./Screenshots/user file history.png' />
<img className="flex justify-center items-center" src='./Screenshots/delete file dialog box.png' />
<img className="flex justify-center items-center" src='./Screenshots/file upload form.png' />
<img className="flex justify-center items-center" src='./Screenshots/2d & 3d charts.png' />
<img className="flex justify-center items-center" src='./Screenshots/download chart as png & pdf.png' />
<img className="flex justify-center items-center" src='./Screenshots/file insights (OPEN AI).png' />
<img className="flex justify-center items-center" src='./Screenshots/admin dashboard.png' />
<img className="flex justify-center items-center" src='./Screenshots/uploaded all users files.png' />
<img className="flex justify-center items-center" src='./Screenshots/delete user dialog box.png' />
<img className="flex justify-center items-center" src='./Screenshots/email - welcome.png' />
<img className="flex justify-center items-center" src='./Screenshots/email - file uploaded.png' />
<img className="flex justify-center items-center" src='./Screenshots/email - account deleted.png' />
<img className="flex justify-center items-center" src='./Screenshots/email - file deleted.png' />

--- 

## ✨ Features

### 🌐 Landing Page
- Hero section with Sign Up & Sign In buttons
- Feature highlight cards
- Developer profile section

### 👤 Authentication
- 🔐 JWT-based login system
- 🧠 Zod for form validation
- ☁️ Google Sign-in via Firebase
- 🍪 Cookie-based session (7 days)

---

## 👥 Roles & Dashboards

### 👤 Normal User
- 📂 Upload `.xlsx`, `.csv`, `.xls` files via form or drag & drop
- 👁️ File preview post-upload
- 📈 Select X & Y axis to visualize charts
- 📊 2D & 3D Charts:
  - Line, Bar, Donut, Pie
  - 3D Bar, 3D Pie, 3D Donut
- 🧠 AI-Generated Insights & Chart Summary
- 📥 Download charts as PNG or PDF
- ☁️ Upload file to Cloudinary
- 📋 View Uploaded Files (Preview / Download / Delete)
- 🗂️ Empty state page when no files exist
- 🧑‍💼 Manage personal profile
- 📧 Email Notifications
  - File uploaded to cloud email

### 🛡️ Admin
- 📊 Admin Dashboard Cards:
  - Total Users
  - Total Files
  - Total File Storage
  - Total Cloudinary Storage
- 👥 Manage all registered users (View/Delete)
- 📂 Manage all uploaded files by users (View/Delete)
- 📧 Email Notifications
  - Welcome email on registration
  - User deletion email
  - File deletion email

---

## 🧰 Tech Stack

| Category       | Tools / Frameworks |
|----------------|--------------------|
| **Frontend**   | React, Redux, Tailwind CSS, shadcn/ui |
| **Auth**       | Firebase (Google OAuth), JWT, Zod, Cookies |
| **Backend**    | Node.js, Express.js, MongoDB Atlas |
| **Emails**     | Nodemailer |
| **Charts**     | Highcharts (2D & 3D) |
| **Cloud**      | Cloudinary |
| **AI Insights**| OpenAI API or custom ML logic |

---

## 🔐 Middleware

- `authMiddleware` – Secures protected routes and validates JWT
- `adminMiddleware` – Ensures admin-only access to sensitive endpoints

---

## 👤 Dummy User

- Email : jaiminunagar26@gmail.com
- Password : plokijuh26
