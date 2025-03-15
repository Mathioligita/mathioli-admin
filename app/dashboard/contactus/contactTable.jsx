// "use client"
// import React, { useEffect, useState } from 'react';
// import { Table, Button, Form, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

// import Swal from 'sweetalert2';
//  // Replace with your actual API import
// import './RoomsTable.css';
// import { FaPen, FaSearch } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utlis';
// import { useRouter } from 'next/navigation';

// const ContactTabe = () => {
//   const [filter, setFilter] = useState('');
//   const [search, setSearch] = useState('');
//   const [partydata, setPartyData] = useState([]);
//   const [loading, setLoading] = useState(true); // For loader
//   const router = useRouter();
//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     const fetchPartyHalls = async () => {
//       // setLoading(true)
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         const response = await axios.get(`${API_BASE_URL}/contactus`,{headers});
//         if (response) {
//           console.log(response, "response")
//           setPartyData(response?.data?.data?.inquiries || []);
//         }
//       } catch (error) {
//         console.error('Error fetching party halls:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load party halls. Please try again later.',
//         });
//       }
//     };
//     fetchPartyHalls();
//   }, []);

//   const uniquePurposes = [...new Set(partydata?.map((item) => item.purpose))];

//   const filteredPartyHalls = partydata.filter((party) => {
//     const matchesSearch =
//       party.name?.toLowerCase().includes(search.toLowerCase()) ||
//       party.email?.toLowerCase().includes(search.toLowerCase()) ||
//       party.mobileNo?.includes(search);

//     return filter ? party.purpose === filter && matchesSearch : matchesSearch;
//   });

//   const handleFilterChange = (event) => setFilter(event.target.value);
//   const handleSearchChange = (event) => setSearch(event.target.value);
//   const handleClearSearch = () => setSearch('');

//   const handleDelete = async (slug) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you really want to delete this party hall? This action cannot be undone.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//     });

//     if (result.isConfirmed) {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         const response = await axios.delete(`${API_BASE_URL}/contactus/${slug}`,{headers});
//         if (response) {
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: response.message,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           setPartyData((prevData) => prevData.filter((party) => party._id !== slug));
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'Failed to delete the party hall. Please try again.',
//           });
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: 'An unexpected error occurred. Please try again.',
//         });
//       }
//     }
//   };

//   // if (loading) {
//   //   return <div className="text-center">Loading...</div>;
//   // }

//   return (
//     <>

//       {

//         <div className="container">
//           <h2 className="text-center mb-4">Contact Management</h2>
//           <Row className='mbl-part'>

//             {/* <Col>
//               <InputGroup className="mt-4">
//                 <FormControl
//                   type="text"
//                   className=''
//                   placeholder="Search by Name, Email, or Mobile No"
//                   value={search}
//                   onChange={handleSearchChange}
//                 />
//                 <Button variant="outline-secondary" className='' onClick={handleClearSearch}>
//                   <FaSearch />
//                 </Button>
//               </InputGroup>
//             </Col> */}
//             <Col>
//               {/* <div className='d-flex ' style={{justifyContent:"end"}}>

//             <Button onClick={() => router('/partyhall/create')} className='mt-4' >Add Contact</Button>
//           </div> */}
//               <div className='text-end'>

//                 <Button className='mt-4 rounded-4 ' style={{ background: "hsla(150, 49%, 54%, 1)", border: "1px solid hsla(150, 49%, 54%, 1)" }} onClick={() => router.push('/dashboard/contactus/create')}>+ Add Contactus</Button>
//               </div>
//             </Col>
//           </Row>

//           <Table striped hover responsive>
//             <thead className="table-secondary">
//               <tr>
//                 {/* <th>Inquiry ID</th> */}
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mobile No</th>
//                 <th>message</th>
//                 {/* <th>Event Date</th> */}
//                 <th>Followup Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPartyHalls.length > 0 ? (
//                 filteredPartyHalls.map((party, index) => (
//                   <tr key={party.inquiryId || index}>
//                     {/* <td>{party.inquiryId}</td> */}
//                     <td>{party.name}</td>
//                     <td>{party.email}</td>
//                     <td>{party.mobile}</td>
//                     <td>{party.message}</td>
//                     {/* <td>{party.eventDate ? new Date(party.eventDate).toLocaleString() : 'N/A'}</td> */}
//                     <td>{party.followupStatus}</td>
//                     <td>
//                       <div className="d-flex gap-2" style={{ justifyContent: "center" }}>
//                         <Button variant="primary" onClick={() => router.push(`/contactus/${party._id}`)}>
//                           <FaPen />
//                         </Button>
//                         <Button variant="danger" onClick={() => handleDelete(party._id)}>
//                           <MdDelete />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     No Contact us found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//       }

//     </>
//   );
// };

// export default ContactTabe;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import Swal from "sweetalert2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
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

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        style={{ all: "unset" }}
        className="p-button-rounded p-button-info"
        onClick={() => router.push(`/dashboard/contactus/${rowData._id}`)}
      />
      <Button
        icon="pi pi-trash"
        style={{ all: "unset" }}
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData._id)}
      />
    </div>
  );

  return (
    <div className="container">
      <h4 className="text-start mb-4">Contact Management</h4>

      {/* Search Bar */}
      <div className="mb-3 flex flex-wrap justify-content-between">
        <div>
          <InputText
            placeholder="Search by Name, Email, or Mobile No"
            value={search}
            style={{ fontSize: "12px" }}
            onChange={(e) => setSearch(e.target.value)}
            className="p-inputtext-lg mb-3"
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
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="mobileNo" header="Mobile No" sortable />
        <Column field="message" header="Message" />
        <Column field="followupStatus" header="Followup Status" sortable />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default ContactTable;
