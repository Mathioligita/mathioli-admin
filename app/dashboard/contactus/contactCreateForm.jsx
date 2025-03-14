// "use client";

// import React, { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { API_BASE_URL } from "../../utlis";
// import { useRouter } from "next/navigation";

// const ContactForm = () => {
//   const router = useRouter();
//   const [accessToken, setAccessToken] = useState(null);

//   useEffect(() => {
//     setAccessToken(localStorage.getItem("accessToken"));
//   }, []);

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     mobile: Yup.string()
//       .matches(/^\d{10}$/, "Mobile number must be 10 digits")
//       .required("Mobile number is required"),
//     message: Yup.string().required("Message is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       mobile: "",
//       message: "",
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         const response = await axios.post(`${API_BASE_URL}/contactus`, values, { headers });

//         if (response.status === 200) {
//           console.log("Form Submitted", response.data.message);
//           resetForm();
//           router.push("/contact"); // Redirect to contact page after success
//         }
//       } catch (error) {
//         console.error("Error submitting form", error);
//       }
//     },
//   });

//   return (
//     <Form onSubmit={formik.handleSubmit} className="p-4">
//       <Form.Group controlId="name" className="mb-3">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.name && formik.errors.name}
//         />
//         <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="email" className="mb-3">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.email && formik.errors.email}
//         />
//         <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="mobile" className="mb-3">
//         <Form.Label>Mobile Number</Form.Label>
//         <Form.Control
//           type="text"
//           name="mobile"
//           value={formik.values.mobile}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.mobile && formik.errors.mobile}
//         />
//         <Form.Control.Feedback type="invalid">{formik.errors.mobile}</Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="message" className="mb-3">
//         <Form.Label>Message</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           name="message"
//           value={formik.values.message}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.message && formik.errors.message}
//         />
//         <Form.Control.Feedback type="invalid">{formik.errors.message}</Form.Control.Feedback>
//       </Form.Group>

//       <div className="text-end">
//         <Button
//           type="submit"
//           className="mt-4 rounded-4"
//           style={{ background: "hsla(150, 49%, 54%, 1)", border: "1px solid hsla(150, 49%, 54%, 1)" }}
//         >
//           Submit
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default ContactForm;
"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";

const ContactForm = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await axios.post(`${API_BASE_URL}/contactus`, values, {
          headers,
        });

        if (response) {
          Swal.fire("Contact Created successfuly");
          resetForm();
          router.push("/dashboard/contactus");
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4">
      <div className="mb-3">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <InputText
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-inputtext-lg ${
            formik.touched.name && formik.errors.name ? "p-invalid" : ""
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <small className="p-error">{formik.errors.name}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <InputText
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-inputtext-lg ${
            formik.touched.email && formik.errors.email ? "p-invalid" : ""
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <small className="p-error">{formik.errors.email}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="mobile" className="block mb-2">
          Mobile Number
        </label>
        <InputText
          id="mobile"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-inputtext-lg ${
            formik.touched.mobile && formik.errors.mobile ? "p-invalid" : ""
          }`}
        />
        {formik.touched.mobile && formik.errors.mobile && (
          <small className="p-error">{formik.errors.mobile}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="block mb-2">
          Message
        </label>
        <InputTextarea
          id="message"
          name="message"
          rows={3}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-inputtext-lg ${
            formik.touched.message && formik.errors.message ? "p-invalid" : ""
          }`}
        />
        {formik.touched.message && formik.errors.message && (
          <small className="p-error">{formik.errors.message}</small>
        )}
      </div>

      <div className="text-end">
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

export default ContactForm;
