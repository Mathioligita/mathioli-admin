
// "use client";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import React, { useEffect, useState } from "react";
// import { Dialog } from "primereact/dialog";
// import { API_BASE_URL } from "../../utlis";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Card } from "primereact/card";
// import axiosInstance from "../../../axiosConfig"
// import "../book/CreateBookForm.css"
// import { Col, Row } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// export default function Plan() {
//   const accessToken = localStorage.getItem("accessToken");
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     planName: "",
//     planType: "",
//     duration: "",
//     offerPrice: "",
//     price: "",

//     isTrialplan: false,
//   });

//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch plans on load
//   useEffect(() => {
//     // const headers = { Authorization: `Bearer ${accessToken}` };
//     axiosInstance.get(`/plans`,).then((res) => {
//       console.log(res)
//       setData(res.data.data.subscriptionPlans);
//     });
//   }, [accessToken]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [id]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Submit new plan
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     try {

//       await axiosInstance.post(`/plans`, formData,);
//       Swal.fire("Success!", "Plan added successfully.", "success");

//       // Reset form and close dialog
//       setFormData({
//         planName,
//         planType,
//         duration,
//         offerPrice,
//         price,
//         isTrialplan: false,
//       });
//       setVisible(false);

//       // Refresh the plan list
//       const res = await axiosInstance.get(`/plan/getallplan`,);
//       setData(res.data.data.plans);
//     } catch (error) {
//       console.error("Error submitting plan:", error);
//       setError("There was an issue adding the plan.");
//       Swal.fire("Error!", "Failed to add the plan.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     axios
//   }
//   const handleDelete = async(_id)=>{
//     // const deleteCategory = async (category) => {
//       const headers = { Authorization: `Bearer ${accessToken}` };

//       try {
//         const result = await Swal.fire({
//           title: "Are you sure?",
//           text: "This action cannot be undone!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#d33",
//           cancelButtonColor: "#3085d6",
//           confirmButtonText: "Yes, delete it!",
//         });

//         if (result.isConfirmed) {
//           await axios.delete(`${API_BASE_URL}/plans/${_id}`, {
//             headers,
//           });
//           Swal.fire("Deleted!", "Category has been deleted.", "success");
//           fetchCategories();
//         }
//       } catch (error) {
//         console.error("Error deleting category:", error);
//         Swal.fire("Error!", "There was an issue deleting the category.", "error");
//       }
//     // };
//   }

//   return (
//     <>
//       <div className="flex justify-content-between">
//         <div>
//           <h3>Manage Plans</h3>

//         </div>
//         <div>
//           <Button onClick={() => setVisible(true)}>
//             <i className="pi pi-plus-circle mr-2"></i>
//             Add New
//           </Button>
//         </div>
//       </div>

//       <div className="flex justify-content-center flex-wrap">
//         {data?.length > 0 ? (
//           data.map((item) => (
//             <Card key={item._id} className="col-3 m-2">
//               <div className="m-2 text-center">
//                 <h2>{item.
//                   planName
//                 }</h2>
//                 <p>{item.planType}</p>
//                 {/* <p>Price: Rs {item.offerPrice}</p> */}
//                 <p>
//                   duration: {item.
//                     duration}</p>
//                 {/* <p>Leads: {item.number_of_leads}</p> */}
//                 {/* <p>Storage: {item.storage}</p> */}
//                 <div className="flex justify-content-center gap-2">
//                   <Button  onClick={() => handleDelete(item._id)} icon="pi pi-trash"  />
//                   <Button  icon=" pi pi-pencil" onClick={() => handleEdit(item._id)}  />
//                 </div>
//               </div>
//             </Card>
//           ))
//         ) : (
//           <p>No plans available.</p>
//         )}
//       </div>

//       {/* <Dialog visible={visible} modal onHide={() => setVisible(false)} header="Add a New Plan"> */}

//       {visible && (
//         <div className="popup-overlay" >
//           <div className="popup-content w-50 h-50" onClick={(e) => e.stopPropagation()}>
//         <Row className="form ">


//           {Object.keys(formData).map((key) => (
//             <Col md={6} key={key} className="field mb-3">
//               <label htmlFor={key} className="block mb-2">
//                 {key === "isTrialplan" ? "Is Trial Plan?" : key.replace("_", " ").toUpperCase()}
//               </label>
//               {key === "isTrialplan" ? (
//                 <input
//                   id={key}
//                   type="checkbox"
//                   checked={formData[key]}
//                   onChange={handleChange}
//                   className="p-checkbox"
//                 />
//               ) : (
//                 <InputText
//                   id={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className="p-inputtext w-full"
//                 />
//               )}
//             </Col>
//           ))}
//           </Row>
//           <div className="flex justify-content-between">
//             <Button label="Submit" onClick={handleSubmit} className="p-button-success" loading={loading} />
//             <Button label="Cancel"  onClick={() => setVisible(false)} className="p-button-secondary" />
//           </div>
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//         </div>
//         // </div>
//       )}
//       {/* </Dialog> */}
//     </>
//   );
// }
// "use client";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import React, { useEffect, useState } from "react";
// import { Card } from "primereact/card";
// import Swal from "sweetalert2";
// import axiosInstance from "../../../axiosConfig";
// import "../book/CreateBookForm.css";
// import { Col, Row } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { API_BASE_URL } from "../../utlis";
// import axios from "axios";

// export default function Plan() {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     planName: "",
//     planType: "",
//     duration: "",
//     offerPrice: "",
//     price: "",
//     isTrialplan: false,
//   });

//   const [visible, setVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingPlanId, setEditingPlanId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch plans on load
//   useEffect(() => {

//     fetchdata()
//   }, []);
//   const fetchdata = async () => {

//     const res = await axiosInstance.get(`/plans`)
//     setData(res.data.data.subscriptionPlans);

//   }
//   // Handle form input changes
//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [id]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Submit new or edited plan
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (isEditing) {
//         await axiosInstance.put(`/plans/${editingPlanId}`, formData);
//         Swal.fire("Success!", "Plan updated successfully.", "success");
//       } else {
//         await axiosInstance.post(`/plans`, formData);
//         Swal.fire("Success!", "Plan added successfully.", "success");
//       }

//       setFormData({
//         planName: "",
//         planType: "",
//         duration: "",
//         offerPrice: "",
//         price: "",
//         isTrialplan: false,
//       });

//       setVisible(false);
//       setIsEditing(false);

//       const res = await axiosInstance.get(`/plans`);
//       setData(res.data.data.subscriptionPlans);
//     } catch (error) {
//       console.error("Error submitting plan:", error);
//       setError("There was an issue submitting the plan.");
//       Swal.fire("Error!", "Failed to submit the plan.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDataId =async(id)=>{
//     const res = await axiosInstance.get(`/plans/${id}`)
//     console.log(res)
//     setFormData({
//       planName: res.data.data.plans ||"",
//       planType: res.data.data.planType || "",
//       duration: res.data.data.duration || "",
//       offerPrice: res.data.data.offerPrice || "",
//       price: res.data.data.price || "",
//       isTrialplan: false,
//     });
//   }

//   // Handle edit button click
//   const handleEdit = (id) => {
//     const planToEdit = data.find((plan) => plan._id === id);
//     console.log(planToEdit,"planToEdit")
//     setFormData(planToEdit);
//     setEditingPlanId(id);
//     setIsEditing(true);
//     setVisible(true);
//   };
//   const handleDelete = async (_id) => {
//     const accessToken = localStorage.getItem("accessToken")
//     // const deleteCategory = async (category) => {
//     const headers = { Authorization: `Bearer ${accessToken}` };

//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "This action cannot be undone!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         await axios.delete(`${API_BASE_URL}/plans/${_id}`, {
//           headers,
//         });
//         Swal.fire("Deleted!", "Category has been deleted.", "success");
//         fetchdata();
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       Swal.fire("Error!", "There was an issue deleting the category.", "error");
//     }
//     // };
//   }

//   return (
//     <>
//       <div className="flex justify-content-between">
//         <h3>Manage Plans</h3>
//         <Button onClick={() => setVisible(true)}>
//           <i className="pi pi-plus-circle mr-2"></i>
//           Add New
//         </Button>
//       </div>

//       <div className="flex justify-content-center flex-wrap">
//         {data.length > 0 ? (
//           data.map((item) => (
//             <Card key={item._id} className="col-3 m-2">
//               <div className="m-2 text-center">
//                 <h2>{item.planName}</h2>
//                 <p>{item.planType}</p>
//                 <p>Duration: {item.duration}</p>
//                 <div className="flex justify-content-center gap-2">
//                   <Button icon="pi pi-pencil" onClick={() => handleEdit(item._id)} />
//                   <Button icon="pi pi-trash" onClick={() => handleDelete(item._id)} />
//                 </div>
//               </div>
//             </Card>
//           ))
//         ) : (
//           <p>No plans available.</p>
//         )}
//       </div>

//       {visible && (
//         <div className="popup-overlay" onClick={() => setVisible(false)}>
//           <div className="popup-content w-50 h-50" onClick={(e) => e.stopPropagation()}>
//             <Row>
//               {Object.keys(formData).map((key) => (
//                 <Col md={6} key={key} className="field mb-3">
//                   <label htmlFor={key} className="block mb-2">
//                     {key === "isTrialplan" ? "Is Trial Plan?" : key.replace("_", " ").toUpperCase()}
//                   </label>
//                   {key === "isTrialplan" ? (
//                     <input
//                       id={key}
//                       type="checkbox"
//                       checked={formData[key]}
//                       onChange={handleChange}
//                       className="p-checkbox"
//                     />
//                   ) : (
//                     <InputText
//                       id={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       className="p-inputtext w-full"
//                     />
//                   )}
//                 </Col>
//               ))}
//             </Row>
//             <div className="flex justify-content-between">
//               <Button
//                 label={isEditing ? "Update" : "Submit"}
//                 onClick={handleSubmit}
//                 className="p-button-success"
//                 loading={loading}
//               />
//               <Button
//                 label="Cancel"
//                 onClick={() => setVisible(false)}
//                 className="p-button-secondary"
//               />
//             </div>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import Swal from "sweetalert2";
import Cookies from "js-cookie"

import "../book/CreateBookForm.css";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import 'primeicons/primeicons.css';

export default function Plan() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    planName: "",
    planType: "",
    duration: "",
    offerPrice: "",
    price: "",
    isTrialplan: false,
  });
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get("accessToken")
  // Fetch plans on load
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await axios.get(`${API_BASE_URL}/plans`,{headers});
      setData(res.data.data.subscriptionPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      Swal.fire("Error!", "Failed to fetch plans.", "error");
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        await axios.put(`${API_BASE_URL}/plans/${editingPlanId}`, formData ,{headers} );
        Swal.fire("Success!", "Plan updated successfully.", "success");
      } else {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(`${API_BASE_URL}/plans`, formData,{headers} );
        Swal.fire("Success!", "Plan added successfully.", "success");
      }
      resetForm();
      fetchdata();
    } catch (error) {
      console.error("Error submitting plan:", error);
      setError("There was an issue submitting the plan.");
      Swal.fire("Error!", "Failed to submit the plan.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      planName: "",
      planType: "",
      duration: "",
      offerPrice: "",
      price: "",
      isTrialplan: false,
    });
    setVisible(false);
    setIsEditing(false);
    setEditingPlanId(null);
  };

  const handleEdit = (id) => {
    const planToEdit = data.find((plan) => plan._id === id);
    if (planToEdit) {
      setFormData(
        {

          planName: planToEdit.planName || "",
          planType: planToEdit.planType || "",
          duration: planToEdit.duration || "",
          offerPrice: planToEdit.offerPrice || "",
          price: planToEdit.price || "",
        }
      );
      setEditingPlanId(id);
      setIsEditing(true);
      setVisible(true);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        await axios.delete(`${API_BASE_URL}/plans/${_id}`,{headers});
        Swal.fire("Deleted!", "Plan has been deleted.", "success");
        fetchdata();
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      Swal.fire("Error!", "There was an issue deleting the plan.", "error");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h3> <i className="pi-arrow-left"></i> Manage Plans</h3>
        <Button onClick={() => setVisible(true)}>
          <i className="pi pi-plus-circle mr-2"></i>Add New
        </Button>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {data.length > 0 ? (
          data.map((item) => (
            <Card key={item._id} className="col-3 m-2">
              <div className="text-center m-2">
                <h2>{item.planName}</h2>
                <p>{item.planType}</p>
                <p>Duration: {item.duration}</p>
                <div className="d-flex justify-content-center gap-2">
                  <Button icon="pi pi-pencil" onClick={() => handleEdit(item._id)} />
                  <Button icon="pi pi-trash" onClick={() => handleDelete(item._id)} />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No plans available.</p>
        )}
      </div>

      {visible && (
        <div className="popup-overlay" onClick={() => setVisible(false)}>
          <div className="popup-content w-50 h-50" onClick={(e) => e.stopPropagation()}>
            <Row>
              {Object.keys(formData).map((key) => (
                <Col md={6} key={key} className="mb-3">
                  <label htmlFor={key} className="form-label">
                    {key === "isTrialplan" ? "Is Trial Plan?" : key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </label>
                  {key === "isTrialplan" ? (
                    <input
                      id={key}
                      type="checkbox"
                      checked={formData[key]}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                  ) : (
                    <InputText
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  )}
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-between mt-3">
              <Button label={isEditing ? "Update" : "Submit"} onClick={handleSubmit} className="btn-success" loading={loading} />
              <Button label="Cancel" onClick={resetForm} className="btn-secondary" />
            </div>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}