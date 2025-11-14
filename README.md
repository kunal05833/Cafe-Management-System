# ☕ Cafe Management System

A modern, full-featured cafe management system built with React, Firebase, and Tailwind CSS.

## ✨ Features

### Customer Features
- 🏠 **Modern Home Page** - Beautiful landing page with animations
- 🍽️ **Menu Browsing** - View and search menu items by category
- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 📦 **Order Tracking** - Track order status in real-time
- 👤 **User Profile** - Manage account settings
- 💳 **Udhari System** - Credit management for regular customers
- 🌓 **Dark Mode** - Toggle between light and dark themes

### Admin Features
- 📊 **Dashboard** - Overview of sales, orders, and analytics
- 🍕 **Menu Management** - Add, edit, delete menu items
- 📋 **Order Management** - View and update order status
- 👥 **Customer Management** - Manage customer accounts
- 💰 **Udhari Management** - Track customer credit
- 📈 **Reports** - Sales and performance reports
- ⚙️ **Settings** - System configuration

## 🚀 Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Routing:** React Router v6

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/kunal05833/Cafe-Management-System.git
cd Cafe-Management-System
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Firebase:**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Copy your Firebase config
   - Update `src/firebase/config.js` with your credentials

4. **Run the development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

## 🔥 Firebase Configuration

Replace the config in `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 📁 Project Structure

```
cafe-management-system/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── common/
│   │   ├── customer/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── menu/
│   │   ├── orders/
│   │   ├── sheet/
│   │   ├── shell/
│   │   ├── udhari/
│   │   └── ui/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── hooks/
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   ├── BaseLayout.jsx
│   │   └── CustomerLayout.jsx
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── common/
│   │   └── customer/
│   ├── services/
│   │   └── api/
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Responsive Design** - Works on all devices (mobile-first)
- **Dark Mode** - Eye-friendly dark theme
- **Smooth Animations** - Framer Motion for fluid transitions
- **Glassmorphism** - Modern glass effect design
- **Gradient Accents** - Beautiful color gradients

## 🔐 Authentication

- Email/Password authentication
- Protected routes
- User role management (Customer/Admin)
- Password reset functionality

## 📱 Mobile Responsive

- Mobile-first design approach
- Touch-friendly interface
- Bottom navigation for mobile
- Responsive grid layouts

## 🌟 Key Highlights

- ⚡ **Fast & Efficient** - Built with Vite for lightning-fast development
- 🎯 **Type Safety** - Clean code structure
- 🔒 **Secure** - Firebase authentication and security rules
- 📊 **Real-time Updates** - Firestore real-time database
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 🚀 **Production Ready** - Optimized build for deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kunal**
- GitHub: [@kunal05833](https://github.com/kunal05833)

## 🙏 Acknowledgments

- React Team
- Firebase Team
- Tailwind CSS
- Framer Motion
- Lucide Icons

---

Made with ☕ and ❤️