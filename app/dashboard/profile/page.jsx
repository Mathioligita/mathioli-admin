// "use client";
// import { Card } from "primereact/card";
// import "./profile.scss";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "@/utlis";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [image, setImage] = useState(null);
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     if (accessToken) {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       axios
//         .get(`${API_BASE_URL}/admin/me`, { headers })
//         .then((response) => {
//           setData(response.data.data);
//           setForm({
//             firstName: response.data.data.firstName || "",
//             lastName: response.data.data.lastName || "",
//             email: response.data.data.email || "",
//             phoneNumber: response.data.data.phoneNumber || "",
//           });
//           setImage(response.data.data.profileImage || null);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [accessToken]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = () => {
//     axios
//       .put(
//         `${API_BASE_URL}/admin/me`,
//         { headers },
//         {
//           firstName: firstName,
//           lastName: lastName,
//           email: email,
//           phoneNumber: phoneNumber,
//         }
//       )
//       .then((res) => {
//         console.log(res);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleShow = () => {
//     setShow(!show);
//   };

//   return (
//     <div>
//       {data ? (
//         <div>
//           <Card className="card">
//             <ul className="flex">
//               <li className="relative">
//                 <img
//                   src={image}
//                   alt={`${data.firstName} ${data.lastName}'s profile picture`}
//                   width="120px"
//                   className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
//                 />
//                 <i
//                   className="pi pi-pen-to-square absolute bottom-0 right-0 m-3 bg-white"
//                   onClick={handleShow}
//                 ></i>
//               </li>
//               <li className="font-semibold my-auto ms-4 uppercase text-2xl text-center">
//                 <h1>
//                   {data.firstName || "Name"}{" "}
//                   <span className="ms-2">{data.lastName}</span>
//                 </h1>
//                 <p className="font-normal text-base p-2">
//                   <span>{data.email || "N/A"}</span> <br />
//                   <span>{data.phoneNumber || "N/A"}</span>
//                 </p>
//               </li>
//             </ul>
//           </Card>
//           {show && (
//             <Card className="mt-3" onSubmit={handleSubmit}>
//               <div className="p-5">
//                 <div>
//                   <ul className="flex">
//                     <li className="       ">
//                       {image && (
//                         <div>
//                           {/* <h2>Preview:</h2> */}
//                           <img
//                             src={image}
//                             alt="Preview"
//                             className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
//                             style={{ maxWidth: "100%", maxHeight: "400px" }}
//                           />
//                         </div>
//                       )}
//                     </li>
//                     <li className="my-auto ">
//                       <input
//                         type="file"
//                         id="profileImage"
//                         className=""
//                         accept="image/*"
//                         onChange={handleFileChange}
//                       />
//                     </li>
//                   </ul>
//                   {/* <label htmlFor="profileImage">Profile Image:</label> */}
//                 </div>
//                 <div>
//                   <label htmlFor="firstName">First name: </label>
//                   <InputText
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     className="border-1 p-1"
//                     value={form.firstName}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="lastName" className="ms-2">
//                     Last name:{" "}
//                   </label>
//                   <InputText
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     className="border-1 p-1"
//                     value={form.lastName}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div></div>
//                 <div>
//                   <label htmlFor="email">Email: </label>
//                   <InputText
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="border-1 p-1 mt-2"
//                     value={form.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="phoneNumber">Phone Number: </label>
//                   <InputText
//                     type="text"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     className="border-1 p-1 mt-2"
//                     value={form.phoneNumber}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="">
//                   <button type="submit" className="border-round text-lg p-2 w-5rem h-2rem ms-auto bg-primary font-bold flex align-items-center justify-content-center">
//                     {" "}
//                     <i className="pi pi-check me-1"></i>save
//                   </button>
//                 </div>
//               </div>
//             </Card>
//           )}
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// }
// "use client";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { API_BASE_URL } from "@/utlis";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "./profile.scss";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [image, setImage] = useState(null);
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//   });

//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     if (accessToken) {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       axios
//         .get(`${API_BASE_URL}/admin/me`, { headers })
//         .then((response) => {
//           setData(response.data.data);
//           setForm({
//             firstName: response.data.data.firstName || "",
//             lastName: response.data.data.lastName || "",
//             email: response.data.data.email || "",
//             phoneNumber: response.data.data.phoneNumber || "",
//           });
//           setImage(response.data.data.profileImage || null);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [accessToken]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//     };

//     const formData = new FormData();
//     formData.append("firstName", form.firstName);
//     formData.append("lastName", form.lastName);
//     formData.append("email", form.email);
//     formData.append("phoneNumber", form.phoneNumber);
//     if (image) {
//       formData.append("profileImage", image);
//     }

//     axios
//       .put(`${API_BASE_URL}/admin/me`, formData, { headers })
//       .then((res) => {
//         console.log(res);

//       })
//       .catch((error) => {
//         console.error("Error updating profile:", error);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleShow = () => {
//     setShow(!show);
//   };

//   return (
//     <div>
//       {data ? (
//         <div>
//           <Card className="card">
//             <ul className="flex">
//               <li className="relative">
//                 <img
//                   src={image || "default-image-url"} // Fallback image URL
//                   alt={`${data.firstName} ${data.lastName}'s profile picture`}
//                   width="120px"
//                   className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
//                 />
//                 <i
//                   className="pi pi-pen-to-square absolute bottom-0 right-0 m-3 bg-white"
//                   onClick={handleShow}
//                 ></i>
//               </li>
//               <li className="font-semibold my-auto ms-4 uppercase text-2xl text-center">
//                 <h1>
//                   {data.firstName || "Name"} <span className="ms-2">{data.lastName}</span>
//                 </h1>
//                 <p className="font-normal text-base p-2">
//                   <span>{data.email || "N/A"}</span> <br />
//                   <span>{data.phoneNumber || "N/A"}</span>
//                 </p>
//               </li>
//             </ul>
//           </Card>
//           {show && (
//             <Card className="mt-3">
//               <div className="p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div>
//                     <ul className="flex">
//                       <li className="relative">
//                         {image && (
//                           <img
//                             src={image}
//                             alt="Preview"
//                             className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
//                             style={{ maxWidth: "100%", maxHeight: "400px" }}
//                           />
//                         )}
//                       </li>
//                       <li className="my-auto">
//                         <input
//                           type="file"
//                           id="profileImage"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                         />
//                       </li>
//                     </ul>
//                   </div>
//                   <div>
//                     <label htmlFor="firstName">First name: </label>
//                     <InputText
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       className="border-1 p-1"
//                       value={form.firstName}
//                       onChange={handleInputChange}
//                     />
//                     <label htmlFor="lastName" className="ms-2">Last name: </label>
//                     <InputText
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       className="border-1 p-1"
//                       value={form.lastName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email">Email: </label>
//                     <InputText
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="border-1 p-1 mt-2"
//                       value={form.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phoneNumber">Phone Number: </label>
//                     <InputText
//                       type="text"
//                       id="phoneNumber"
//                       name="phoneNumber"
//                       className="border-1 p-1 mt-2"
//                       value={form.phoneNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="mt-3">
//                     <Button type="submit" className="border-round text-lg p-2 w-5rem h-2rem ms-auto bg-primary font-bold flex align-items-center justify-content-center">
//                       <i className="pi pi-check me-1"></i> Save
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </Card>
//           )}
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// }
"use client";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { useEffect, useState } from "react";
// import { API_BASE_URL } from "@/utlis";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./profile.scss";
import Swal from "sweetalert2";

import { API_BASE_URL } from "../../utlis";
import Cookies from "js-cookie";
// import axiosInstance from "../../../axiosConfig";

export default function Profile() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [file, setFile] = useState(null);
  

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (accessToken) {
   
        const headers = { Authorization: `Bearer ${accessToken}` };
      
    
      axios
        .get(`${API_BASE_URL}/admins/me`,{headers} )
        .then((response) => {
          setData(response.data.data);
          setForm({
            firstName: response.data.data.firstName || "",
            lastName: response.data.data.lastName || "",
            email: response.data.data.email || "",
            phoneNumber: response.data.data.phoneNumber || "",
          });
          setImage(response.data.data.profileImage || null);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const headers = {
    //   Authorization: `Bearer ${accessToken}`,
    //   "Content-Type": "multipart/form-data",
    // };

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    // formData.append("phoneNumber", form.phoneNumber);
    // if (file) {
    //   formData.append("profileImage", file);
    // }

    axios
      .patch(`${API_BASE_URL}/admins/me`, formData )
      .then((res) => {
        console.log(res);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {data ? (
        <div>
          <Card className="card">
            <ul className="flex">
              <li className="relative">
                <img
                  src={image || "default-image-url"} 
                  alt={`${data.firstName} ${data.lastName}'s profile picture`}
                  width="120px"
                  className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
                />
                <i
                  className="pi pi-pen-to-square absolute bottom-0 right-0 m-3 bg-white "style={{ fontSize: '1.2rem',borderRadius:"50%" }}
                  onClick={handleShow}
                ></i>
              </li>
              <li className="font-semibold my-auto  uppercase text-lg list-inline-item ">
                <p>
                  {data.firstName || "Name"}{" "}
                  <span className="ms-2">{data.lastName}</span>
                </p>
                <p className="font-normal text-base p-2">
                  <span className="ms-5">
<i className="pi pi-envelope m-2 "  />
                    {data.email || "N/A"}</span> 
                    {/* <i className="pi pi-address-book ms-5 m-2"/> */}
                  {/* <span>{data.phoneNumber || "N/A"}</span> */}
                </p>
              </li>
            </ul>
          </Card>
          {show && (
            <Card className="mt-3 ">
              <div className="p-5 ">
                <form onSubmit={handleSubmit} className="">
                  <div>
                    <ul className="flex">
                      {/* <li className="relative">
                        {image && (
                          <img
                            src={image}
                            alt="Preview"
                            className="border-circle w-6rem h-6rem m-2 bg-primary font-bold flex align-items-center justify-content-center"
                            style={{ maxWidth: "100%", maxHeight: "400px" }}
                          />
                        )}
                      </li> */}
                      {/* <li className="my-auto">
                        <input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </li> */}
                    </ul>
                  </div>
                  <div>
                    <label htmlFor="firstName">First name: </label><br />
                    <InputText
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="border-1 p-1"
                      value={form.firstName}
                      onChange={handleInputChange}
                    />
                  
                  </div>
                  <div>
                  <label htmlFor="lastName" className="ms-2">
                      Last name:{" "} 
                    </label><br/>
                    <InputText
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="border-1 p-1"
                      value={form.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email: </label><br />
                    <InputText
                      type="email"
                      id="email"
                      name="email"
                      className="border-1 p-1 mt-2 "
                      value={form.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="phoneNumber">Phone Number: </label><br />
                    <InputText
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="border-1 p-1 mt-2 "
                      value={form.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div> */}
                  <div className="mt-3">
                    <Button
                      type="submit"
                      className="border-round text-lg p-2 w-5rem h-2rem  bg-primary font-bold flex align-items-center justify-content-center"
                    >
                      <i className="pi pi-check me-1"></i> Save
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
            
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
