// "use client"

// import React, { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// // import { contactusGetSingle, contactusPatch } from "../../../api/page";
// // import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../../utlis";
// import { useRouter } from "next/navigation";

// const EditcontactForm = ({id}) => {
//   const [initialData, setInitialData] = useState(null)
//   const accessToken = localStorage.getItem("accessToken");
//   const router = useRouter()

//   const Partyhall = async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     const response = await axios.get(`${API_BASE_URL}/contactus/${id}`,{headers})
//     if (response) {

//       setInitialData(response?.data)
//       console.log(response.data, "response")
//       // setInitialValues({

//       // })
//     }
//   }

//   useEffect(() => {
//     Partyhall()
//   }, [])
//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     mobile: Yup.string()
//       .matches(/^\d{10}$/, "Mobile number must be 10 digits")
//       .required("Mobile number is required"),
//     message: Yup.string().required("Message is required"),
//     // eventDate: Yup.date().required("Event date is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       mobile: "",
//       message: "",
//       // eventDate: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {

//       const response = axios.patch(`${API_BASE_URL}/contactus/${id}`,{values},{headers})
//       if (response) {
//         console.log(response, "response")
//         router.push("/contactus")
//       }

//     },
//   });

//   return (

//     <Form onSubmit={formik.handleSubmit} className="p-5">
//       <Form.Group controlId="name" className="mb-3">
//         <Form.Label>Name</Form.Label> <br />
//         <Form.Control
//           type="text"
//           name="name"
//           value={formik.values.name || initialData?.name}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.name && formik.errors.name}
//         />
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.name}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="email" className="mb-3">
//         <Form.Label>Email</Form.Label> <br />
//         <Form.Control
//           type="email"
//           name="email"
//           value={formik.values.email || initialData?.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.email && formik.errors.email}
//         />
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.email}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="mobile" className="mb-3">
//         <Form.Label>Mobile Number</Form.Label> <br />
//         <Form.Control
//           type="text"
//           name="mobile"
//           value={formik.values.mobile || initialData?.mobile}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.mobile && formik.errors.mobile}
//         />
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.mobile}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="message" className="mb-3">
//         <Form.Label>message</Form.Label> <br />
//         <Form.Control
//           type="text"
//           name="message"
//           value={formik.values.message || initialData?.message}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.message && formik.errors.message}
//         />
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.message}
//         </Form.Control.Feedback>
//       </Form.Group>

     

//       <div className='text-end'>

//         <Button className='mt-4 rounded-4 ' style={{ background: "hsla(150, 49%, 54%, 1)", border: "1px solid hsla(150, 49%, 54%, 1)" }} type="submit">Submit</Button>
//       </div>
//     </Form>
//   );
// };

// export default EditcontactForm;
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import { useRouter } from "next/navigation";

const EditContactForm = ({ id }) => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const router = useRouter();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.get(`${API_BASE_URL}/contactus/${id}`, { headers });
        setInitialData(response?.data?.data);
        console.log(response.data.data);
        
        

        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    enableReinitialize: true, // This ensures Formik updates when initialData changes
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      mobile: initialData?.mobile || "",
      message: initialData?.message || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.patch(`${API_BASE_URL}/contactus/${id}`, values, { headers });
        if (response.status === 200) {
          router.push("/dashboard/contactus");
        }
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    // <form onSubmit={formik.handleSubmit} className="p-5">
    //   {/* Name Field */}
    //   <div className="mb-3">
    //     <label htmlFor="name">Name</label>
    //     <InputText
    //       id="name"
    //       name="name"
    //       value={formik.values.name}
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //       className={`w-full ${formik.touched.name && formik.errors.name ? "p-invalid" : ""}`}
    //     />
    //     {formik.touched.name && formik.errors.name && (
    //       <small className="p-error">{formik.errors.name}</small>
    //     )}
    //   </div>

    //   {/* Email Field */}
    //   <div className="mb-3">
    //     <label htmlFor="email">Email</label>
    //     <InputText
    //       id="email"
    //       name="email"
    //       type="email"
    //       value={formik.values.email}
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //       className={`w-full ${formik.touched.email && formik.errors.email ? "p-invalid" : ""}`}
    //     />
    //     {formik.touched.email && formik.errors.email && (
    //       <small className="p-error">{formik.errors.email}</small>
    //     )}
    //   </div>

    //   {/* Mobile Number Field */}
    //   <div className="mb-3">
    //     <label htmlFor="mobile">Mobile Number</label>
    //     <InputText
    //       id="mobile"
    //       name="mobile"
    //       value={formik.values.mobile}
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //       className={`w-full ${formik.touched.mobile && formik.errors.mobile ? "p-invalid" : ""}`}
    //     />
    //     {formik.touched.mobile && formik.errors.mobile && (
    //       <small className="p-error">{formik.errors.mobile}</small>
    //     )}
    //   </div>

    //   {/* Message Field */}
    //   <div className="mb-3">
    //     <label htmlFor="message">Message</label>
    //     <InputTextarea
    //       id="message"
    //       name="message"
    //       rows={3}
    //       value={formik.values.message}
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //       className={`w-full ${formik.touched.message && formik.errors.message ? "p-invalid" : ""}`}
    //     />
    //     {formik.touched.message && formik.errors.message && (
    //       <small className="p-error">{formik.errors.message}</small>
    //     )}
    //   </div>

    //   <div className="text-end">
    //     <Button
    //       label="Submit"
    //       className="mt-4"
    //       severity="success"
    //       type="submit"
    //     />
    //   </div>
    // </form>
     <form onSubmit={formik.handleSubmit} className="p-4">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">Name</label>
            <InputText
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-inputtext-lg ${formik.touched.name && formik.errors.name ? 'p-invalid' : ''}`}
            />
            {formik.touched.name && formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
          </div>
    
          <div className="mb-3">
            <label htmlFor="email" className="block mb-2">Email</label>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-inputtext-lg ${formik.touched.email && formik.errors.email ? 'p-invalid' : ''}`}
            />
            {formik.touched.email && formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
          </div>
    
          <div className="mb-3">
            <label htmlFor="mobile" className="block mb-2">Mobile Number</label>
            <InputText
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-inputtext-lg ${formik.touched.mobile && formik.errors.mobile ? 'p-invalid' : ''}`}
            />
            {formik.touched.mobile && formik.errors.mobile && <small className="p-error">{formik.errors.mobile}</small>}
          </div>
    
          <div className="mb-3">
            <label htmlFor="message" className="block mb-2">Message</label>
            <InputTextarea
              id="message"
              name="message"
              rows={3}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-inputtext-lg ${formik.touched.message && formik.errors.message ? 'p-invalid' : ''}`}
            />
            {formik.touched.message && formik.errors.message && <small className="p-error">{formik.errors.message}</small>}
          </div>
    
          <div className="ms-auto">
            <Button
              type="submit"
              label="Submit"
              icon="pi pi-check"
              className="p-button-rounded p-button-success"
            />
          </div>
        </form>
  );
};

export default EditContactForm;
