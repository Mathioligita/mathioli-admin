"use client";
import React from "react";
import "primeflex/primeflex.css";

import "./sidebar.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Menulink from "../sidebar/menulink/menulink";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/usecontext";

const Sidebar = () => {
  const router = useRouter();
  // const { backgroundColor, textColor, fontFamily } = useUserContext();
  const model = [
    {
      label: "Home",
      items: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
      ],
    },
    {
      label: "Components",
      items: [
        // { label: "Company", icon: "pi pi-fw pi-id-card", to: "/dashboard/company" },
        { label: "Plan", icon: "pi pi-fw pi-clipboard", to: "/dashboard/plans" },
        // { label: "Order", icon: "pi pi-fw pi-id-card", to: "/dashboard/order" },
        { label: "Category", icon: "pi pi-fw pi-box", to: "/dashboard/category" },
        { label: "Book", icon: "pi pi-fw pi-book", to: "/dashboard/book" },
        {
          label: "Qoute",
          icon: "pi pi-fw pi-id-card",
          to: "/dashboard/quote",
        },
        {
          label: "Manage Agents",
          icon: "pi pi-fw pi-id-card",
          to: "/dashboard/shipping",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <ul className="layout-menu">
      {model.map((section, index) => (
        <li key={index} className="layout-root-menuitem">
          <span
            className="layout-menuitem-root-text"

          >
            {/* {section.label} */}
          </span>
          {section.items && (
            <ul className="sub-menu">
              {section.items.map((item, subIndex) => (
                <a href={item.to} className="p-ripple" tabIndex={0} key={subIndex}>
                  <i className={`layout-menuitem-icon ${item.icon} `} style={{ fontSize: "30px" }}></i>
                  <span className="layout-menuitem-text">{item.label}</span>
                </a>
              ))}
            </ul>
          )}
        </li>
      ))}
      <ul className="sub-menu">

      <a className=" layout-topbar-button  ms-2" onClick={handleLogout}>
        <i className="pi pi-sign-out layout-menuitem-icon " style={{ fontSize: "30px" }}></i>
        <span className="layout-menuitem-text">Log out</span>
      </a>
      </ul>
    </ul>
  );
};

export default Sidebar;
