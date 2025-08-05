# Mewzii - The Chat App 💬

A modern, full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features responsive design, Google OAuth integration, and a sleek user interface.

![Chat App Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Mewzii+Chat+App)

## 🌟 Features

### 🎨 Frontend Features
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and DaisyUI
- **Responsive Chat Interface**: Mobile-first design with collapsible sidebar
- **Authentication**: Email/username login and Google OAuth integration
- **Theme Support**: Multiple theme options with DaisyUI
- **Real-time Interface**: Interactive chat with message bubbles and timestamps
- **User Management**: Profile pages, user search, and contact management
- **Error Handling**: Comprehensive error handling with toast notifications

### ⚡ Backend Features
- **RESTful API**: Well-structured REST endpoints
- **JWT Authentication**: Secure token-based authentication
- **Google OAuth**: Seamless Google login integration
- **File Upload**: Cloudinary integration for profile pictures
- **Database**: MongoDB with Mongoose ODM
- **Security**: Password hashing, input validation, and error handling

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt, Google OAuth
- **File Storage**: Cloudinary
- **Validation**: Mongoose schema validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aasthap3/Mewzii---The-Chat-App.git
cd Mewzii---The-Chat-App
```

2. **Backend Setup**
```bash
cd server
npm install
cp .env.example .env
# Configure environment variables in .env
npm run dev
```

3. **Frontend Setup**
```bash
cd ../client
npm install
cp .env.example .env
# Configure environment variables in .env
npm run dev
```

4. **Environment Configuration**

Create `.env` files in both `server` and `client` directories:

**Server (.env)**
```env
PORT=4500
MONGODB_URI=mongodb://localhost:27017/mewzii-chat
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Client (.env)**
```env
VITE_API_BASE_URL=http://localhost:4500
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 📁 Project Structure

```
Mewzii - The Chat App/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── config/         # Configuration files
│   │   └── assets/         # Static assets
│   ├── public/
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── src/
│   │   ├── controller/     # Route controllers
│   │   ├── model/          # Database models
│   │   ├── router/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/googleLogin` - Google OAuth login
- `GET /auth/logout` - User logout

### Users
- `GET /user/getAllUsers` - Get all users
- `GET /user/getCurrentUser/:id` - Get specific user

## 📱 Screenshots

### Desktop View
![Desktop Chat Interface](https://via.placeholder.com/800x500/6366F1/FFFFFF?text=Desktop+Chat+Interface)

### Mobile View
![Mobile Chat Interface](https://via.placeholder.com/400x700/8B5CF6/FFFFFF?text=Mobile+Chat+Interface)

## 🎯 Key Features Breakdown

### Responsive Design
- **Desktop**: Fixed sidebar with chat area
- **Tablet**: Responsive layout adaptation
- **Mobile**: Collapsible drawer with menu button overlay

### Authentication Flow
1. **Local Auth**: Email/username and password
2. **Google OAuth**: One-click Google login
3. **JWT Tokens**: Secure session management
4. **Protected Routes**: Authentication-based navigation

### User Interface
- **Modern Components**: DaisyUI component library
- **Theme System**: Multiple color themes
- **Toast Notifications**: User feedback system
- **Loading States**: Smooth user experience

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: HTTP-only cookies
- **Input Validation**: Client and server-side validation
- **Error Handling**: Centralized error management
- **CORS Configuration**: Secure cross-origin requests

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend Deployment (Render/Railway)
```bash
cd server
# Set environment variables in hosting platform
# Deploy with start script
```

### Environment Variables for Production
- Set all required environment variables
- Use production MongoDB URI
- Configure CORS for production frontend URL
- Set secure JWT secret

## 🧪 Development

### Running in Development
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Available Scripts

**Frontend**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔮 Future Enhancements

- [ ] **Real-time Messaging**: Socket.io integration
- [ ] **File Sharing**: Document and media sharing
- [ ] **Group Chats**: Multi-user conversations
- [ ] **Message Encryption**: End-to-end encryption
- [ ] **Voice/Video Calls**: WebRTC integration
- [ ] **Push Notifications**: Real-time notifications
- [ ] **Message Search**: Full-text search functionality
- [ ] **Dark/Light Themes**: Enhanced theme system

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📞 Support

If you encounter any issues or have questions:

- **Create an Issue**: [GitHub Issues](https://github.com/Aasthap3/Mewzii---The-Chat-App/issues)
- **Discussion**: [GitHub Discussions](https://github.com/Aasthap3/Mewzii---The-Chat-App/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **DaisyUI** for beautiful UI components
- **MongoDB** for the flexible database
- **Cloudinary** for image storage and optimization

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Aasthap3">Aasthap3</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
