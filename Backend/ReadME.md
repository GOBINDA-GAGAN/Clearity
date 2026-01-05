# 🚀 Backend Project Structure & Routing Documentation

This document explains the complete **backend architecture**, **folder structure**, and **API routing** for Clearity.

---

## 🏗️ Project Structure

backend/
│── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── logger.js          # Winston logger config
│   │   └── env.js             # Environment variable loader
│   │
│   ├── controllers/
│   │   ├── auth.controller.js      # Register, Login, Logout
│   │   ├── user.controller.js      # CRUD User
│   │   └── blog.controller.js      # CRUD Blog + Like/Comment
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── error.middleware.js     # Global error handler
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── blog.model.js
│   │   └── comment.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── blog.routes.js
│   │   └── comment.routes.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── slugify.js
│   │
│   ├── app.js       # Express app
│   └── server.js    # Start/Stop server + graceful shutdown
│
│── .env
│── package.json
│── README.md


---

# 🛣️ API Routing Overview

This backend exposes multiple REST API endpoints for **authentication**, **user management**, **blogs**, **likes**, and **comments**.

---

## 🔐 Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout current user |
| GET | `/me` | Get current authenticated user |
| PUT | `/me` | Update current user |
| DELETE | `/me` | Delete current user |

---

## 👤 User Routes — `/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all users |
| GET | `/:id` | Get user by ID |
| DELETE | `/:id` | Delete user by ID |

---

## 📝 Blog Routes — `/api/blogs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new blog |
| GET | `/` | Get all blogs |
| GET | `/user/:userId` | Get blogs created by a specific user |
| GET | `/slug/:slug` | Get blog by slug |
| PUT | `/:id` | Update a blog |
| DELETE | `/:id` | Delete a blog |
| POST | `/like/:id` | Like a blog |
| POST | `/unlike/:id` | Unlike a blog |

---

## 💬 Comment Routes — `/api/comments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/:blogId` | Create a comment |
| GET | `/:blogId` | Get all comments for a blog |
| DELETE | `/:commentId` | Delete a comment |

----





