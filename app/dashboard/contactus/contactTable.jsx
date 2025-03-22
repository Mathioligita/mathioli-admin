
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import Swal from "sweetalert2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Button } from "primereact/button";    
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");

  const followupStatusOptions = [
    { label: "Interested in a Book", value: "Interested in a Book" },
    { label: "Waiting for Response", value: "Waiting for Response" },
    { label: "Call Scheduled", value: "Call Scheduled" },
    {
      label: "Requested More Information",
      value: "Requested More Information",
    },
    { label: "Not Interested", value: "Not Interested" },
    { label: "Will Purchase Later", value: "Will Purchase Later" },
    // Add more statuses as needed
  ];
  const fetchContacts = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/contactus`, {
        headers,
      });
      if (response) {
        setContacts(response?.data?.data?.inquiries || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load contacts. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        await axios.delete(`${API_BASE_URL}/contactus/${id}`, { headers });
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
        Swal.fire("Deleted!", "Contact has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete the contact.", "error");
      }
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact({ ...contact });
    Swal.fire({
      title: "Edit Contact",
      html: `
        <input id="name" class="swal2-input" value="${contact.name}">
        <input id="email" class="swal2-input" value="${contact.email}">
        <input id="mobile" class="swal2-input" value="${contact.mobile}">
        <textarea id="message" class="swal2-textarea">${
          contact.message
        }</textarea>
        <select id="followupStatus" class="swal2-select">
          ${followupStatusOptions
            .map(
              (option) =>
                `<option value="${option.value}" ${
                  option.value === contact.followupStatus ? "selected" : ""
                }>${option.label}</option>`
            )
            .join("")}
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile").value;
        const message = document.getElementById("message").value;
        const followupStatus = document.getElementById("followupStatus").value;
        return { name, email, mobile, message, followupStatus };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const headers = { Authorization: `Bearer ${accessToken}` };
          await axios.put(
            `${API_BASE_URL}/contactus/${contact._id}`,
            result.value,
            { headers }
          );
          setContacts((prev) =>
            prev.map((c) =>
              c._id === contact._id ? { ...c, ...result.value } : c
            )
          );
          Swal.fire("Updated!", "Contact has been updated.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to update the contact.", "error");
        }
      }
    });
  };

  // const actionTemplate = (rowData) => (
  //   <div className="flex gap-2">
  //     {/* <Button
  //       icon="pi pi-pencil"
  //       style={{ all: "unset" }}
  //       className="p-button-rounded p-button-info"
  //       onClick={() => handleEdit(rowData)}
  //     /> */}
  //     <Button
  //       icon="pi pi-trash"
  //       style={{ all: "unset" }}
  //       className="p-button-rounded p-button-danger"
  //       onClick={() => handleDelete(rowData._id)}
  //     />
  //   </div>
  // );

  const followupStatusTemplate = (rowData) => (
    <Dropdown
      value={rowData?.followupStatus}
      options={followupStatusOptions}
      onChange={(e) => handleFollowupStatusChange(rowData, e.value)}
      placeholder="Select a Status"
    />
  );

  const handleFollowupStatusChange = async (data, newStatus) => {
    console.log(data, "data");
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.patch(
        `${API_BASE_URL}/contactus/${data._id}`,
        {
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          message: data.message,
          status: data.status,
          followupStatus: newStatus,
        },
        { headers }
      );
      // setContacts((prev) =>
      //   prev.map((contact) =>
      //     contact?._id === id
      //       ? { ...contact, followupStatus: newStatus }
      //       : contact
      //   )
      // );
      Swal.fire("Updated!", "Follow-up status has been updated.", "success");
      fetchContacts();
    } catch (error) {
      Swal.fire("Error", "Failed to update the follow-up status.", "error");
    }
  };

  return (
    <div className="container">
      {/* <h4 className="text-start mb-4">Contact Management</h4> */}

      {/* Search Bar */}
      <div className=" flex flex-wrap justify-content-between">
        <div>
          <InputText
            placeholder="Search by Name, Email"
            value={search}
            style={{ fontSize: "12px" }}
            onChange={(e) => setSearch(e.target.value)}
            className="p-inputtext-lg "
          />
        </div>
        <div>
          {/* <Button
            label=" Add Contact"
            icon="pi pi-plus"
            className="p-button-success p-button-rounded "
            onClick={() => router.push("/dashboard/contactus/create")}
          /> */}
        </div>
      </div>

      {/* PrimeReact DataTable */}
      <DataTable
        value={contacts}
        paginator
        rows={10}
        className="rounded-1"
        rowsPerPageOptions={[5, 10, 20]}
        removableSort
        responsiveLayout="scroll"
        globalFilter={search}
        emptyMessage="No contacts found."
      >
        <Column
          field="name"
          header="Name"
          style={{ textAlign: "start" }}
          sortable
        />
        <Column
          field="email"
          header="Email"
          style={{ textAlign: "start" }}
          sortable
        />
        <Column
          field="mobile"
          header="Mobile No"
          style={{ textAlign: "start" }}
          sortable
        />
        <Column
          field="message"
          header="Message"
          style={{ textAlign: "start" }}
        />
        <Column
          field="followupStatus"
          header="Followup Status"
          body={followupStatusTemplate}
          sortable
          style={{ textAlign: "start" }}
        />
        {/* <Column header="Actions" body={actionTemplate} /> */}
      </DataTable>
    </div>
  );
};

export default ContactTable;
