import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access-token') || null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // ✅ Create user with email & password
  const createNewUser = async (email, password, name, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
      });
      return userCredential;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  };

  //  Login with email/password
  const userLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;
      await handleJWT(loggedUser.email); // Get custom token
      setUser(loggedUser);
      return userCredential;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Login with Google
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;

      // Optional: Save user to DB
      await axios.post('https://assignment-12-server-psi-jade.vercel.app/users', {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
      });

      await handleJWT(loggedUser.email);
      setUser(loggedUser);
      return result;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  //  Get custom JWT and store it
  const handleJWT = async (email) => {
    try {
      const res = await axios.post('https://assignment-12-server-psi-jade.vercel.app/jwt', {
        email: email.toLowerCase().trim(),
      });
      const jwtToken = res.data.token;
      localStorage.setItem('access-token', jwtToken);
      setToken(jwtToken);
    } catch (error) {
      console.error("JWT Error:", error);
    }
  };

  // Logout
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem('access-token');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser(currentUser);
        // token is already handled during login
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Context value
  const info = {
    user,
    token,
    loading,
    setUser,
    logOut,
    userLogin,
    createNewUser,
    handleGoogle,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
