import React, { useState, useEffect } from "react";
import Header from "../components/AgentComponents/Header";
import Sidebar from "../components/AgentComponents/Sidebar";
import MainView from "../components/AgentComponents/MainView";
import "./Agent.css";

export default function AgentDashboard() {
  const [route, setRoute] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    if (mql.matches) setSidebarOpen(false);
  }, [route]);

  return (
    <div className="agent-dashboard">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        search={search}
        setSearch={setSearch}
      />
      <div className="ad-body">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setRoute={setRoute}
          currentRoute={route}
        />
        <main className="ad-main" id="main-content" tabIndex="-1">
          <MainView route={route} />
          <footer className="ad-footer text-yellow-500">
            <div>
              © {new Date().getFullYear()} Agent Dashboard • Support • Help Docs • Contact
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
