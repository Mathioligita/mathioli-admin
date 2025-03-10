// "use client";
// import "../leads/leads.scss"; // Ensure to import your CSS
// import { API_BASE_URL } from "@/utlis";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import React, { useEffect, useState } from "react";
// import { Dropdown } from "primereact/dropdown";
// import { useUserContext } from "@/app/ui/context/usecontext";
// import { Sidebar } from "primereact/sidebar";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Card, Col, Row } from "react-bootstrap";
// import UserDatatable from "./userDatatable";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const UserForm = ({
//   admin,
//   setAdmin,
//   companyName,
//   setCompanyName,
//   plan,
//   setPlan,
//   industry,
//   setIndustry,
//   address,
//   setAddress,
//   handleSubmit,
//   error,
//   options,
//   industries,
//   loading,
// }) => (
//   <form onSubmit={handleSubmit}>
//     <h2>Create Company</h2>
//     {error && <div style={{ color: "red" }}>{error}</div>}

//     <Row>
//       <Col>
//         <label>Company Name</label>
//         <InputText
//           name="companyName"
//           value={companyName}
//           placeholder="Company Name"
//           onChange={(e) => setCompanyName(e.target.value)}
//           required
//         />
//       </Col>
//     </Row>

//     <h3>Admin Details</h3>

//     <Row>
//       {["firstname", "lastname", "email", "mobile", "userRole"].map((field) => (
//         <Col lg={6} key={field}>
//           <Card>
//             <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//             <br />
//             <InputText
//               name={field}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={admin[field]}
//               onChange={(e) => setAdmin({ ...admin, [field]: e.target.value })}
//               required
//             />
//           </Card>
//         </Col>
//       ))}
//     </Row>

//     <Row>
//       <Col md={6}>
//         <Card>
//           <label>Plan</label>
//           <br />
//           <Dropdown
//             name="plan"
//             value={plan}
//             placeholder="Select Plan"
//             options={options}
//             onChange={(e) => setPlan(e.value)}
//             required
//           />
//         </Card>
//       </Col>
//       <Col md={6}>
//         <Card>
//           <label>Industry</label>
//           <br />
//           <Dropdown
//             name="industry"
//             value={industry}
//             placeholder="Select Industry"
//             options={industries}
//             onChange={(e) => setIndustry(e.value)}
//             required
//           />
//         </Card>
//       </Col>
//     </Row>
//     <Row>
//       <Col>
//         <Card>
//           <label>Address</label>
//           <br />
//           <InputTextarea
//             name="address"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </Card>
//       </Col>
//     </Row>
//     <Button
//       type="submit"
//       label={loading ? "Submitting..." : "Submit"}
//       loading={loading}
//     />
//   </form>
// );

// export default function Page() {
//   const [companyName, setCompanyName] = useState("");
//   const [plan, setPlan] = useState(null);
//   const [industry, setIndustry] = useState(null);
//   const [show, setShow] = useState(false);
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [industries, setIndustries] = useState([]);
//   const accessToken = localStorage.getItem("accessToken");
//   const [nodes, setNodes] = useState([]);
//   const [admin, setAdmin] = useState({
//     firstname: "",
//     lastname: "",
//     mobile: "",
//     email: "",
//     userRole: "Super Admin",
//   });

//   const { backgroundColor, textColor, fontFamily } = useUserContext();

//   // Fetching industries when component mounts
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${API_BASE_URL}/category`);
//         const industryData = response.data.data.map((industry) => ({
//           label: industry.categoryname,
//           value: industry._id,
//         }));
//         setIndustries(industryData);
//       } catch (error) {
//         handleFetchError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIndustries();
//   }, []);

//   const handleFetchError = (error) => {
//     setError(error.response?.data?.message || "An unexpected error occurred.");
//     console.error(error);
//   };

//   const handleShow = () => {
//     setShow((prev) => !prev);
//   };

//   const validateFields = () => {
//     return (
//       companyName &&
//       plan &&
//       industry &&
//       address &&
//       Object.values(admin).every((field) => field)
//     );
//   };

//   const fetchLeads = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/company`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       setNodes(response.data.data.company);
//     } catch (error) {
//       handleFetchError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!validateFields()) {
//       setError("Please fill in all required fields.");
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please fill in all required fields.",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_BASE_URL}/company`,
//         { companyName, Admin: admin, plan, address, industry },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Company created successfully.",
//       });
//       setShow();

//       await fetchLeads();

//       setCompanyName("");
//       setAdmin({
//         firstname: "",
//         lastname: "",
//         mobile: "",
//         email: "",
//         userRole: "Super Admin",
//       });
//       setPlan(null);
//       setAddress("");
//       setIndustry(null);
//     } catch (error) {
//       console.error(error?.response.data.errors
//       );
//       setError("An error occurred while submitting the form.");
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: error?.response?.data?.errors,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetching plans when component mounts
//   useEffect(() => {
//     const fetchAssignedList = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         setOptions(
//           response.data.data.plans.map((item) => ({
//             value: item._id,
//             label: item.PlanTitle,
//           }))
//         );
//       } catch (error) {
//         handleFetchError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAssignedList();
//   }, [accessToken]);

//   // Fetch leads on component mount
//   useEffect(() => {
//     fetchLeads();
//   }, [accessToken]);

//   return (
//     <>
//       <div className="container">
//         <div style={{ textAlign: "end" }}>
//           <Button
//             onClick={handleShow}
//             style={{
//               color: textColor,
//               fontFamily,
//               background: backgroundColor,
//             }}
//           >
//             Add Company
//           </Button>
//         </div>
//       </div>

//       <Sidebar
//         style={{ color: textColor, fontFamily, background: backgroundColor }}
//         visible={show}
//         position="right"
//         onHide={() => setShow(false)}
//       >
//         <UserForm
//           admin={admin}
//           setAdmin={setAdmin}
//           companyName={companyName}
//           setCompanyName={setCompanyName}
//           plan={plan}
//           setPlan={setPlan}
//           industry={industry}
//           setIndustry={setIndustry}
//           address={address}
//           setAddress={setAddress}
//           handleSubmit={handleSubmit}
//           error={error}
//           options={options}
//           industries={industries}
//           loading={loading}
//         />
//       </Sidebar>
//       <UserDatatable nodes={nodes} />
//     </>
//   );
// }
"use client";
import "../category/leads.scss"; // Ensure to import your CSS
import { API_BASE_URL } from "../../utlis";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
// import { useUserContext } from "@/app/ui/context/usecontext";
import { Sidebar } from "primereact/sidebar";
import { Card, Col, Row } from "react-bootstrap";
import UserDatatable from "./userDatatable";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputMask } from "primereact/inputmask";

// Validation schema using Yup
const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  plan: Yup.string().required("Plan is required"),
  industry: Yup.string().required("Industry is required"),
  admin: Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+91-\d{10}$/, "Mobile number must be in the format +91-XXXXXXXXXX"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    userRole: Yup.string().required("User role is required"),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      zipCode: Yup.string().required("Zip Code is required"),
    }),
  }),
});

// Reusable Input Field Component
const TextField = ({ name, label, formik }) => (
  <div>
    <label>{label}</label>
    <InputText
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.errors[name] && formik.touched[name] && (
      <div style={{ color: "red", fontSize: "small" }}>
        {formik.errors[name]}
      </div>
    )}
  </div>
);

// Company Form Component
const CompanyForm = ({ onSubmit, loading, error, industries, options }) => {
  const formik = useFormik({
    initialValues: {
      companyName: "",
      plan: null,
      industry: null,
      admin: {
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
        userRole: "Super Admin",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const dataToSubmit = {
        ...values,
        admin: {
          ...values.admin,
          email: values.admin.email.toLowerCase(),
        },
      };
      onSubmit(dataToSubmit);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Create Company</h2>
      {error && <div style={{ color: "red", fontSize: "small" }}>{error}</div>}

      <Row>
        <Col>
          <TextField name="companyName" label="Company Name" formik={formik} />
        </Col>
      </Row>

      <h3>Admin Details</h3>
      <Row>
        {["firstname", "lastname", "email"].map((field) => (
          <Col lg={6} key={field}>
            <Card>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <br />
              <InputText
                name={`admin.${field}`}
                value={formik.values.admin[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.admin && formik.errors.admin[field] && formik.touched.admin?.[field] && (
                <div style={{ color: "red", fontSize: "small" }}>
                  {formik.errors.admin[field]}
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <label>User Role</label>
            <br />
            <InputText
              name={`admin.userRole`}
              value={formik.values.admin.userRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.admin?.userRole && formik.touched.admin?.userRole && (
              <div style={{ color: "red", fontSize: "small" }}>
                {formik.errors.admin.userRole}
              </div>
            )}
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <label>Mobile</label>
            <br />
            <InputMask
              mask="+91-9999999999"
              name="admin.mobile"
              type="tel"
              value={formik.values.admin.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.admin?.mobile && formik.touched.admin?.mobile && (
              <div style={{ color: "red", fontSize: "small" }}>
                {formik.errors.admin.mobile}
              </div>
            )}
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <label>Plan</label>
            <br />
            <Dropdown
              name="plan"
              value={formik.values.plan}
              options={options}
              onChange={(e) => formik.setFieldValue("plan", e.value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.plan && formik.touched.plan && (
              <div style={{ color: "red", fontSize: "small" }}>
                {formik.errors.plan}
              </div>
            )}
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <label>Industry</label>
            <br />
            <Dropdown
              name="industry"
              value={formik.values.industry}
              options={industries}
              onChange={(e) => formik.setFieldValue("industry", e.value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.industry && formik.touched.industry && (
              <div style={{ color: "red", fontSize: "small" }}>
                {formik.errors.industry}
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <label>Address</label>
            {["street", "city", "state", "country", "zipCode"].map((field) => (
              <Col lg={6} key={field}>
                <Card>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <br />
                  <InputText
                    name={`admin.address.${field}`}
                    value={formik.values.admin.address[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.admin?.address && formik.errors.admin.address[field] && formik.touched.admin?.address?.[field] && (
                    <div style={{ color: "red", fontSize: "small" }}>
                      {formik.errors.admin.address[field]}
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Card>
        </Col>
      </Row>

      <Button
        type="submit"
        label={loading ? "Submitting..." : "Submit"}
        loading={loading}
      />
    </form>
  );
};

// Main Page Component
export default function Page() {
  // const { backgroundColor, textColor, fontFamily } = useUserContext();
  const accessToken = localStorage.getItem("accessToken");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [options, setOptions] = useState([]);
  const [nodes, setNodes] = useState([]);

  const fetchIndustries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/category`);
      const industryData = response.data.data.map((industry) => ({
        label: industry.categoryname,
        value: industry._id,
      }));
      setIndustries(industryData);
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/plan/getallplan`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setOptions(
        response.data.data.plans.map((item) => ({
          value: item._id,
          label: item.PlanTitle,
        }))
      );
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/company`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setNodes(response.data.data.company);
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${API_BASE_URL}/company`,
        {
          companyName: values.companyName,
          Admin: values.admin,
          plan: values.plan,
          // address: values.admin.address,
          industry: values.industry,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Company created successfully.",
      });
      setShow(false);
      await fetchLeads();
    } catch (error) {
      console.error(error?.response.data.errors);
      setError("An error occurred while submitting the form.");
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: error?.response?.data?.errors || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
    fetchAssignedList();
    fetchLeads();
  }, [accessToken]);

  return (
    <>
      <div className="container">
        <div style={{ textAlign: "end" }}>
          <Button
            onClick={() => setShow((prev) => !prev)}
           
          >
            Add Company
          </Button>
        </div>
      </div>

      <Sidebar
        // style={{ color: textColor, fontFamily, background: backgroundColor }}
        visible={show}
        position="right"
        onHide={() => setShow(false)}
      >
        <CompanyForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          industries={industries}
          options={options}
        />
      </Sidebar>
      <UserDatatable nodes={nodes} />
    </>
  );
}
