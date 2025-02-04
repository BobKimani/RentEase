import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCtD3W7fzXRBMT7ZcRw0qH3L8xLUHeOG7A",
  authDomain: "rentease-dd8c1.firebaseapp.com",
  projectId: "rentease-dd8c1",
  storageBucket: "rentease-dd8c1.appspot.com", // Fixed incorrect domain
  messagingSenderId: "624039185683",
  appId: "1:624039185683:web:8b551bc3364c7f725cdee6",
  measurementId: "G-6TYERFQ243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

const signUpWithEmail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Email Sign-Up Error:", error);
  }
};

const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Email Sign-In Error:", error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { signInWithGoogle, signUpWithEmail, signInWithEmail, logout };
