"use client";
import Link from "next/link";
import { classNames } from "primereact/utils";
import React from "react";
import { Chip } from "primereact/chip";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import axiosInstance from '../../../../axiosConfig';
import "./navba.scss";
import { useState } from "react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  return (
    <div
      className="layout-topbar "
      style={{ borderBottom: "1px solid #8080804f" }}
    >
      <div className=""></div>

      <div className="d-flex align-items-center align-self-center w-100">
        <div className="flex items-center Search-bar-btn">
          <svg
            className="icons-Search"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3 7.5 7.5 0 0016.65 16.65z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-2 Search"
          />
        </div>
        <div className={classNames("layout-topbar-menu")}>
          {/* <Link href="/dashboard/profile">
                                profile
                                <Chip
                                    label="Profile"
                                    image="/killer.avif"
                                    className="profile-chip"
                                />
                            </Link> */}

          <div className="flex items-center space-x-4 p-2">
            <button className="relative mr-2 bell-btn">🔔</button>

            <div className="relative ">
              <Link href="/dashboard/profile">
                <button
                  // onClick={window.location.href = "/dashboard/profile"}
                  // href="/dashboard/profile"
                  className="flex items-center align-items-center profiel-btn"
                >
                  <span className="text-xl">🧑🏼‍💼</span>
                  <span className="ml-2 text-gray-700">Mathioli</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
