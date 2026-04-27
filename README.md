# authentication-app

# FIREBASE-SYSTEM-APP (TrustChain)

A secure, professional-grade Fintech Authentication System and Admin Control Terminal.

## 🚀 Features

- **Vanity Error Handling**: All Firebase technical errors are caught and re-written into clean, professional inline messages under specific inputs.
- **Preloader Transition**: Smooth CSS animations during authentication state changes.
- **Security-First Redirects**: Automatic session checking on every page to prevent unauthorized access.
- **Admin Terminal**: Full user management including Password Resets, Account Disabling, and Deletion via a dedicated sidebar dashboard.
- **Mobile Responsive**: Neumorphic card-based design optimized for professional mobile apps.

## 📂 File Structure

- `index.html`: The main login portal.
- `signup.html`: User registration with password matching.
- `dashboard.html`: The user "Vault" showing account balances.
- `admin.html`: The administrative control center.
- `auth.js`: Modular authentication functions (Login, Signup, Reset, Logout).
- `firebase.js`: Firebase SDK initialization.
- `style.css`: Global design system and preloader styles.
- `admin-style.css`: Sidebar and table management styles for the Admin.

## 🛠 Setup

1. Update `firebase.js` with your specific API keys and project IDs.
2. Ensure Firestore has a `users` collection.
3. The Admin account is hardcoded to: `emmanuelglobal101@gmail.com`.

## 🔒 Security Note
This system uses **Inline Errors**. It is designed to never show an `alert()` box on mobile, keeping the UI clean and accessible.