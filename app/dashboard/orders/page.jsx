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
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import OrdersGereateinvoice from "./OrdersGereateinvoice";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/admin/order`, {
        headers,
      });
      if (response?.data?.data) {
        setOrders(response.data.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load orders. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete Order
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        await axios.delete(`${API_BASE_URL}/admin/order/${id}`, { headers });
        setOrders((prev) => prev.filter((order) => order._id !== id));
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        fetchOrders();
      } catch (error) {
        Swal.fire("Error", "Failed to delete the order.", "error");
      }
    }
  };

  // Update Order Status
  const handleOrderUpdate = async (id, newStatus) => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.patch(
        `${API_BASE_URL}/admin/order/${id}`,
        { orderStatus: newStatus },
        { headers }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, orderStatus: newStatus } : order
        )
      );
      fetchOrders();

      Swal.fire("Updated!", "Order status has been updated.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update the order status.", "error");
    }
  };

  // Update Payment Status
  const handlePaymentUpdate = async (id, newStatus) => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.patch(
        `${API_BASE_URL}/admin/order/${id}`,
        { paymentStatus: newStatus },
        { headers }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, paymentStatus: newStatus } : order
        )
      );
      fetchOrders();

      Swal.fire("Updated!", "Payment status has been updated.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update the payment status.", "error");
    }
  };

  const handleSubmit = async (rowData) => {
    console.log(rowData, "rowdata>>>>>>>>>>>>>>>");
    const lineItems = rowData?.orderItems?.map((item) => ({
      name: item.book.title,
      description: `Book by ${item.book.author}`,
      amount: item.book.price,
      currency: "INR",
      quantity: item.quantity,
    }));

    const payload = {
      orderId: rowData?.orderId,
      paymentId: rowData?.razorpayPaymentId,
      amount: rowData?.orderTotal,
      currency: "INR",
      description: "Invoice for Razorpay Payment",
      customer: {
        name: `${rowData?.shippingAddress?.name}`,
        email: rowData?.shippingAddress?.email,
        contact: rowData?.shippingAddress?.phone,
        address: rowData?.shippingAddress?.address,
        city: rowData?.shippingAddress?.city,
        state: rowData?.shippingAddress?.state,
        pincode: rowData?.shippingAddress?.postalCode,
        country: rowData?.shippingAddress?.country,
      },
      lineItems: lineItems,
      notes: {
        additional_info: "Any additional information related to the invoice",
      },
    };

    console.log(payload, "payload");

    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.post(
      `${API_BASE_URL}/admin/order/invoice`,
      { payload },
      { headers }
    );
    if (response) {
      const response = await axios.get(rowData.invoiceFile, {
        responseType: "blob",
      });
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      // Open the PDF in a new window
      window.open(fileURL);
    }
  };

  const orderStatusOptions = [
    { label: "Completed", value: "Completed" },
    { label: "Processing", value: "Processing" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancel", value: "Cancel" },
  ];

  const paymentStatusOptions = [
    { label: "Payment Pending", value: "Payment Pending" },
    { label: "Payment Success", value: "Payment success" },
  ];

  // Order Status Dropdown
  const statusTemplate = (rowData) => (
    <Dropdown
      value={rowData.orderStatus}
      options={orderStatusOptions}
      onChange={(e) => handleOrderUpdate(rowData.orderId, e.value)}
      placeholder="Select Status"
      className="p-inputtext-sm"
    />
  );

  // Payment Status Dropdown
  const paymentTemplate = (rowData) => (
    <Dropdown
      value={rowData.paymentStatus}
      options={paymentStatusOptions}
      onChange={(e) => handlePaymentUpdate(rowData.orderId, e.value)}
      placeholder="Select Payment Status"
      className="p-inputtext-sm"
    />
  );

  // Action Buttons
  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        style={{ all: "unset" }}
        className="p-button-rounded p-button-info"
        onClick={() => {
          setSelectedOrder(rowData);
          setShowModal(true);
        }}
      />
      {/* <Button
        icon="pi pi-trash"
        style={{ all: "unset" }}
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.orderId)}
      /> */}
    </div>
  );
  const actionTemplates = (rowData) => (
    <div className="flex gap-2">
      {/* <Button
        icon="pi pi-trash"
        style={{ all: "unset" }}
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.orderId)}
      /> */}

      {rowData?.razorpayPaymentId && (
        <Button
          style={{ all: "unset" }}
          icon="pi pi-print"
          onClick={() => handleSubmit(rowData)}
        >
          {/* <OrdersGereateinvoice rowData={rowData} handleSubmit={handleSubmit} /> */}
        </Button>
      )}
    </div>
  );

  // Order Details Modal
  const orderDetailsModal = () => (
    <Dialog
      header="Order Details"
      visible={showModal}
      style={{ width: "50vw" }}
      onHide={() => setShowModal(false)}
    >
      {selectedOrder && (
        <div>
          <p>
            <strong>Order ID:</strong> {selectedOrder.orderId}
          </p>
          <p>
            <strong>Customer Email:</strong> {selectedOrder.user.email}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{selectedOrder.orderTotal}
          </p>
          <p>
            <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
          </p>
          <p>
            <strong>Order Status:</strong> {selectedOrder.orderStatus}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(selectedOrder.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Shipping Address:</strong>
          </p>
          <p>{selectedOrder.shippingAddress.name}</p>
          <p>{selectedOrder.shippingAddress.address}</p>
          <p>
            {selectedOrder.shippingAddress.city},{" "}
            {selectedOrder.shippingAddress.state}
          </p>
          <p>
            {selectedOrder.shippingAddress.country} -{" "}
            {selectedOrder.shippingAddress.postalCode}
          </p>
          <p>
            <strong>Order Items:</strong>
          </p>
          <ul>
            {selectedOrder.orderItems.map((item, index) => (
              <li key={index}>
                {item.book.title} by {item.book.author} - Quantity:{" "}
                {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Dialog>
  );

  return (
    <div className="mt-3">
      <div className="d-flex flex-wrap" style={{ justifyContent: "start" }}>
        <div>
          {/* <h3 className="text-start mb-3">Orders Management</h3> */}
        </div>

        {/* Search Bar */}
        <div className="mb-3 ms-3 ">
          <InputText
            placeholder="Search by Order ID or Email"
            value={search}
            style={{ fontSize: "12px" }}
            onChange={(e) => setSearch(e.target.value)}
            className="p-inputtext-lg"
          />
        </div>
      </div>

      {/* PrimeReact DataTable */}
      <DataTable
        value={orders}
        paginator
        rows={10}
        className="rounded-1"
        rowsPerPageOptions={[5, 10, 20]}
        removableSort
        responsiveLayout="scroll"
        emptyMessage="No orders found."
      >
        <Column
          field="orderId"
          header="Order ID"
          sortable
          headerStyle={{ fontSize: "12px" }}
        />
        <Column
          field="user.email"
          header="Customer Email"
          headerStyle={{ fontSize: "12px" }}
          sortable
        />
        <Column
          field="orderTotal"
          header="Total Amount"
          headerStyle={{ fontSize: "12px" }}
          body={(rowData) => <span> ₹ {rowData.orderTotal}</span>}
          sortable
        />
        <Column
          field="paymentStatus"
          header="Payment Status"
          headerStyle={{ fontSize: "12px" }}
          sortable
          body={paymentTemplate}
        />
        <Column
          field="orderStatus"
          header="Order Status"
          sortable
          headerStyle={{ fontSize: "12px" }}
          body={statusTemplate}
        />
        <Column
          field="createdAt"
          header="Date"
          headerStyle={{ fontSize: "12px" }}
          sortable
          body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()}
        />
        <Column
          header="Actions"
          body={actionTemplate}
          headerStyle={{ fontSize: "12px" }}
        />
        <Column
          header="Invoice"
          body={actionTemplates}
          headerStyle={{ fontSize: "12px" }}
        />
      </DataTable>

      {/* Order Details Modal */}
      {orderDetailsModal()}
    </div>
  );
};

export default OrderTable;
