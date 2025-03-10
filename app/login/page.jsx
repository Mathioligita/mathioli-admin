
"use client";

import { useState } from "react";
import axios from "axios";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_BASE_URL } from "../utlis";
import Cookies from "js-cookie"

export default function LoginPage() {
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/admins/login`, {
      // const response = await axios.post(`https://0b8c-2401-4900-3606-8a1-856d-803-647e-eabb.ngrok-free.app/api/v1/users/login`, {
        email: values.email,
        password: values.password,
      });
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      Cookies.set("accessToken", accessToken)
      Cookies.set("refreshToken", refreshToken)
      Swal.fire({
        title: "Success!",
        text: "Login successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      window.location.href = "/dashboard";
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Login failed. Please check your credentials.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Email is required"),
      password: yup.string()
        .min(5, "Minimum 5 characters required")
        .matches(passwordRules, "Password must contain uppercase, lowercase, and a number")
        .required("Password is required"),
    }),
    onSubmit: handleLogin,
  });

  const [loading, setLoading] = useState(false);


  return (
    <main className="flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden m-auto">
      <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div className="text-center mb-5 col-6">
          <div className="text-900 text-3xl font-medium mb-3">
            Welcome!
          </div>
          <span className="text-600 font-medium">Sign in to continue</span>
        </div>
        <div className="flex flex-column align-items-center justify-content-center col-6">
          <div className="surface-card py-8 px-5 sm:px-8" style={{ borderRadius: "53px" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-5">
                <InputText
                  id="email"
                  type="text"
                  placeholder="Email address"
                  value={values.email}
                  onChange={handleChange}
                  className={`w-min p-2 md:w-20rem border-2 text-primary ${errors.email && touched.email ? 'p-invalid' : ''}`}
                />   <br />
                {errors.email && touched.email && (
                  <>
                    <small className="p-error">{errors.email}</small>
                  </>
                )}
              </div>
              <div className=" mb-5">
                <Password
                  inputId="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  toggleMask
                  className="w-min"
                  inputClassName={`w-min p-2 md:w-20rem ${errors.password && touched.password ? 'p-invalid' : ''}`}
                /> <br />
                {errors.password && touched.password && (
                  <small className="p-error">{errors.password}</small>
                )}
              </div>
              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberMe"
                    id="rememberMe"
                    onChange={handleChange}
                    checked={values.rememberMe}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a
                  className="font-medium no-underline text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Forgot password?
                </a>
              </div>
              <Button
                label={loading ? "Signing In..." : "Sign In"}
                className="w-full p-2 text-xl bg-primary"
                type="submit"
                disabled={loading}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
