// src/pages/StudentSignup.jsx
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (files && files[0]) : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErr("");
  setInfo("");
  setLoading(true);

  try {
    // 1) Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    // 2) Upload files if any
    let documentUrl = "";
    let scholarshipUrl = "";

    if (formData.documents) {
      const docRef = ref(storage, `students/${user.uid}/documents_${Date.now()}.pdf`);
      await uploadBytes(docRef, formData.documents);
      documentUrl = await getDownloadURL(docRef);
    }

    if (formData.scholarshipDoc) {
      const schRef = ref(storage, `students/${user.uid}/scholarship_${Date.now()}.pdf`);
      await uploadBytes(schRef, formData.scholarshipDoc);
      scholarshipUrl = await getDownloadURL(schRef);
    }

    // 3) Save to Firestore
    await setDoc(doc(db, "students", user.uid), {
      uid: user.uid,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      pincode: formData.pincode,
      createdAt: new Date(),
    });

    // 4) Save to MongoDB via backend API
    const response = await fetch("https://acvora-07fo.onrender.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password, // hashed in backend
        firebaseId: user.uid,
        address: formData.address,
        pincode: formData.pincode,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "MongoDB save failed");
    }

    // Save MongoDB _id in localStorage
localStorage.setItem("userId", result.data._id);

    setInfo("✅ Student signed up successfully!");
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      pincode: "",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    setErr(error?.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-[#2c301f] via-[#232736] to-[#1a1c27] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left welcome panel */}
        <div className="hidden lg:flex relative overflow-hidden rounded-2xl bg-[rgba(53,53,36,0.85)] border border-white/10 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent" />
          <div className="relative p-10 flex flex-col justify-center">
            <div className="h-14 w-14 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-yellow-500" viewBox="0 0 24 24" fill="none">
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold">Create your student account</h1>
            <p className="text-white/70 mt-2 leading-relaxed">
              Sign up to manage your applications, upload documents, and access personalized counselling resources.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <CheckIcon />
                Secure authentication and cloud storage
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Track academic details and preferences
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Fast support from our counselling team
              </li>
            </ul>
            <div className="mt-8">
              <div className="h-px bg-white/10" />
              <p className="text-xs text-white/50 mt-3">
                By creating an account, you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="backdrop-blur-xl bg-[rgba(53,53,36,0.85)] border border-white/10 text-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Student Signup</h2>
            <p className="text-sm text-white/70 mt-1">
              Enter your details to get started. Fields marked with an asterisk (*) are required.
            </p>
          </div>

          {err && (
            <div className="mb-4 rounded-lg border border-yellow-500/30 bg-red-500/10 text-yellow-500 px-3 py-2 text-sm">
              {err}
            </div>
          )}
          {info && (
            <div className="mb-4 rounded-lg border border-yellow-500/30 bg-red-500/10 text-yellow-500 px-3 py-2 text-sm">
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="bg-[#2b2f3a] border-white/10 text-black placeholder-white/40"
                required
              />
              <FormInput
                label="Mobile No. *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your mobile number"
                className="bg-[#2b2f3a] border-white/10 text-black placeholder-white/40"
                required
              />
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Email ID *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-[#2b2f3a] border-white/10 text-black placeholder-white/40"
                required
              />
             <FormInput
  label="Password *"
  name="password"
  type="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter password"
  className="bg-[#2b2f3a] border-white/10 placeholder-white/40"
  required
/>

              {/* Optional: password hint */}
              {/* <p className="md:col-span-2 text-xs text-white/50 -mt-2">Use 8+ characters with a mix of letters and numbers.</p> */}
            </div>

            {/* Address & Pincode */}
            <FormInput
              label="Address *"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="bg-[#2b2f3a] border-white/10 text-black placeholder-white/40"
              required
            />

            <FormInput
              label="Pincode *"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              className="bg-[#2b2f3a] border-white/10 text-black placeholder-white/40"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg shadow-lg shadow-yellow-900/30 transition"
            >
              {loading ? "Submitting..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentSignup;

/* Icons */
function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
