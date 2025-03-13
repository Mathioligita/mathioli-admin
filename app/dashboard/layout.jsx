"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../ui/dashboard/navbar/navbar"; // Changed import path
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import NotFound from "../ui/dashboard/notfound/page";
import "../ui/dashboard/dashboard.scss";
import "../App.css";
import UserContext from "../ui/context/usecontext";

export default function Layout({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardData,setDashboarddata]=useState(null)

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    setAccessToken(token);
  }, []);

  if (!accessToken) {
    return <NotFound />;
  }
 
  const defaultdata ={
    setDashboarddata,
    dashboardData

  }
  
  return (
    <UserContext.Provider value={defaultdata}>

    <div className="d-flex align-items-start" style={{ height: "100vh",overflow:"hidden" }}>
      <Sidebar />
      <div className="w-100 sid-wd" style={{ height: "100vh" }}>
        <Navbar />
        <div className="layout-body container" style={{ height: "calc(100vh - 56px)" }}>
          {children}
        </div>
      </div>
    </div>
    </UserContext.Provider>
  );
}
