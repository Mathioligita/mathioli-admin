// // // "use client"
// // // import React, { useState } from 'react';

// // // import Navbar from '../ui/dashboard/Navbar/navbar';
// // // import Sidebar from '../ui/dashboard/sidebar/sidebar';

// // // import '../ui/dashboard/dashboard.scss';
// // // import {useUserContext} from "../ui/context/usecontext"
// // // import AppConfig from '../ui/dashboard/AppConfig';
// // // // import AppConfig from '../ui/dashboard/AppConfig';
// // // export default function Layout({ children }) {
// // //     const [isSidebarVisible, setSidebarVisible] = useState(true);
// // //     const { backgroundColor, textColor, fontFamily } = useUserContext();
// // //     const accessToken =  localStorage.setItem('refreshToken');
// // //     const toggleSidebar = () => {
// // //         setSidebarVisible(prevState => !prevState);
// // //     };

// // //     return (
// // //         {
// // //           if(!accessToken){
// // //             <>

// // //             <div className="layout-container" style={{ backgroundColor }}>
// // //             <Navbar toggleSidebar={toggleSidebar}   backgroundColor={backgroundColor} />
// // //             <div className={`layout-sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
// // //                 <Sidebar backgroundColor={backgroundColor}  />
// // //             </div>
// // //             <div className={`layout-main-container ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
// // //                 <div className="layout-main" style={{ color: textColor, fontFamily:fontFamily ,background:backgroundColor }}>
// // //                     {children}

// // //                 </div>
// // //             </div>
// // //             <AppConfig  />
// // //         </div>

// // //             </>
// // //           }

// // //         }

// // //     );
// // // };

// // "use client";
// // import React, { useState } from "react";
// // import Navbar from "../ui/dashboard/Navbar/navbar";
// // import Sidebar from "../ui/dashboard/sidebar/sidebar";

// // import NotFound from "../ui/dashboard/notfound/page";

// // import "../ui/dashboard/dashboard.scss";
// // // import { useUserContext } from "../ui/context/usecontext";
// // import AppConfig from "../ui/dashboard/AppConfig";

// // export default function Layout({ children }) {
// //   const [isSidebarVisible, setSidebarVisible] = useState(true);
// //   // const { backgroundColor, textColor, fontFamily } = useUserContext();
// //   const accessToken = localStorage.getItem("accessToken");   

// //   const toggleSidebar = () => {
// //     setSidebarVisible(!isSidebarVisible);
// //   };

// //   if (!accessToken) {
// //     return <NotFound />; // Render NotFound component if no access token    
// //   }

// //   return (
// //     <div className="layout-container" >
// //       <Navbar toggleSidebar={toggleSidebar}  />
// //       <div className={`layout-sidebar ${isSidebarVisible ? "" : "hidden"}`} >
// //         <Sidebar  />
// //       </div>
// //       <div
// //         className={`layout-main-container ${
// //           isSidebarVisible ? "" : "sidebar-hidden"
// //         }`}
     
// //       >
// //         <div className="layout-main">{children}</div>
// //       </div>
// //       {/* <AppConfig /> */}
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState, useEffect } from "react";
// import Navbar from "../ui/dashboard/Navbar/navbar";
// import Sidebar from "../ui/dashboard/sidebar/sidebar";
// import NotFound from "../ui/dashboard/notfound/page";
// import "../ui/dashboard/dashboard.scss";
// import "../App.css"
// import AppConfig from "../ui/dashboard/AppConfig";

// export default function Layout({ children }) {
//   // const [isSidebarVisible, setSidebarVisible] = useState(true);
//   const [accessToken, setAccessToken] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   useEffect(() => {
//     // Fetch the token once the component mounts
//     const token = localStorage.getItem("refreshToken");
//     setAccessToken(token);
//   }, []);

//   // const toggleSidebar = () => {
//   //   setSidebarVisible((prevState) => !prevState);
//   // };

//   // Render NotFound if no access token is available
//   if (!accessToken) {
//     return <NotFound />;
//   }

//   // <div className="layout-container">
//   //   <Navbar  />
//   //   <div className={`layout-sidebar `}>
  
//   //     <Sidebar />
//   //   </div>
//   //   <div
//   //     className={`layout-main-container`}
//   //   >
//   //     <div className="layout-main">{children}</div>
//   //   </div>
//     {/* Uncomment if AppConfig is needed */}
//     {/* <AppConfig /> */}
//   return (



//       <div className="layout-container">
//                 <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//                 <div className="layout-sidebar">
//                     <Sidebar isOpen={isOpen} />
//                 </div>
//                 <div className="layout-containers">
//                     <div className="layout-content">{children}</div>
//                 </div>
//             </div>
   
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../ui/dashboard/Navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import NotFound from "../ui/dashboard/notfound/page";
import "../ui/dashboard/dashboard.scss";
import "../App.css";

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
    <div className="layout-container">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`layout-sidebar ${isOpen ? "open" : "closed"}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      <div className="layout-content-wrapper">
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
