import { useEffect } from "react";
import fetchHandler from "./Handler";
import Cookies from "js-cookie";


export const CategoryAPI = async () => {
  // if (typeof window !== "undefined"){

    // const accessToken = Cookies.get("accessToken");
    try {
      if (accessToken) {
        const response = await fetchHandler({
          method: "GET",
          endpoint: `/category`,

        });
        // await addToCartAPI();

        return response;
      } 
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
export const CategoryPatch = async (slug,data) => {
  // if (typeof window !== "undefined"){

    // const accessToken = Cookies.get("accessToken");
    try {
      if (accessToken) {
        const response = await fetchHandler({
          method: "PATCH",
          endpoint: `/category/${slug}`,
          data

        });
        // await addToCartAPI();

        return response;
      } 
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
export const CategoryPost = async (data) => {
  // if (typeof window !== "undefined"){

    // const accessToken = Cookies.get("accessToken");
    try {
      // if (accessToken) {
        const response = await fetchHandler({
          method: "POST",
          endpoint: `/category`,
          data

        });
        // await addToCartAPI();

        return response;
      // } 
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
export const CategoryDelete = async (slug) => {
  // if (typeof window !== "undefined"){

    // const accessToken = Cookies.get("accessToken");
    try {
      // if (accessToken) {
        const response = await fetchHandler({
          method: "DELETE",
          endpoint: `/category/${slug}`,
          data

        });
        // await addToCartAPI();

        return response;
      // } 
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
export const BookAPIGETSingle = async (id) => {
  // if (typeof window !== "undefined"){

  // const accessToken = Cookies.get("accessToken");
  try {
    // if (accessToken) {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/book/${id}`,


    });
    // await addToCartAPI();

    return response;
    // } 
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
export const BookAPIGET = async () => {
  // if (typeof window !== "undefined"){

  // const accessToken = Cookies.get("accessToken");
  try {
    // if (accessToken) {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/book`,


    });
    // await addToCartAPI();

    return response;
    // } 
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
export const BookAPIPOST = async (data) => {
  // if (typeof window !== "undefined"){

  // const accessToken = Cookies.get("accessToken");
  try {
    if (accessToken) {
      const response = await fetchHandler({
        method: "POST",
        endpoint: `/book`,
        data

      });
      // await addToCartAPI();

      return response;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
// };

export const BookDelete = async (slug) => {
  try {
    const response = await fetchHandler({
      method: "DELETE",
      endpoint: `/book/${slug}`,
    })
    return response
  } catch (error) {

  }
} 
export const BookPAtch = async (id,data) => {
  try {
    const response = await fetchHandler({
      method: "DELETE",
      endpoint: `/book/${id}`,
      data
    })
    return response
  } catch (error) {

  }
} 
export const PlanGET = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/plan/getallplan`,
      
    })
    return response
  } catch (error) {

  }
} 
export const companyGET = async () => {
  try {
    const response = await fetchHandler({
      method: "GET",
      endpoint: `/company`,
      
    })
    return response
  } catch (error) {

  }
} 
export const companyPOST = async () => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/company`,
      
    })
    return response
  } catch (error) {

  }
} 
export const CompanyShipping = async () => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/company`,
      
    })
    return response
  } catch (error) {

  }
} 
export const ShippingPOST = async (data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/shippingregion`,
      data
      
    })
    return response
  } catch (error) {

  }
} 
export const ShippingPATCH = async (currentId,data) => {
  try {
    const response = await fetchHandler({
      method: "PATCH",
      endpoint: `/shippingregion/${currentId}`,
      data
      
    })
    return response
  } catch (error) {

  }
} 
export const ShippingDElete = async (currentId) => {
  try {
    const response = await fetchHandler({
      method: "DELETE",
      endpoint: `/shippingregion/${currentId}`,
     
      
    })
    return response
  } catch (error) {

  }
} 
export const quoteGET = async () => {
  try {
    const response = await fetchHandler({
      method: "DELETE",
      endpoint: `/quote`,
     
      
    })
    return response
  } catch (error) {

  }
} 
export const quotePAtch = async (id,data) => {
  try {
    const response = await fetchHandler({
      method: "PATCH",
      endpoint: `/quote/${id}`,
     data
      
    })
    return response
  } catch (error) {

  }
} 
export const quotePOSt = async (data) => {
  try {
    const response = await fetchHandler({
      method: "POST",
      endpoint: `/quote`,
     data
      
    })
    return response
  } catch (error) {

  }
} 
export const quoteDelete = async (id) => {
  try {
    const response = await fetchHandler({
      method: "DELETE",
      endpoint: `/quote/${id}`,
     data
      
    })
    return response
  } catch (error) {

  }
} 