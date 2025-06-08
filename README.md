# Library Portal

A full-stack web application for managing a local library system. Users can browse books, register/login, borrow books, and manage their borrowed books.

---

## Features

- User authentication (register/login/logout)
- Browse and filter books by genre, author, rating
- View detailed book information
- Borrow books (with borrow limit and availability check)
- View and manage user's borrowed books

---

## Tech Stack

- Frontend: React, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (Atlas)
- Authentication: JWT (JSON Web Tokens)

---

## Environment Variables

Create a `.env` file in the backend root with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


For frontend (using Vite), create `.env` file:
VITE_API_URL=http://localhost:5000/api

## Setup Instructions

### Backend

1. Navigate to the `backend` folder:
cd backend
Install dependencies:

npm install
Run the backend server:
npm start

## Frontend
Navigate to the frontend folder:

cd frontend
Install dependencies:
npm install
Run the frontend app:
npm run dev
