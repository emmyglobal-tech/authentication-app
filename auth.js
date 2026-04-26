import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendEmailVerification, sendPasswordResetEmail, updateProfile, signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const showError = (msg, color = "#f43f5e") => {
  const display = document.getElementById("errorMessage");
  if (display) {
    display.style.color = color;
    display.textContent = msg;
    setTimeout(() => { display.textContent = ""; }, 6000);
  }
};

export const startSignup = async (email, username, password, confirmPassword) => {
  if (password !== confirmPassword) {
    showError("Passwords do not match!");
    return;
  }
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: username });
    await sendEmailVerification(userCred.user);

    await setDoc(doc(db, "users", userCred.user.uid), {
      username, email, uid: userCred.user.uid, 
      role: "user", createdAt: serverTimestamp()
    });

    showError("Link sent! Please verify your email.", "#10b981");
    setTimeout(() => { window.location.href = "login.html"; }, 3000);
  } catch (err) { showError(err.message); }
};

export const loginUser = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    if (userCred.user.emailVerified) {
      window.location.href = "dashboard.html";
    } else {
      showError("Please verify your email link first.");
      await signOut(auth);
    }
  } catch (err) { showError(err.message); }
};

export const resetUserPassword = async (email) => {
  if (!email) return showError("Enter your email address first!");
  try {
    await sendPasswordResetEmail(auth, email);
    showError("Password reset link sent!", "#10b981");
  } catch (err) { showError(err.message); }
};

export const logoutUser = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};