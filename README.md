# 📝 Notes App – Full Stack (Vite + React + Node.js + MongoDB)

This is a full-stack note-taking application that allows users to sign up or log in via email OTP or Google OAuth, create notes, and manage them securely. Built with:

- 🔧 Frontend: React + TypeScript + Vite + Tailwind CSS
- ⚙️ Backend: Node.js + Express + TypeScript + MongoDB
- 🔐 Auth: OTP via email + Google OAuth + JWT
- 📧 Email: Nodemailer (Gmail)

---


## 🔗 Live Links

🌐 Frontend (Vercel): [notes-app-frontend.vercel.app](https://notes-app-frontend-sandy.vercel.app/)

🔧 Backend (Render): [notes-app-backend.onrender.com](https://notes-app-backend-hs78.onrender.com)




## 📦 Project Structure

notes-app/
├── notes-app-backend/ # Express + TypeScript + MongoDB API
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── utils/
│ ├── middlewares/
│ └── server.ts
│
├── notes-app-frontend/ # React + Vite + Tailwind
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── main.tsx
│ └── index.html


---

## 🔐 Features

- ✅ OTP-based email login
- ✅ Google OAuth login
- ✅ JWT-based authentication
- ✅ Create, view, delete notes
- ✅ Tailwind responsive UI
- ✅ Protected routes
- ✅ MongoDB Atlas integration
- ✅ Hosted on Render + Vercel

---

## 🧑‍💻 Local Setup Instructions

### 1️⃣ Clone the Repos

```bash
git clone https://github.com/Abhi-1503/notes-app-frontend.git
git clone https://github.com/Abhi-1503/notes-app-backend.git
2️⃣ Environment Variables
🔐 Backend .env (inside notes-app-backend)
ini

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
💡 For Gmail, use App Passwords, not your actual password: How to get one

🌐 Frontend .env (inside notes-app-frontend)

VITE_API_BASE_URL=http://localhost:5000/api
3️⃣ Install Dependencies
Backend

cd notes-app-backend
npm install
Frontend

cd ../notes-app-frontend
npm install
4️⃣ Run Locally
🖥 Backend
bash
Copy
Edit
npm run dev
🌐 Frontend
bash
Copy
Edit
npm run dev
Then open: http://localhost:5173

🚀 Deployment Instructions
🔧 Backend on Render
Push notes-app-backend to GitHub.

Go to Render → New Web Service → Deploy from GitHub

Set:

Build Command: npm run build

Start Command: npm run start

Node Version: 20 (in package.json or Render settings)

Add .env variables from above

✅ Ensure MongoDB IP Whitelist is 0.0.0.0/0 or Render IP

🌐 Frontend on Vercel
Push notes-app-frontend to GitHub

Go to Vercel → New Project → Import GitHub Repo

Set:

Framework: Vite

Root Directory: notes-app-frontend

Build Command: npm run build

Output Directory: dist

Add frontend .env (use Render backend URL in VITE_API_BASE_URL)

📬 API Summary
🔐 Auth
Route	Method	Description
/send-otp	POST	Send OTP to email
/verify-otp	POST	Verify OTP & get JWT
/google-login	POST	Login via Google OAuth

📝 Notes
Route	Method	Description
/notes	GET	Fetch all user notes
/notes	POST	Create a new note
/notes/:id	DELETE	Delete a note by ID

All note routes require a Bearer token header.


📝 Dashboard
Create, view & delete notes securely

🛠 Common Errors
Error	Fix
MongoDB IP not whitelisted	Set IP whitelist to 0.0.0.0/0 in MongoDB Atlas
OTP not sending	Use Gmail App Password & correct MAIL_* config
CORS issues	Ensure CLIENT_URL matches Vercel URL in backend .env
React build error on Vercel	Add "allowSyntheticDefaultImports": true in tsconfig.json

👨‍💻 Author
👤 Abhi-1503 on GitHub

📜 License
MIT – Use freely with attribution


Happy to add more!




