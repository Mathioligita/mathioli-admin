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
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const accessToken = localStorage.getItem("accessToken");

    // Fetch Orders
    const fetchOrders = async () => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/admin/order`, { headers });
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
            await axios.patch(`${API_BASE_URL}/admin/order/${id}`, { orderStatus: newStatus }, { headers });

            setOrders((prev) =>
                prev.map((order) => (order._id === id ? { ...order, orderStatus: newStatus } : order))
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
            await axios.patch(`${API_BASE_URL}/admin/order/${id}`, { paymentStatus: newStatus }, { headers });

            setOrders((prev) =>
                prev.map((order) => (order._id === id ? { ...order, paymentStatus: newStatus } : order))
            );
            fetchOrders();

            Swal.fire("Updated!", "Payment status has been updated.", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update the payment status.", "error");
        }
    };

    const orderStatusOptions = [
        { label: "Processing", value: "Processing" },
        { label: "Shipped", value: "Shipped" },
        { label: "Delivered", value: "Delivered" },
        { label: "Cancel", value: "Cancel" },
    ];

    const paymentStatusOptions = [
        { label: "Payment Pending", value: "Payment Pending" },
        { label: "Payment Success", value: "Payment Success" },
        { label: "Processing", value: "Processing" },
        { label: "Shipped", value: "Shipped" },
        { label: "Delivered", value: "Delivered" },
        { label: "Cancel", value: "Cancel" },
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
                style={{all:"unset"}}
                className="p-button-rounded p-button-info"
                onClick={() => router.push(`/dashboard/orders/${rowData._id}`)}
            />
            <Button
                icon="pi pi-trash"
                style={{all:"unset"}}
                className="p-button-rounded p-button-danger"
                onClick={() => handleDelete(rowData._id)}
            />
        </div>
    );

    return (
        <div className="p-5 m-3">
            <div className="d-flex flex-wrap" style={{justifyContent:"space-between"}}>

            <div>

            <h3 className="text-start mb-3">Orders Management</h3>
            </div>

            {/* Search Bar */}
            <div className="mb-3 flex justify-content-between">
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
                <Column field="orderId" header="Order ID" sortable />
                <Column field="user.email" header="Customer Email" sortable />
                <Column field="orderTotal" header="Total Amount" sortable />
                <Column field="paymentStatus" header="Payment Status" sortable body={paymentTemplate} />
                <Column field="orderStatus" header="Order Status" sortable body={statusTemplate} />
                <Column field="createdAt" header="Date" sortable body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()} />
                <Column header="Actions" body={actionTemplate} />
            </DataTable>
        </div>
    );
};

export default OrderTable;
