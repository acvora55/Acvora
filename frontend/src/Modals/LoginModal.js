// src/Modals/LoginModal.js
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function StudentLogin({ onLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const withUiState = async (fn) => {
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      await fn();
    } catch (e) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrCreateStudentProfile = async (user) => {
    const { uid, email: userEmail, displayName, photoURL, providerData } = user;
    const docRef = doc(db, "students", uid);
    const snap = await getDoc(docRef);

    let providerId = "custom";
    if (Array.isArray(providerData) && providerData.length > 0) {
      const nonPassword = providerData.find(
        (p) => p.providerId && p.providerId !== "password"
      );
      providerId =
        nonPassword?.providerId || providerData[0].providerId || "custom";
    } else if (user.providerId) {
      providerId = user.providerId;
    } else if (userEmail) {
      providerId = "password";
    }

    if (snap.exists()) {
      const profile = snap.data();
      await setDoc(
        docRef,
        { lastLoginAt: serverTimestamp(), authProvider: providerId },
        { merge: true }
      );
      onLogin({ ...profile });
      return profile;
    }

    const fallbackName =
      (displayName && displayName.trim()) ||
      (userEmail ? userEmail.split("@")[0] : "Student");

    const newProfile = {
      uid,
      name: fallbackName,
      email: userEmail || "",
      phone: "",
      address: "",
      pincode: "",
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      authProvider: providerId,
    };

    await setDoc(docRef, newProfile, { merge: true });
    onLogin(newProfile);
    return newProfile;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    withUiState(async () => {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await fetchOrCreateStudentProfile(user);
      navigate("/");
    });
  };

  const handleGoogleLogin = () =>
    withUiState(async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await fetchOrCreateStudentProfile(result.user);
      navigate("/");
    });

  const handleFacebookLogin = () =>
    withUiState(async () => {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await fetchOrCreateStudentProfile(result.user);
      navigate("/");
    });

  const handleLinkedInClick = () => {
    setErr("LinkedIn login must be implemented via Firebase Custom Auth.");
  };

  const handleForgotPassword = () =>
    withUiState(async () => {
      if (!email) {
        throw new Error("Enter your email above to receive a reset link.");
      }
      await sendPasswordResetEmail(auth, email);
      setInfo(
        "Password reset email sent. Check your inbox (and spam) for instructions."
      );
    });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#2d351f] via-[#353623] to-[#1a1c27] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-[rgb(36,39,49,0.8)] border border-white/10 text-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-white/70 mt-1">
              Sign in to continue to your student dashboard
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {err && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
                {err}
              </div>
            )}
            {info && (
              <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 px-3 py-2 text-sm">
                {info}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-[#2b2f3a] placeholder-white/40 text-white border border-white/10 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400/50 transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white/80">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs text-yellow-500 hover:text-yellow-600 underline-offset-2 hover:underline"
                    disabled={loading}
                  >
                    {showPassword ? "Hide password" : "Show password"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-[#2b2f3a] placeholder-white/40 text-white border border-white/10 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400/50 transition"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-white/40">Need help?</div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-yellow-500 hover:text-yellow-600 underline-offset-2 hover:underline disabled:opacity-60"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 disabled:opacity-70 disabled:cursor-not-allowed text-white py-2.5 rounded-lg hover:bg-yellow-600 transition font-medium shadow-lg shadow-yellow-900/30"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-white/50">or continue with</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full group bg-gray-800 text-white py-2.5 rounded-lg hover:bg-yellow-500 transition border border-white/20 flex items-center justify-center gap-2 font-medium"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                disabled={loading}
                className="w-full group bg-gray-800 text-white py-2.5 rounded-lg hover:bg-yellow-500 transition border border-white/10 flex items-center justify-center gap-2 font-medium"
              >
                <FacebookIcon />
                Continue with Facebook
              </button>
              <button
                onClick={handleLinkedInClick}
                disabled={loading}
                className="w-full group bg-gray-800 text-white py-2.5 rounded-lg hover:bg-yellow-500 transition border border-white/10 flex items-center justify-center gap-2 font-medium"
              >
                <LinkedInIcon />
                Continue with LinkedIn
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-4">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
    </>
  );
}

/* Icons */
function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M488 261.8c0-17.9-1.6-35.1-4.6-51.8H249v98.1h135.6c-5.8 31.2-23.2 57.6-49.4 75.4v62h79.8c46.7-43 73.8-106.3 73.8-183.7z"/>
    <path fill="#34A853" d="M249 512c66.6 0 122.4-22.1 163.2-59.9l-79.8-62c-22.1 14.9-50.3 23.7-83.4 23.7-64 0-118.3-43.2-137.6-101.2H29.1v63.6C69.9 457.7 152.2 512 249 512z"/>
    <path fill="#FBBC05" d="M111.4 312.6c-4.8-14.9-7.6-30.7-7.6-47s2.8-32.1 7.6-47V155.9H29.1C10.6 193.3 0 235.4 0 279.6s10.6 86.3 29.1 123.7l82.3-63.6z"/>
    <path fill="#EA4335" d="M249 97.8c36.3 0 68.7 12.5 94.2 37l70.3-70.3C371.4 24.5 315.6 0 249 0 152.2 0 69.9 54.3 29.1 155.9l82.3 63.6C130.7 141 185 97.8 249 97.8z"/>
  </svg>
  );
}
function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1877F2" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0A66C2" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8A53.79 53.79 0 01107.58 53.8c0 29.7-24.09 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.7V448H158.6V148.9h88.9v40.8h1.3c12.4-23.6 42.6-48.3 87.7-48.3 93.8 0 111.1 61.8 111.1 142.3V448z"/>
  </svg>
  );
}
