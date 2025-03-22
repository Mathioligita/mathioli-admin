// import { API_BASE_URL } from "@/app/utlis";
// import axios from "axios";
// import React from "react";

// export default function OrdersGereateinvoice({ rowData, handleSubmit }) {
//   const accessToken = localStorage.getItem("accessToken");
//   const handleSubmit = async () => {
//     const lineItems = orderItems.map((item) => ({
//       name: item.book.title,
//       description: `Book by ${item.book.author}`,
//       amount: item.book.price,
//       currency: "INR",
//       quantity: item.quantity,
//     }));
//     const paylod = {
//       orderId: rowData.orderId,
//       paymentId: rowData.paymentId,
//       amount: rowData.amount,
//       currency: rowData.currency,
//       description: rowData.description,
//       customer: {
//         name: `${rowData.shippingInfo.firstname}``${rowData.shippingInfo.lastname}`,
//         email: rowData.shippingInfo.email,
//         contact: rowData.shippingInfo.phone,
//         address: rowData.shippingInfo.streetaddress,
//         city: rowData.shippingInfo.district,
//         state: rowData.shippingInfo.state,
//         pincode: rowData.shippingInfo.postalCode,
//         country: rowData.shippingInfo.country,
//       },
//       lineItems: lineItems,
//       notes: {
//         additional_info: "Any additional information related to the invoice",
//       },
//     };

//     const headers = { Authorization: `Bearer ${accessToken}` };
//     const response = await axios.post(
//       `${API_BASE_URL}/admin/order/invoice`,
//       { paylod },
//       {
//         headers,
//       }
//     );
//   };
//   return <div></div>;
// }
