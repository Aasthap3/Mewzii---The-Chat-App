# Mewzii Chat App - Backend

A robust Node.js backend API for the Mewzii chat application with authentication, user management, and file uploads.

## 🚀 Features

- **RESTful API**: Well-structured REST endpoints
- **Authentication**: JWT-based auth with Google OAuth support
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for profile pictures
- **Security**: Password hashing with bcrypt
- **Validation**: Input validation and error handling
- **CORS**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt, Google OAuth
- **File Storage**: Cloudinary
- **Validation**: Built-in validation with Mongoose
- **Environment**: dotenv for configuration

## 📦 Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=4500
MONGODB_URI=mongodb://localhost:27017/mewzii-chat
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── database.js
│   ├── controller/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── model/
│   │   └── userModel.js
│   ├── router/
│   │   ├── authRouter.js
│   │   └── userRouter.js
│   ├── utils/
│   │   └── auth.js
│   └── app.js
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes
```
POST /auth/register        - User registration
POST /auth/login          - User login
POST /auth/googleLogin    - Google OAuth login
GET  /auth/logout         - User logout
DELETE /auth/delete/:id   - Delete user account
```

### User Routes
```
GET /user/getAllUsers     - Get all users (excluding current user)
GET /user/getCurrentUser/:id - Get specific user details
```

## 📊 Database Schema

### User Model
```javascript
{
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return this.type !== 'googleUser'; } },
  profilePicture: { type: String, default: "" },
  googleId: { type: String },
  type: { type: String, enum: ["googleUser", "normalUser"], default: "normalUser" },
  status: { type: String, enum: ["Active", "Inactive", "Suspended"], default: "Active" },
  role: { type: String, enum: ["User", "Admin"], default: "User" }
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint (if configured)

## 🔒 Authentication Flow

### Local Authentication
1. User registers with email, username, password
2. Password is hashed using bcrypt
3. User can login with email/username and password
4. JWT token is generated and stored in HTTP-only cookie

### Google OAuth Flow
1. Frontend sends Google user data to `/auth/googleLogin`
2. Backend checks if user exists
3. If new user: creates account with Google profile data
4. If existing user: updates account type or verifies Google ID
5. JWT token is generated and stored in HTTP-only cookie

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Centralized error handling middleware
- **CORS**: Configured for cross-origin requests

## 🌐 Middleware

### Authentication Middleware
- Verifies JWT tokens
- Attaches user data to request object
- Protects private routes

### Error Handling Middleware
- Centralized error processing
- Consistent error response format
- Development vs production error details

## ☁️ Cloudinary Integration

Profile pictures are uploaded to Cloudinary:
- Automatic image optimization
- Multiple format support
- CDN delivery
- Fallback to placeholder images

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
PORT=4500
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mewzii-chat

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:5173
```

## 🚀 Deployment

### Production Setup
1. Set environment variables for production
2. Configure MongoDB Atlas or production database
3. Set up Cloudinary account
4. Deploy to hosting service (Render, Railway, etc.)

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4500
CMD ["npm", "start"]
```

## 📈 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error description",
  "statusCode": 400
}
```

## 🧪 Testing

### Manual Testing with curl
```bash
# Register user
curl -X POST http://localhost:4500/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","fullname":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:4500/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrUsername":"test@example.com","password":"password123"}'
```

## 🔄 Future Enhancements

- [ ] Socket.io integration for real-time messaging
- [ ] Message model and CRUD operations
- [ ] File attachment support
- [ ] User status (online/offline)
- [ ] Message encryption
- [ ] Rate limiting
- [ ] API documentation with Swagger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
