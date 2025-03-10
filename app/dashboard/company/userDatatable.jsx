
import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Card, Col, Row } from "react-bootstrap";
import { API_BASE_URL } from "../../utlis";
import Swal from "sweetalert2";
import { InputMask } from 'primereact/inputmask';

export default function AlldataUsers({ nodes }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("table");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (Array.isArray(nodes)) {
      setData(nodes);
    } else {
      setError("Invalid data format.");
    }
    setLoading(false);
  }, [nodes]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(({ Admin, companyName, createdAt, address }) => ({
        name: `${Admin.firstname} ${Admin.lastname}`,
        companyName,
        createdAt: new Date(createdAt).toLocaleDateString(),
        address,
        email: Admin.email,
        mobile: Admin.mobile,
        userRole: Admin.userRole,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserData.xlsx");
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/company/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        setData((prev) => prev.filter((user) => user._id !== userId));
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "There was a problem deleting the user.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("User Data", 20, 20);
    const tableColumn = [
      "Date",
      "Company Name",
      "Plan Title",
      "Name",
      "Email",
      "Mobile",
      "User Role",
      "Address",
    ];
    const tableRows = data.map((item) => [
      new Date(item.createdAt).toLocaleDateString(),
      item.companyName,
      item.plan?.PlanTitle || "N/A",
      `${item.Admin.firstname} ${item.Admin.lastname}`,
      item.Admin.email,
      item.Admin.mobile,
      item.Admin.userRole,
      item.address,
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("UserData.pdf");
  };

  const handleRowEditComplete = async ({ newData, index }) => {
    setLoading(true);
    const userId = data[index]._id;

    const updatedData = {
      ...data[index],
      Admin: {
        ...data[index].Admin,
        firstname: newData.Admin.firstname || data[index].Admin.firstname,
        lastname: newData.Admin.lastname || data[index].Admin.lastname,
        email: newData.email || data[index].Admin.email,
        mobile: newData.mobile || data[index].Admin.mobile,
        userRole: newData.Admin.userRole || data[index].Admin.userRole,
      },
      address: newData.address || data[index].address,
    };

    try {
      await axios.patch(`${API_BASE_URL}/company/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      Swal.fire("Success!", "User updated successfully.", "success");
      setData((prev) =>
        prev.map((user, i) => (i === index ? updatedData : user))
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update user.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const textEditor = (options) => (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
      required
    />
  );
  const MobileEditor = (options) => (
    <InputMask 
     mask="+91-9999999999"
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
      required
    />
  );

  const renderTableView = () => (
    <DataTable
      value={data}
      paginator
      rows={10}
      responsiveLayout="scroll"
      onRowEditComplete={handleRowEditComplete}
      editMode="row"
    >
      <Column
        header="Date"
        body={({ createdAt }) => new Date(createdAt).toLocaleDateString()}
      />
      <Column
        header="Name"
        field="Admin.firstname"
        body={({ logo, Admin }) => (
          <div className="flex">
            <div
              className="bg-danger"
              style={{
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                padding: "4px",
              }}
            >
              <img
                src={logo}
                width={"30px"}
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </div>
            <span className="ms-2">{`${Admin.firstname} ${Admin.lastname}`}</span>
          </div>
        )}
        sortable
        editor={textEditor}
      />
      <Column field="companyName" header="Company Name" editor={textEditor} />
      <Column
        field="Admin.email"
        header="Email"
        editor={textEditor}
        body={({ Admin }) => Admin?.email || "N/A"}
      />
      <Column
        field="Admin.mobile"
        header="Mobile"
        body={({ Admin }) => Admin.mobile}
        editor={MobileEditor}
      />
      <Column
        field="plan.PlanTitle"
        header="Plan Title"
        body={({ plan }) => plan?.PlanTitle || "N/A"}
        editor={textEditor}
      />
      <Column
        field="Admin.userRole"
        header="User Role"
        body={({ Admin }) => Admin.userRole}
        sortable
        editor={textEditor}
      />
      <Column field="address" header="Address" editor={textEditor} />
      <Column
        rowEditor
        headerStyle={{ width: "10%", minWidth: "8rem" }}
        bodyStyle={{ textAlign: "center" }}
      />
      <Column
        body={(rowData) => (
          <Button
            icon="pi pi-trash"
            className="ml-2"
            onClick={() => handleDelete(rowData._id)}
          />
        )}
      />
    </DataTable>
  );

  const renderGridView = () => (
    <Row>
      {data.map(({ _id, Admin, userRole, address }) => (
        <Col md={3} key={_id}>
          <div className="grid-item card">
            <h5>{`${Admin.firstname} ${Admin.lastname}`}</h5>
            <p>{userRole}</p>
            <ul>
              <li>{Admin.email}</li>
              <li>{Admin.mobile}</li>
              <li>{address}</li>
            </ul>
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <div>
      <div>
        <Button label="Table View" onClick={() => setView("table")} />
        <Button label="Grid View" onClick={() => setView("grid")} />
        <Button label="Export to Excel" onClick={exportToExcel} />
        <Button label="Export to PDF" onClick={exportToPDF} />
      </div>
      {data.length > 0 ? (
        view === "table" ? (
          renderTableView()
        ) : (
          renderGridView()
        )
      ) : (
        <h2>No data available</h2>
      )}
    </div>
  );
}
