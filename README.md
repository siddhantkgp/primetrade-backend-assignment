# Backend Developer Assignment - REST API with RBAC

## Overview

This project implements a scalable REST API with authentication and role-based access control (RBAC), along with a minimal Next.js frontend to interact with the APIs.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt (password hashing)

### Frontend

* Next.js
* Axios

---

## Project Structure

```
repo/
├── backend/
├── frontend/
├── postman/
├── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/siddhantkgp/primetrade-backend-assignment.git
cd primetrade-backend-assignment
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=4000
DATABASE_URL=postgresql://username:password@localhost:5432/assignment_db
JWT_SECRET=your_secret
```

Run backend:

```bash
nodemon server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Database Setup

Create database:

```sql
CREATE DATABASE assignment_db;
```

Run the following SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Admin Setup

To test admin functionality:

1. Register a normal user using API
2. Promote the user to admin:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Now login as this user to access admin-level features.

---

## 📊 Database Schema

### Users Table

| Column      | Type        | Description              |
|------------|------------|--------------------------|
| id         | UUID / INT | Primary Key              |
| name       | TEXT       | User's name              |
| email      | TEXT       | User email               |
| password   | TEXT       | Hashed password          |
| role       | TEXT       | user / admin             |
| created_at | TIMESTAMP  | Account creation time    |

---

### Tasks Table

| Column      | Type        | Description              |
|------------|------------|--------------------------|
| id         | UUID / INT | Primary Key              |
| title      | TEXT       | Task title               |
| description| TEXT       | Task details             |
| status     | TEXT       | pending / completed      |
| user_id    | UUID / INT | Foreign key (Users)      |
| created_at | TIMESTAMP  | Task creation time       |

---

## Authentication APIs

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register user |
| POST   | /api/v1/auth/login    | Login user    |

---

## Task APIs

| Method | Endpoint          | Description                       |
| ------ | ----------------- | --------------------------------- |
| POST   | /api/v1/tasks     | Create task                       |
| GET    | /api/v1/tasks     | Get tasks (user: own, admin: all) |
| GET    | /api/v1/tasks/:id | Get single task                   |
| PUT    | /api/v1/tasks/:id | Update task                       |
| DELETE | /api/v1/tasks/:id | Delete task                       |

---

## Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Role-based access control (user/admin)
* Users can only access their own tasks
* Admin can access all tasks
* Input validation and error handling

---

## API Testing (Postman)

A Postman collection is included in the `/postman` folder.

Steps:

1. Import collection into Postman
2. Run Login API
3. Token will be auto-stored
4. Use other endpoints

Authorization header:

```
Authorization: Bearer <token>
```

---

## Frontend Features

* User registration & login
* JWT-based authentication
* Protected dashboard
* Task CRUD operations
* Admin can view all tasks
* Error and success handling

---

## Screenshots

### Landing

![Landing Page](frontend/assets/screenshots/landing.png)

---

### Authentication

| Register | Login |
|----------|-------|
| ![Register](frontend/assets/screenshots/register.png) | ![Login](frontend/assets/screenshots/login.png) |

---

### Dashboard

| User Dashboard | Admin Dashboard |
|----------------|-----------------|
| ![User Dashboard](frontend/assets/screenshots/user-dashboard.png) | ![Admin Dashboard](frontend/assets/screenshots/admin-dashboard.png) |

---

## Scalability Note

The backend follows a modular architecture (controllers, routes, models, middleware), making it easy to scale.

Possible improvements:

* Microservices architecture
* Load balancing (NGINX)
* Caching (Redis)
* Database indexing
* Containerization (Docker)

---

## 👨‍💻 Author

**Siddhant Chasta**
