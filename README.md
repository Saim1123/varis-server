# 🌱 Varis Donation Platform - Backend API

A secure and scalable backend for the Varis Donation Platform, built with Node.js, Express, TypeScript, and MongoDB. This API powers donation management, user authentication, project tracking, and payment processing.

## 🚀 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing
- **Package Manager**: pnpm

## 📌 Features

### 👤 User Management
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)
- Protected routes with middleware

### 🌍 Project Management
- Create and manage donation projects
- Fetch all active projects
- Get detailed project information
- Admin controls for project CRUD operations

### 💳 Donation System
- Support for guest and authenticated donations
- Transaction tracking and history
- Multiple payment method support
- Donation statistics and analytics

### 🔒 Security
- Password hashing with bcrypt
- JWT token authentication
- Protected admin routes
- CORS enabled for cross-origin requests

## � ProjecSt Structure

```
src/
├── config/          # Configuration files (DB, environment)
├── controllers/     # Request handlers
├── middlewares/     # Auth and admin middleware
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── services/        # Business logic layer
├── types/           # TypeScript type definitions
└── index.ts         # Application entry point
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- pnpm package manager

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd server
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=4000
HOST=localhost
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/varis
JWT_SECRET=your-super-secret-jwt-key
USERNAME=your-db-username
PASSWORD=your-db-password
```

4. **Start the development server**
```bash
pnpm dev
```

5. **Start the production server**
```bash
pnpm start
```

## 🔌 API Endpoints

### Health Check
```
GET /health
```

### User Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)

### Project Routes (`/api/projects`)
- `GET /` - Get all projects
- `GET /:id` - Get project by ID
- `POST /` - Create project (admin only)
- `PUT /:id` - Update project (admin only)
- `DELETE /:id` - Delete project (admin only)

### Donation Routes (`/api/donations`)
- `POST /` - Create donation
- `GET /` - Get all donations (admin only)
- `GET /user/:userId` - Get user donations
- `GET /project/:projectId` - Get project donations

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🧪 Testing the API

You can test the API using tools like:
- Postman
- Thunder Client
- cURL
- Insomnia

Example health check:
```bash
curl http://localhost:4000/health
```

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Render
- Railway
- Heroku
- AWS
- DigitalOcean

Make sure to set all environment variables in your deployment platform.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 4000) |
| `HOST` | Server host | No (default: localhost) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `DATABASE_URL` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT | Yes |
| `USERNAME` | Database username | Optional |
| `PASSWORD` | Database password | Optional |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

ISC

## 👨‍💻 Author

Built with ❤️ for the Varis Donation Platform