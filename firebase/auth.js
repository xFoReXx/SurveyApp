// firebase/auth.js
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    updateEmail,
    updatePassword,
    signOut
  } from 'firebase/auth';
  import { auth } from './firebase';
  
  // Email/Password authentication
  export const signUpWithEmail = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const loginWithEmail = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  // Google authentication
  export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  // Update user profile
  export const changeEmail = async (newEmail) => {
    const user = auth.currentUser;
    if (user) {
      return updateEmail(user, newEmail);
    }
    throw new Error('No user is signed in');
  };
  
  export const changePassword = async (newPassword) => {
    const user = auth.currentUser;
    if (user) {
      return updatePassword(user, newPassword);
    }
    throw new Error('No user is signed in');
  };
  
  export const logoutUser = async () => {
    return signOut(auth);
  };