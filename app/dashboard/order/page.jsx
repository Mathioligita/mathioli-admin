"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Dropdown } from "primereact/dropdown";
import { API_BASE_URL } from "../../utlis";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';
import "./order.scss";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [exportOption, setExportOption] = useState(null);
  const dt = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/category`, { headers });
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open create category dialog
  const openNew = () => {
    setFormData({ name: "", description: "" });
    setCategoryDialog(true);
    setEditMode(false);
  };

  // Open edit category dialog
  const editCategory = (category) => {
    setFormData({ name: category.name, description: category.description });
    setSelectedCategory(category);
    setCategoryDialog(true);
    setEditMode(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Submit category (create or update)
  const submitCategory = async () => {
    setLoading(true);
    setError(null);
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      if (editMode && selectedCategory) {
        // Update category
        await axios.patch(
          `${API_BASE_URL}/category/${selectedCategory.slug}`,
          formData,
          { headers }
        );
        Swal.fire("Updated!", "Category updated successfully.", "success");
      } else {
        // Create category
        await axios.post(`${API_BASE_URL}/category`, formData, { headers });
        Swal.fire("Created!", "Category created successfully.", "success");
      }
      setCategoryDialog(false);
      fetchCategories();
    } catch (error) {
      console.error("Error submitting category:", error);
      setError("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (category) => {
    const headers = { Authorization: `Bearer ${accessToken}` };

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
        await axios.delete(`${API_BASE_URL}/category/${category.slug}`, {
          headers,
        });
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire("Error!", "There was an issue deleting the category.", "error");
    }
  };

  // Action buttons for table rows
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info"
          onClick={() => editCategory(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-info"
          onClick={() => deleteCategory(rowData)}
        />
      </div>
    );
  };

  // Export to PDF
  const exportPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "Description"]],
      body: categories.map((category) => [
        category.name,
        category.description,
      ]),
    });
    doc.save("categories.pdf");
  };

  // Export to Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');
    XLSX.writeFile(workbook, 'categories.xlsx');
  };

  // Handle export
  const handleExport = () => {
    if (exportOption && exportOption.value === "pdf") {
      exportPdf();
    } else if (exportOption && exportOption.value === "excel") {
      exportExcel();
    }
  };

  const exportOptions = [
    { label: "PDF Download", value: "pdf" },
    { label: "Excel Download", value: "excel" },
  ];


  const items = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
    { label: "Logout", icon: "pi pi-sign-out" },
  ];

  const menu = React.useRef(null);

  return (
    <div className="categories">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="p-input-icon-left">
          {/* <i className="pi pi-search " style={{ margin: "-7px 5px" }} />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            style={{ textIndent: "14px" }}
          /> */}
          <h2>Order</h2>
        </span>
        <div className="d-flex align-items-center button-color">
          <Button
            label="Create order"
            icon="pi pi-plus"
            className="p-button-success mr-2 mb-3"
            onClick={openNew}          
          />
        </div>
        {/* <hr />   */}
      </div>

      <hr />

      <div className="text-end">
        <button>Order ID</button>
      </div>


      <DataTable
        ref={dt}
        value={categories.map((category) => ({ ...category, key: category._id }))}
        paginator
        rows={10}
        className="datatable-responsive"
        emptyMessage="No categories found."
        globalFilter={globalFilter}
      >
        <Column
        className=""
          header="Select"
          body={(rowData) => (
            <div className="flex justify-content-center">
              <input
                type="radio"
                value={rowData.key}
                onChange={(e) => console.log('Selected:', e.target.value)}
              />
            </div>
          )}
        ></Column>
        <Column field="Order Id" header="Order Id" className=""></Column>
        <Column field="Email" header="Email"></Column>
        <Column field="Ordered Books" header="Ordered Books"></Column>
        <Column field="Total Price" header="Total Price"></Column>
        <Column field="Payment Status" header="Payment Status"></Column>
        <Column field="Location" header="Location"></Column>
        {/* <Column
          header="Active"
          body={(rowData) => (
            <div className="flex justify-content-center">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={rowData.isActive}
                  onChange={(e) => {
                    const isActive = e.target.checked;
                    console.log(`Row ${rowData.key} is now: ${isActive ? 'Active' : 'Inactive'}`);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}
        ></Column> */}
        <Column header="Actions" body={actionBodyTemplate}></Column>
      </DataTable>



      {categoryDialog && (
        <div className="custom-modal-overlay" onClick={() => setCategoryDialog(false)}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="d-flex">
                <i className="pi pi-arrow-left icosn"></i>
                <h2>{editMode ? "Edit Category" : "New Category"}</h2>
              </div>
              <button className="close-button" onClick={() => setCategoryDialog(false)}>
                &times;
              </button>
            </div>
            <div className="custom-modal-content">
              <div className="form">
                <div className="field mb-3">
                  <label htmlFor="name" className="block mb-2">Title</label>
                  <InputText
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-inputtext w-full"
                  />
                </div>
                <div className="field mb-3">
                  <label htmlFor="description" className="block mb-2">Description</label>
                  <InputText
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="p-inputtext w-full"
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-content-end gap-2">
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    className="p-button-secondary"
                    onClick={() => setCategoryDialog(false)}
                  />
                  <Button
                    style={{ background: "#1D5755" }}
                    label="Submit"
                    icon="pi pi-check"
                    className="p-button-success"
                    onClick={submitCategory}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}