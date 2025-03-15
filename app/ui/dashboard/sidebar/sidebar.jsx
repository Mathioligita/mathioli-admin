"use client";
import React, { useState } from "react";
import "primeflex/primeflex.css";

import "./sidebar.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Menulink from "../sidebar/menulink/menulink";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/usecontext";
import { MdLocalShipping } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  // const { backgroundColor, textColor, fontFamily } = useUserContext();
  const model = [
    {
      label: "Home",
      items: [
        { label: "Dashboard", icon: "fa-solid fa-house", to: "/dashboard" },
      ],
    },
    {
      label: "Components",
      items: [
        // { label: "Company", icon: "pi pi-fw pi-id-card", to: "/dashboard/company" },
        // {
        //   label: "Plan",
        //   icon: "fa-solid fa-clipboard",
        //   to: "/dashboard/plans",
        // },
        {
          label: "Category",
          icon: "fa-solid fa-box-archive",
          to: "/dashboard/category",
        },
        {
          label: "Book",
          icon: "fa-solid fa-book",
          to: "/dashboard/book",
        },
        {
          label: "Qoute",
          icon: "fa-solid fa-quote-left",
          to: "/dashboard/quote",
        },
        {
          label: "Shipping",
          icon: "fa-solid fa-truck",
          to: "/dashboard/shipping",
        },
        {
          label: "Contact",
          icon: "fa-solid fa-address-book",
          to: "/dashboard/contactus",
        },
        {
          label: "Orders",
          icon: "fa-solid fa-cart-shopping",
          to: "/dashboard/orders",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"}`}
      style={{ borderRight: "1px solid #8080804f" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {isOpen ? (
          <div className="text-center mt-2">
            <img
              src="/svg/Final-Logo 2.png"
              className="ms-3"
              alt=""
              width={"180px"}
            />
          </div>
        ) : null}
        <i
          className="pi pi-align-justify toggle-button mt-3 fw-bold"
          onClick={toggleSidebar}
        ></i>
      </div>
      <ul className="layout-menu">
        {model.map((section, index) => (
          <li key={index} className="layout-root-menuitem">
            <span className="layout-menuitem-root-text">
              {/* {section.label} */}
            </span>
            {section.items && (
              <ul className="sub-menu">
                {section.items.map((item, subIndex) => (
                  <a
                    href={item.to}
                    className="p-ripple"
                    tabIndex={0}
                    key={subIndex}
                  >
                    <i
                      className={item?.icon}
                      // style={{ fontSize: "17px" }}
                    ></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                  </a>
                ))}
              </ul>
            )}
          </li>
        ))}
        <ul className="sub-menu">
          <a className=" layout-topbar-button" onClick={handleLogout}>
            <i
              className="fa-solid fa-right-from-bracket layout-menuitem-icon "
              style={{ fontSize: "17px" }}
            ></i>
            <span className="layout-menuitem-text">Log out</span>
          </a>
        </ul>
        {isOpen ? (
          <div className="book-image">
            <img
              src="/book.png"
              alt="book"
              className="img-fliud sidebar-footer-image"
              loading="lazy"
              width={"100px"}
            />
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default Sidebar;
