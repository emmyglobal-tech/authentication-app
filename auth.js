import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendEmailVerification, sendPasswordResetEmail, updateProfile, signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const clearErrors = () => {
  document.querySelectorAll('.field-error, .field-success').forEach(el => el.textContent = "");
};

const setFieldError = (id, msg, isSuccess = false) => {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.className = isSuccess ? "field-success" : "field-error";
  }
};

export const startSignup = async (email, username, password, confirmPassword) => {
  clearErrors();
  if (password !== confirmPassword) {
    setFieldError("confirmError", "Passwords do not match!");
    return;
  }
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: username });
    await sendEmailVerification(userCred.user);
    await setDoc(doc(db, "users", userCred.user.uid), {
      username, email, uid: userCred.user.uid, role: "user", createdAt: serverTimestamp()
    });
    setFieldError("confirmError", "Link sent! Please verify your email.", true);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      setFieldError("emailError", "This email is already registered.");
    } else {
      setFieldError("emailError", "Registration failed. Try again.");
    }
  }
};

export const loginUser = async (email, password) => {
  clearErrors();
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    if (userCred.user.emailVerified) {
      window.location.href = "dashboard.html";
    } else {
      setFieldError("passwordError", "Please verify your email link first.");
      await signOut(auth);
    }
  } catch (err) {
    setFieldError("passwordError", "Invalid email or password.");
  }
};

export const resetUserPassword = async (email) => {
  clearErrors();
  if (!email) {
    setFieldError("emailError", "Enter your email address first!");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    setFieldError("emailError", "Password reset link sent check your email (spam)!", true);
  } catch (err) {
    setFieldError("emailError", "Error sending reset link.");
  }
};

export const logoutUser = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};