"use client";

import React, { useState, useEffect } from "react";
// Changed import path
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import NotFound from "../ui/dashboard/notfound/page";
import "../ui/dashboard/dashboard.scss";
import "../App.css";
import Navbar from "../ui/dashboard/navbar/navbar";

export default function Layout({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    setAccessToken(token);
  }, []);

  if (!accessToken) {
    return <NotFound />;
  }

  return (
    <div className="d-flex align-items-start">
      <Sidebar />
      <div className="w-100 sid-wd">
        <Navbar />
        <div className="layout-body container">{children}</div>
      </div>
    </div>
  );
}
