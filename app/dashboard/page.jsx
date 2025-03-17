// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { Card } from "primereact/card";
// import { Chart } from "primereact/chart";
// import { Dropdown } from "primereact/dropdown";
// import Cookies from "js-cookie";
// import axios from "axios";
// import "../styles/dashboard.css";
// import { Col, Row } from "react-bootstrap";
// import UserContext from "../ui/context/usecontext";
// import QuotePage from "./dashboardpage/qoutepage/Quotepage";
// import { API_BASE_URL } from "../utlis";

// const Dashboardpage = () => {
//   const accessToken = Cookies.get("accessToken");
//   const [dashboard, setDashboard] = useState(null);
//   const [filterOption, setFilterOption] = useState("overall");
//   const { setDashboarddata } = useContext(UserContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         const response = await axios.get(`${API_BASE_URL}/dahboard`, {
//           headers,
//         });
//         setDashboard(response.data.data);
//         setDashboarddata(response.data.data.admin);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const filterOptions = [
//     { label: "Overall", value: "overall" },
//     { label: "Today", value: "today" },
//     { label: "This Week", value: "weekly" },
//     { label: "This Month", value: "monthly" },
//     { label: "This Year", value: "yearly" },
//   ];

//   const getFilteredData = (key) => {
//     console.log(filterOption, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
//     switch (filterOption) {
//       case "today":
//         return dashboard?.[key]?.today || 0;
//       case "weekly":
//         return dashboard?.[key]?.weekly || 0;
//       case "monthly":
//         return dashboard?.[key]?.monthly || 0;
//       case "yearly":
//         return dashboard?.[key]?.yearly || 0;
//       default:
//         return dashboard?.overview?.[key] || 0;
//     }
//   };

//   const getPercentageChange = (key) => {
//     console.log(key, "key");
//     switch (filterOption) {
//       case "today":
//         return dashboard?.[key]?.dailyChange || 0;
//       case "weekly":
//         return dashboard?.[key]?.weeklyChange || 0;
//       case "monthly":
//         return dashboard?.[key]?.monthlyChange || 0;
//       case "yearly":
//         return dashboard?.[key]?.yearly || 0;
//       default:
//         return  0;
//     }

//     // if (overall === 0) return "0%";
//     // const change = ((filtered - overall) / overall) * 100;
//     return `${overall}`;
//   };

//   const getSpecificPercentageChange = (key, period) => {
//     const overall = dashboard?.overview?.[key] || 0;
//     const filtered = dashboard?.[key]?.[period] || 0;
//     if (overall === 0) return "0%";
//     const change = ((filtered - overall) / overall) * 100;
//     return `${change.toFixed(2)}%`;
//   };

//   const pieData = {
//     labels: [
//       "Total Orders",
//       "Customer Growth",
//       "Total Revenue",
//       "Total Books",
//       "Total Users",
//     ],
//     datasets: [
//       {
//         data: [
//           dashboard?.charts?.pieChart?.totalOrders?.[filterOption] || 0,
//           dashboard?.charts?.pieChart?.customerGrowth?.[filterOption] || 0,
//           dashboard?.charts?.pieChart?.totalRevenue?.[filterOption] || 0,
//           dashboard?.overview?.totalBooks || 0,
//           dashboard?.overview?.totalUsers || 0,
//         ],
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#8BC34A",
//           "#9C27B0",
//         ],
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     width: 150,
//     height: 150,
//   };

//   const orderTrendData = {
//     labels: [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     datasets: [
//       {
//         label: "Orders",
//         data:
//           dashboard?.charts?.currentWeekOrders?.map((order) => order.orders) ||
//           [],
//         borderColor: "#42A5F5",
//         fill: false,
//       },
//     ],
//   };

//   const revenueData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "2020",
//         data: dashboard?.charts?.barChart?.monthlyRevenue || [],
//         borderColor: "#FF6384",
//         fill: false,
//       },
//       {
//         label: "2021",
//         data: dashboard?.charts?.barChart?.monthlyRevenue || [],
//         borderColor: "#36A2EB",
//         fill: false,
//       },
//     ],
//   };

//   if (!dashboard) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="dashboard">
//       <div className="header">
//         <h4>Welcome, {dashboard?.admin?.firstName || "Admin"}</h4>
//         <Dropdown
//           value={filterOption}
//           options={filterOptions}
//           onChange={(e) => setFilterOption(e.value)}
//           placeholder="Filter Period"
//           className="w-25"
//         />
//       </div>

//       <div className="stats">
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#f0f8ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 118.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>{getFilteredData("orders")}</h3>
//               <p>Total Orders</p>
//               <span className="stat-percentage" style={{ color: "green" }}>
//                 {getPercentageChange("orders")}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#e6f7ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 82.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {getFilteredData("deliveries")}
//               </h3>
//               <p>Total Delivered</p>
//               <span className="stat-percentage" style={{ color: "green" }}>
//                 {getPercentageChange("deliveries")}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#fff5e6",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 122.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {getFilteredData("revenue")}
//               </h3>
//               <p>Total Revenue</p>
//               <span className="stat-percentage" style={{ color: "green" }}>
//                 {getPercentageChange("revenue")}
//               </span>
//               {/* <div>
//                 <span>
//                   Daily: {getSpecificPercentageChange("revenue", "dailyChange")}
//                 </span>
//                 <span>
//                   Weekly:{" "}
//                   {getSpecificPercentageChange("revenue", "weeklyChange")}
//                 </span>
//                 <span>
//                   Monthly:{" "}
//                   {getSpecificPercentageChange("revenue", "monthlyChange")}
//                 </span>
//               </div> */}
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#e6f7ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 82.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {dashboard?.overview?.totalBooks || 0}
//               </h3>
//               <p>Total Books</p>
//               <span className="stat-percentage" style={{ color: "red" }}>
//                 {/* 2% decline */}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#e6f7ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 82.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {dashboard?.overview?.totalUsers || 0}
//               </h3>
//               <p>Total Users</p>
//               <span className="stat-percentage" style={{ color: "red" }}>
//                 {/* 2% decline */}
//               </span>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="charts">
//         <div className="chart">
//           <h3>Pie Chart</h3>
//           <Chart type="pie" data={pieData} options={pieOptions} />
//         </div>
//         <div className="chart">
//           <h3>Order Trend</h3>
//           <Chart type="line" data={orderTrendData} />
//         </div>
//       </div>
//       <Row>
//         <Col>
//           <div className="revenue-chart">
//             <h3>Total Revenue</h3>
//             <Chart type="line" data={revenueData} />
//           </div>
//         </Col>
//         <Col>
//           <div className="quote-section">
//             <h3>Create Today's Quote</h3>
//             <div style={{ maxHeight: "200px", overflow: "auto" }}>
//               <QuotePage />
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboardpage;

// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { Card } from "primereact/card";
// import { Chart } from "primereact/chart";
// import { Dropdown } from "primereact/dropdown";
// import Cookies from "js-cookie";
// import axios from "axios";
// import "../styles/dashboard.css";
// import { Col, Row } from "react-bootstrap";
// import UserContext from "../ui/context/usecontext";
// import QuotePage from "./dashboardpage/qoutepage/Quotepage";
// import { API_BASE_URL } from "../utlis";

// const Dashboardpage = () => {
//   const accessToken = Cookies.get("accessToken");
//   const [dashboard, setDashboard] = useState(null);
//   const [filterOption, setFilterOption] = useState("overall");
//   const { setDashboarddata } = useContext(UserContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         const response = await axios.get(`${API_BASE_URL}/dahboard`, {
//           headers,
//         });
//         setDashboard(response.data.data);
//         setDashboarddata(response.data.data.admin);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const filterOptions = [
//     { label: "Overall", value: "overall" },
//     { label: "Today", value: "today" },
//     { label: "This Week", value: "weekly" },
//     { label: "This Month", value: "monthly" },
//     { label: "This Year", value: "yearly" },
//   ];

//   const getFilteredData = (key) => {
//     switch (filterOption) {
//       case "today":
//         return dashboard?.[key]?.today || 0;
//       case "weekly":
//         return dashboard?.[key]?.weekly || 0;
//       case "monthly":
//         return dashboard?.[key]?.monthly || 0;
//       case "yearly":
//         return dashboard?.[key]?.yearly || 0;
//       default:
//         return dashboard?.overview?.[key] || 0;
//     }
//   };

//   const getPercentageChange = (key) => {
//     switch (filterOption) {
//       case "today":
//         return dashboard?.[key]?.dailyChange || 0;
//       case "weekly":
//         return dashboard?.[key]?.weeklyChange || 0;
//       case "monthly":
//         return dashboard?.[key]?.monthlyChange || 0;
//       case "yearly":
//         return dashboard?.[key]?.yearly || 0;
//       default:
//         return 0;
//     }
//   };

//   const pieDataOrders = {
//     labels: ["Total Orders"],
//     datasets: [
//       {
//         data: [getFilteredData("orders")],
//         backgroundColor: ["#FF6384"],
//       },
//     ],
//   };

//   const pieDataCustomerGrowth = {
//     labels: ["Customer Growth"],
//     datasets: [
//       {
//         data: [getFilteredData("customerGrowth")],
//         backgroundColor: ["#36A2EB"],
//       },
//     ],
//   };

//   const pieDataRevenue = {
//     labels: ["Total Revenue"],
//     datasets: [
//       {
//         data: [getFilteredData("revenue")],
//         backgroundColor: ["#FFCE56"],
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     width: 150,
//     height: 150,
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   const orderTrendData = {
//     labels: [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     datasets: [
//       {
//         label: "Orders",
//         data:
//           dashboard?.charts?.currentWeekOrders?.map((order) => order.orders) ||
//           [],
//         borderColor: "#42A5F5",
//         fill: false,
//       },
//     ],
//   };

//   const revenueData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "2020",
//         data: dashboard?.charts?.barChart?.monthlyRevenue || [],
//         borderColor: "#FF6384",
//         fill: false,
//       },
//       {
//         label: "2021",
//         data: dashboard?.charts?.barChart?.monthlyRevenue || [],
//         borderColor: "#36A2EB",
//         fill: false,
//       },
//     ],
//   };

//   if (!dashboard) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="dashboard">
//       <div className="header">
//         <h4>Welcome, {dashboard?.admin?.firstName || "Admin"}</h4>
//         <Dropdown
//           value={filterOption}
//           options={filterOptions}
//           onChange={(e) => setFilterOption(e.value)}
//           placeholder="Filter Period"
//           className="w-25"
//         />
//       </div>

//       <div className="stats">
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#f0f8ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 118.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>{getFilteredData("orders")}</h3>
//               <p>Total Orders</p>
//               <span className="stat-percentage" style={{ color: "green" }}>
//                 {getPercentageChange("orders")}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#e6f7ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 82.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {getFilteredData("deliveries")}
//               </h3>
//               <p>Total Delivered</p>
//               <span className="stat-percentage" style={{ color: "green" }}>
//                 {getPercentageChange("deliveries")}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#fff5e6",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 122.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {getFilteredData("revenue")}
//               </h3>
//               <p>Total Revenue</p>
//               <span className="stat-percentage" style={{ color: "green" }}>
//                 {getPercentageChange("revenue")}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#e6f7ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 82.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {dashboard?.overview?.totalBooks || 0}
//               </h3>
//               <p>Total Books</p>
//               <span className="stat-percentage" style={{ color: "red" }}>
//                 {/* 2% decline */}
//               </span>
//             </div>
//           </div>
//         </Card>
//         <Card
//           className="stat-card"
//           style={{
//             height: "128px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div className="stat-content">
//             <div
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#e6f7ff",
//                 padding: "10px",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src="/Group 82.png"
//                 alt=""
//                 style={{ width: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: "800" }}>
//                 {dashboard?.overview?.totalUsers || 0}
//               </h3>
//               <p>Total Users</p>
//               <span className="stat-percentage" style={{ color: "red" }}>
//                 {/* 2% decline */}
//               </span>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="charts">
//         <div className="chart">
//           <h3>Total Orders</h3>
//           <Chart type="pie" data={pieDataOrders} options={pieOptions} />
//         </div>
//         <div className="chart">
//           <h3>Customer Growth</h3>
//           <Chart type="pie" data={pieDataCustomerGrowth} options={pieOptions} />
//         </div>
//         <div className="chart">
//           <h3>Total Revenue</h3>
//           <Chart type="pie" data={pieDataRevenue} options={pieOptions} />
//         </div>
//         <div className="chart">
//           <h3>Order Trend</h3>
//           <Chart type="line" data={orderTrendData} />
//         </div>
//       </div>
//       <Row>
//         <Col>
//           <div className="revenue-chart">
//             <h3>Total Revenue</h3>
//             <Chart type="line" data={revenueData} />
//           </div>
//         </Col>
//         <Col>
//           <div className="quote-section">
//             <h3>Create Today's Quote</h3>
//             <div style={{ maxHeight: "200px", overflow: "auto" }}>
//               <QuotePage />
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboardpage;

"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/dashboard.css";
import { Col, Row } from "react-bootstrap";
import UserContext from "../ui/context/usecontext";
import QuotePage from "./dashboardpage/qoutepage/Quotepage";
import { API_BASE_URL } from "../utlis";

const Dashboardpage = () => {
  const accessToken = Cookies.get("accessToken");
  const [dashboard, setDashboard] = useState(null);
  const [filterOption, setFilterOption] = useState("overall");
  const { setDashboarddata } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.get(`${API_BASE_URL}/dahboard`, {
          headers,
        });
        setDashboard(response.data.data);
        setDashboarddata(response.data.data.admin);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filterOptions = [
    { label: "Overall", value: "overall" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ];

  const getFilteredData = (key) => {
    switch (filterOption) {
      case "today":
        return dashboard?.[key]?.today || 0;
      case "weekly":
        return dashboard?.[key]?.weekly || 0;
      case "monthly":
        return dashboard?.[key]?.monthly || 0;
      case "yearly":
        return dashboard?.[key]?.yearly || 0;
      default:
        return dashboard?.overview?.[key] || 0;
    }
  };
  const getPercentageChange = (key) => {
    switch (filterOption) {
      case "today":
        return dashboard?.[key]?.dailyChange || 0;
      case "weekly":
        return dashboard?.[key]?.weeklyChange || 0;
      case "monthly":
        return dashboard?.[key]?.monthlyChange || 0;
      case "yearly":
        return dashboard?.[key]?.yearly || 0;
      default:
        return dashboard?.overview?.[key] || 0;
    }
  };

  const getFilteredDatapie = (key) => {
    switch (filterOption) {
      case "today":
        return 0;
      case "weekly":
        return dashboard?.charts?.pieChart?.[key]?.weekly || 0;
      case "monthly":
        return dashboard?.charts?.pieChart?.[key]?.monthly || 0;
      case "yearly":
        return dashboard?.charts?.pieChart?.[key]?.yearly || 0;
      default:
        return 0;
    }
  };

  const pieDataOrders = {
    labels: ["Total Orders"],
    datasets: [
      {
        data: [getFilteredDatapie("totalOrders")],
        backgroundColor: ["#FF6384"],
      },
    ],
  };

  const pieDataCustomerGrowth = {
    labels: ["Customer Growth"],
    datasets: [
      {
        data: [getFilteredDatapie("customerGrowth")],
        backgroundColor: ["#36A2EB"],
      },
    ],
  };

  const pieDataRevenue = {
    labels: ["Total Revenue"],
    datasets: [
      {
        data: [getFilteredDatapie("totalRevenue")],
        backgroundColor: ["#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    width: 25,
    height: 25,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const orderTrendData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Orders",
        data:
          dashboard?.charts?.currentWeekOrders?.map((order) => order.orders) ||
          [],
        borderColor: "#42A5F5",
        fill: false,
      },
    ],
  };

  const revenueData = {
    labels: dashboard?.charts?.barChart?.yearlyRevenue?.months,
    datasets: [
      {
        label: dashboard?.charts?.barChart?.yearlyRevenue?.year,
        data: dashboard?.charts?.barChart?.yearlyRevenue.data || [],
        borderColor: dashboard?.charts?.barChart?.yearlyRevenue?.color,
        fill: false,
      },
     
    ],
  };

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="header">
        <h4>Welcome, {dashboard?.admin?.firstName || "Admin"}</h4>
        <Dropdown
          value={filterOption}
          options={filterOptions}
          onChange={(e) => setFilterOption(e.value)}
          placeholder="Filter Period"
          className="w-25"
        />
      </div>

      <div className="stats">
        <Card
          className="stat-card"
          style={{
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="stat-content">
            <div
              style={{
                marginBottom: "10px",
                backgroundColor: "#f0f8ff",
                padding: "10px",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/Group 118.png"
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>{getFilteredData("orders")}</h3>
              <p>Total Orders</p>
              <span className="stat-percentage" style={{ color: "green" }}>
                {getPercentageChange("orders")}
              </span>
            </div>
          </div>
        </Card>
        <Card
          className="stat-card"
          style={{
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="stat-content">
            <div
              style={{
                marginBottom: "10px",
                backgroundColor: "#e6f7ff",
                padding: "10px",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/Group 82.png"
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>
                {getFilteredData("deliveries")}
              </h3>
              <p>Total Delivered</p>
              <span className="stat-percentage" style={{ color: "green" }}>
                {getPercentageChange("deliveries")}
              </span>
            </div>
          </div>
        </Card>
        <Card
          className="stat-card"
          style={{
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="stat-content">
            <div
              style={{
                marginBottom: "10px",
                backgroundColor: "#fff5e6",
                padding: "10px",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/Group 122.png"
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>
                {getFilteredData("revenue")}
              </h3>
              <p>Total Revenue</p>
              <span className="stat-percentage" style={{ color: "green" }}>
                {getPercentageChange("revenue")}
              </span>
            </div>
          </div>
        </Card>
        <Card
          className="stat-card"
          style={{
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="stat-content">
            <div
              style={{
                marginBottom: "10px",
                backgroundColor: "#e6f7ff",
                padding: "10px",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/Group 82.png"
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>
                {dashboard?.overview?.totalBooks || 0}
              </h3>
              <p>Total Books</p>
              <span className="stat-percentage" style={{ color: "red" }}>
                {/* 2% decline */}
              </span>
            </div>
          </div>
        </Card>
        <Card
          className="stat-card"
          style={{
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="stat-content">
            <div
              style={{
                marginBottom: "10px",
                backgroundColor: "#e6f7ff",
                padding: "10px",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/Group 82.png"
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>
                {dashboard?.overview?.totalUsers || 0}
              </h3>
              <p>Total Users</p>
              <span className="stat-percentage" style={{ color: "red" }}>
                {/* 2% decline */}
              </span>
            </div>
          </div>
        </Card>
      </div>
      <Row>
        <Col md={6}>
          <div className="chart mt-4">
            <h5>Pie Chart</h5>
            <div className="d-flex">
              <div className=" ">
                {/* <h3>Total Orders</h3> */}
                <Chart
                  type="pie"
                  data={pieDataOrders}
                  options={pieOptions}
                  className="pie-charts-values"
                />
              </div>
              <div className="">
                {/* <h3>Customer Growth</h3> */}
                <Chart
                  type="pie"
                  className="pie-charts-values"
                  data={pieDataCustomerGrowth}
                  options={pieOptions}
                />
              </div>
              <div className="">
                {/* <h3>Total Revenue</h3> */}
                <Chart
                  type="pie"
                  data={pieDataRevenue}
                  options={pieOptions}
                  className="pie-charts-values"
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="charts">
            <div className="chart">
              <h3>Order Trend</h3>
              <Chart type="line" data={orderTrendData} />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="revenue-chart">
            <h3>Total Revenue</h3>
            <Chart type="line" data={revenueData} />
          </div>
        </Col>
        <Col>
          <div className="quote-section">
            <h3>Create Today's Quote</h3>
            <div style={{ maxHeight: "200px", overflow: "auto" }}>
              <QuotePage />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboardpage;
