# Mewzii Chat App - Frontend

A modern, responsive chat application frontend built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and DaisyUI components
- **Authentication**: Email/username login, Google OAuth integration
- **Responsive Design**: Mobile-first approach with sidebar drawer on mobile devices
- **Real-time Chat Interface**: Interactive chat with message bubbles and timestamps
- **User Management**: Profile pages, user search, and contact management
- **Theme Support**: Multiple theme options with DaisyUI
- **Error Handling**: Comprehensive error handling with toast notifications

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## 📦 Installation

1. Navigate to the client directory:
```bash
cd client
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
VITE_API_BASE_URL=http://localhost:4500
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ChatPage.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileActions.jsx
│   │   ├── ProfileBio.jsx
│   │   ├── ProfileHeader.jsx
│   │   ├── ProfileSettings.jsx
│   │   └── UserReviews.jsx
│   ├── config/
│   │   └── api.js
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── ChatInterface.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── UserProfilePage.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

### Authentication
- **LoginPage**: Email/username and Google OAuth login
- **RegisterPage**: User registration with validation
- **AuthContext**: Global authentication state management

### Chat Interface
- **ChatInterface**: Main chat layout with responsive sidebar
- **ChatPage**: Individual chat conversations with messages
- **Responsive Design**: Mobile drawer, desktop sidebar

### User Interface
- **HomePage**: Landing page with hero, features, and reviews
- **UserProfilePage**: Modular profile with separate components
- **Navbar**: Theme switching and navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Features Breakdown

### Responsive Chat Interface
- Desktop: Fixed sidebar with chat area
- Mobile: Collapsible drawer with menu button
- Overlay: Click outside to close sidebar

### User Authentication
- Local authentication with email/username
- Google OAuth integration
- Protected routes and session management

### Modern UI Components
- DaisyUI component library
- Tailwind CSS utility classes
- Responsive design patterns
- Toast notifications for user feedback

## 🌐 API Integration

The frontend communicates with the backend API through:
- Axios HTTP client
- Centralized API configuration
- Authentication headers
- Error handling middleware

## 🔒 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:4500
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (drawer sidebar)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (fixed sidebar)

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service:
   - Vercel
   - Netlify
   - GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
