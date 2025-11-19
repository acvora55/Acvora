import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // ✅ import Firestore too
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null); // 🔹 Firestore profile
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch student profile from Firestore
  const fetchStudentProfile = async (uid) => {
    try {
      const docRef = doc(db, "students", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudentProfile(docSnap.data());
      } else {
        setStudentProfile(null);
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  // Track Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchStudentProfile(user.uid);
      } else {
        setStudentProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Signup → Create Auth user + Firestore profile
  const signup = async (email, password, name, extraData = {}) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(result.user, { displayName: name });
    }

    // 🔹 Save extra profile data in Firestore
    await setDoc(doc(db, "students", result.user.uid), {
      uid: result.user.uid,
      name: name || name.split("@")[0],
      email,
      ...extraData, // { course, year, etc. }
    });

    setCurrentUser(result.user);
    setStudentProfile({ uid: result.user.uid, name, email, ...extraData });

    return result.user;
  };

  // Login
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await fetchStudentProfile(result.user.uid); // 🔹 load Firestore profile
    return result.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setStudentProfile(null);
  };

  const value = {
    currentUser,
    studentProfile, // 🔹 available everywhere
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};