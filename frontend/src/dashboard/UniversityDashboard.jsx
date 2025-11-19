import React, { useState, useEffect } from "react";
import Header from "../components/UniversityDashboard/Header";
import Sidebar from "../components/UniversityDashboard/Sidebar";
import MainView from "../components/UniversityDashboard/MainView";
import "./UniversityDashboard.css";

export default function UniversityDashboard() {
  const [route, setRoute] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("uni_theme") || "light";
    } catch {
      return "light";
    }
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("uni_theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    if (mql.matches) setSidebarOpen(false);
  }, [route]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`university-dashboard ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        search={search}
        setSearch={setSearch}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="ud-body">
        <Sidebar sidebarOpen={sidebarOpen} setRoute={setRoute} currentRoute={route} />
        <main className="ud-main" id="main-content" tabIndex="-1">
          <MainView route={route} />
          <footer className="ud-footer">
            <div>© {new Date().getFullYear()} University Admin • Support • Help Docs • Contact</div>
          </footer>
        </main>
      </div>
    </div>
  );
}