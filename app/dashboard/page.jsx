"use client"

import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../utlis";
import axios from "axios";
import "../styles/dashboard.css";
import { Col, Row } from "react-bootstrap";
import UserContext from "../ui/context/usecontext";
import QuotePage from "./quote/quotepage";

const Dashboardpage = () => {
  const accessToken = Cookies.get("accessToken");
  const [dashboard, setDashboard] = useState();
  const {setDashboarddata } =useContext(UserContext)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.get(`${API_BASE_URL}/dahboard`, {
          headers,
        });
        console.log(response.data.data, "response");
        setDashboard(response.data.data);
        setDashboarddata(response.data.data.admin)
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const filterOptions = ["This Week", "This Month", "This Year"];
  
  const pieData = {
    labels: ["Total Orders", "Total Delivered", "Total Revenue"],
    datasets: [
      {
        data: [dashboard?.totalOrders || 0, dashboard?.totalDelivered || 0, dashboard?.totalRevenue || 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    width: 150,
    height: 150,
  };

  const orderTrendData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Orders",
        data: dashboard?.weeklyOrders?.map(order => order.count) || [],
        borderColor: "#42A5F5",
        fill: false,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2020",
        data: dashboard?.monthlyRevenue || [],
        borderColor: "#FF6384",
        fill: false,
      },
      {
        label: "2021",
        data: dashboard?.monthlyRevenue || [],
        borderColor: "#36A2EB",
        fill: false,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h4>Welcome, {dashboard?.admin?.firstName}</h4>
        {/* <Dropdown value="This Month" options={filterOptions.map((opt) => ({ label: opt, value: opt }))} placeholder="Filter Period" /> */}
      </div>

      <div className="stats">
        <div className="stat-card text-center" style={{ height: "128px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",  }}>
          <div className="stat-content">
            <div style={{ marginBottom: "10px", backgroundColor: "#f0f8ff", padding: "10px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/Group 118.png" alt="" style={{ width: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>{dashboard?.totalOrders || 0}</h3>
              <p>Total Orders</p>
              <span className="stat-percentage" style={{ color: "green" }}>{dashboard?.orderChange || 0}% increase</span>
            </div>
          </div>
        </div>
        <Card className="stat-card" style={{ height: "128px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",  }}>
          <div className="stat-content">
            <div style={{ marginBottom: "10px", backgroundColor: "#e6f7ff", padding: "10px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/Group 82.png" alt="" style={{ width: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>{dashboard?.totalDelivered || 0}</h3>
              <p>Total Delivered</p>
              <span className="stat-percentage" style={{ color: "green" }}>{dashboard?.deliveredChange || 0}% increase</span>
            </div>
          </div>
        </Card>
        <Card className="stat-card" style={{ height: "128px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",  }}>
          <div className="stat-content">
            <div style={{ marginBottom: "10px", backgroundColor: "#e6f7ff", padding: "10px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/Group 82.png" alt="" style={{ width: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>{dashboard?.totalBooks || 0}</h3>
              <p>Total Books</p>
              <span className="stat-percentage" style={{ color: "red" }}>2% decline</span>
            </div>
          </div>
        </Card>
        <Card className="stat-card" style={{ height: "128px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <div className="stat-content">
            <div style={{ marginBottom: "10px", backgroundColor: "#fff5e6", padding: "10px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/Group 122.png" alt="" style={{ width: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "800" }}>{dashboard?.totalRevenue || 0}</h3>
              <p>Total Revenue</p>
              <span className="stat-percentage" style={{ color: "green" }}>4% increase</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Pie Chart</h3>
          <Chart type="pie" data={pieData} options={pieOptions} />
        </div>
        <div className="chart">
          <h3>Order Trend</h3>
          <Chart type="line" data={orderTrendData} />
        </div>
      </div>
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
            <div style={{ maxHeight: "200px",overflow:"auto" }}>
              <QuotePage />
            </div>
          </div>
        </Col>
      </Row>

      <div className="customer-review">
        <h3>Customer Review</h3>
        <p>"Excellent service and delivery!"</p>
      </div>
    </div>
  );
};

export default Dashboardpage;

