# 🏠 EstateHub - Real Estate Web Application

EstateHub is a full-stack real estate web application that allows users to explore, list, and manage properties easily. It provides a smooth and responsive user experience with secure authentication and a modern UI.

---

## 🌐 Live Demo

- 🔗 Frontend: https://your-frontend.vercel.app
- 🔗 Backend: https://your-backend.onrender.com

---

## 🚀 Features

- 🔐 User Authentication (Signup, Login, Google OAuth)
- 🏡 Add Property with Image Upload (Cloudinary)
- 📋 Browse & Filter Properties
- 👤 User Profile Management
- 🏠 Manage Your Own Listings
- ❌ Delete Properties
- 🌗 Dark Mode Support
- ⚡ Responsive UI

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Redux Toolkit
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### Other Tools

- Cloudinary (Image Storage)
- Firebase (Google Auth)
- JWT (Authentication)
- Multer (File Upload)

---

## 📂 Project Structure

```
estatehub/
│
├── frontend/        # React application
├── backend/         # Express server & APIs
└── README.md
```

---

## ⚙️ Environment Variables

### 🔹 Frontend (.env)

```env
VITE_API_URL=
```

### 🔹 Frontend (.env.production)

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

### 🔹 Backend (.env)

```env
MONGODB_URL=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_name
CLOUDNAIRY_API=your_api_key
CLOUDNAIRY_SECRET=your_secret
```

---

## 🧪 Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/estatehub.git
cd estatehub
```

---

### 2️⃣ Install dependencies

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Open in browser

```
http://localhost:5173
```

---

## 🌐 Deployment

- Frontend → Vercel
- Backend → Render

### Important Notes

- Enable CORS in backend
- Always use:

```js
credentials: "include";
```

- Cookie setup:

```js
httpOnly: true;
secure: true;
sameSite: "none";
```

---

## 📌 Future Improvements

- 🔍 Location-based search
- 💬 Chat system between users
- 📊 Property analytics dashboard
- 📱 Mobile app version

---

## 🙋‍♂️ About Me

I am a passionate developer who enjoys building real-world applications and learning by doing. This project helped me gain hands-on experience in full-stack development, authentication, and deployment.

---

## ⭐ Acknowledgement

This project is part of my learning journey and reflects my effort to build practical applications and improve my development skills.

---

## 📬 Contact

Feel free to reach out for feedback or collaboration.

---

✨ Thank you for checking out EstateHub!
