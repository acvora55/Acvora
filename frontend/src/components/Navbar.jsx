// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// ✅ FIXED import path for Firebase 12
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/counselling", label: "Counselling" },
  { to: "/scholarship", label: "Scholarships" },
  { to: "/courses", label: "Courses" },
  { to: "/explorecollegespage", label: "Colleges" },
  { to: "/exams", label: "Exams" },
  { to: "/newsfeed", label: "News & Feed" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false); // ✅ New state for mobile submenu
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ Initialize as null
  const [displayName, setDisplayName] = useState(""); // ✅ Initialize as empty
  const [isVisible, setIsVisible] = useState(true); // New state for navbar visibility
  const userMenuRef = useRef(null);
  const lastScrollY = useRef(0); // Ref to track last scroll position
  const navigate = useNavigate();
  const auth = getAuth();

  const deriveName = (profileName, authDisplayName, email) => {
    if (profileName?.trim()) return profileName.trim();
    if (authDisplayName?.trim()) return authDisplayName.trim();
    if (email) return email.split("@")[0];
    return "Student";
  };

  // ✅ Detect logged-in user and fetch Firestore profile, sync with localStorage
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setUserMenuOpen(false);
      setMobileUserMenuOpen(false); // ✅ Reset mobile submenu on auth change

      if (!currentUser) {
        if (isMounted) {
          setDisplayName("");
          setUserId(null);
        }
        // ✅ Clear localStorage if no currentUser (prevents stale data)
        localStorage.removeItem("userId");
        localStorage.removeItem("displayName");
        return;
      }

      // ✅ Set userId from Firebase UID only if valid currentUser
      if (isMounted) setUserId(currentUser.uid);

      try {
        // ✅ Use db directly for docRef
        const docRef = doc(db, "students", currentUser.uid);
        const snap = await getDoc(docRef);

        const profileData = snap.exists() ? snap.data() : null;
        const name = deriveName(
          profileData?.name,
          currentUser.displayName,
          currentUser.email
        );

        if (isMounted) setDisplayName(name);

        // ✅ Update localStorage for persistence
        localStorage.setItem("userId", currentUser.uid);
        localStorage.setItem("displayName", name);
      } catch (error) {
        console.error("Error fetching profile:", error);
        const fallback = deriveName(
          "",
          currentUser.displayName,
          currentUser.email
        );
        if (isMounted) setDisplayName(fallback);

        // ✅ Update localStorage with fallback
        localStorage.setItem("userId", currentUser.uid);
        localStorage.setItem("displayName", fallback);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth]);

  // New useEffect for scroll handling: hide on scroll down, show after stop
  useEffect(() => {
    let timeoutId;
    let ticking = false;

    const updateVisibility = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY.current && scrollY > 50) {
        setIsVisible(false);
      }

      lastScrollY.current = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 150); // Show after 150ms of no scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // ✅ States already cleared by onAuthStateChanged
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-md transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/acvora2.png" alt="Vision Logo" className="h-10 w-auto" />
          <span className="text-2xl font-extrabold text-yellow-500 tracking-wide">
            Acvora
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-8 font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-500 font-semibold border-b-2 border-yellow-500 pb-1"
                      : "hover:text-yellow-500"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* User Menu - Desktop */}
        <div className="hidden md:flex relative" ref={userMenuRef}>
          {userId ? (
            <>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-500 font-medium max-w-[220px] truncate"
                title={displayName}
              >
                {"Hi, " + displayName}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <NavLink
                    to="/myprofile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/course"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500"
                  >
                    My Courses
                  </NavLink>
                  <NavLink
                    to="/saved-scholarships"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500"
                  >
                    Scholarships
                  </NavLink>
                  <NavLink
                    to="/Savedscholarships"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500"
                  >
                    Study Material
                  </NavLink>
                  <NavLink
                    to="/exam"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500"
                  >
                    Exams
                  </NavLink>
                  <NavLink
                    to="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-600"
                  >
                    Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-red-400 hover:bg-yellow-500 hover:text-white rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="focus:outline-none"
                aria-label="User menu"
              >
                <FaUserCircle className="w-8 h-8 text-yellow-500 hover:text-yellow-700" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <NavLink
                    to="/login"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500 rounded-t-lg"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-500 rounded-b-lg"
                  >
                    Signup
                  </NavLink>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col space-y-3 px-6 py-4 font-medium">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-500 font-semibold border-b-2 border-yellow-500 pb-1"
                      : "hover:text-yellow-500"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 px-6 pb-4">
            {userId ? (
              <>
                {/* ✅ Make "Hi, {displayName}" a clickable button to toggle submenu */}
                <button
                  onClick={() => setMobileUserMenuOpen((prev) => !prev)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-yellow-500 text-center font-medium"
                >
                  Hi, {displayName || "Account"}
                </button>

                {/* ✅ Conditionally render the submenu */}
                {mobileUserMenuOpen && (
                  <ul className="flex flex-col space-y-1 text-sm bg-gray-700 rounded-lg p-2">
                    <li>
                      <NavLink
                        to="/myprofile"
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-500 rounded"
                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/course"
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-500 rounded"
                      >
                        My Courses
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/saved-scholarships"
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-500 rounded"
                      >
                        Scholarships
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/Savedscholarships" // Note: Consider fixing this path if it's a typo (e.g., to "/study-material")
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-500 rounded"
                      >
                        Study Material
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/exam"
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-500 rounded"
                      >
                        Exams
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/settings"
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-500 rounded"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileUserMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-yellow-500 hover:text-white rounded"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-center"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;