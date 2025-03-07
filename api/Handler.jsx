

import axios from "axios";
import Cookies from "js-cookie"; // Import the library

const fetchHandler = async ({ method, endpoint, data }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  // const API_BASE_URLS = `${API_BASE_URL}${endpoint}`;
  const API_BASE_URLS = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
  };

  // Retrieve the access token from cookies
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const options = {
    method,
    url: API_BASE_URLS,
    headers,
    data: method !== "GET" ? data : undefined,
  };

  try {
    const response = await axios(options);
    return response?.data; // Return parsed response data
  } catch (error) {
    // Handle errors
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Clear the cookie and redirect on unauthorized access
        Cookies.remove("accessToken");
        return { isError: true, data: "Unauthorized access. Redirecting to login." };
      }

      if (status === 404) {
        return { isError: true, data: "Not Found" };
      }

      return { isError: true, data }; // Return the server error response
    } else {
      // Network or other error
      console.error("Network error:", error);
      return { isError: true, data: "We can't process your request at this time. Please try later." };
    }
  }
};

export default fetchHandler;
