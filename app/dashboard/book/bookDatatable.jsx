"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { API_BASE_URL } from "../../utlis";
import { useRouter } from "next/navigation";
import EditBookForm from "./EditBookForm";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For tables in PDF
import "./BookDetail.css";
import Cookies from "js-cookie";
import { InputSwitch } from "primereact/inputswitch";
const BookTable = () => {
  const [books, setBooks] = useState([]);
  const router = useRouter();
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = Cookies.get("accessToken");
  const [visible, setVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/book`, { headers });
      setBooks(response.data.data.books);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (slug) => {
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
      if (result) {
        const response = await axios.delete(`${API_BASE_URL}/book/${slug}`, {
          headers,
        });
        if (response) {
          Swal.fire("Books delete SuccessFully");
          setBooks(books.filter((book) => book.slug !== slug));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (rowData) => {
    router.push(`/dashboard/book/${rowData.slug}`);
    // setSelectedBook(rowData.slug);
    // setVisible(true);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(books);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Books");
    XLSX.writeFile(wb, "books.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Title", "Author", "Genre", "Price"]],
      body: books.map((book) => [
        book.title,
        book.author,
        book.genre,
        book.price,
      ]),
    });
    doc.save("books.pdf");
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Title", "Author", "Genre", "Price"]],
      body: books.map((book) => [
        book.title,
        book.author,
        book.genre,
        book.price,
      ]),
    });
    doc.autoTable({ html: "#bookTable" });
    doc.save("books_print.pdf");
  };

  // const toggleStatus = async (category) => {
  //   console.log(category, "catergory");
  //   const headers = { Authorization: `Bearer ${accessToken}` };
  //   const newStatus = category.status === 1 ? 1 : 0;

  //   try {
  //     // Check status from product if needed
  //     // const productStatus = await checkProductStatus(category);
  //     // if (productStatus !== newStatus) {
  //     //   Swal.fire("Error!", "Product status does not match.", "error");
  //     //   return;
  //     // }

  //     await axios.patch(
  //       `${API_BASE_URL}/book/${category.slug}`,
  //       { status: newStatus },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     Swal.fire("Updated!", "Category status updated successfully.", "success");
  //     fetchCategories(); // Refresh category list
  //   } catch (error) {
  //     console.error("Error updating category status:", error);
  //     Swal.fire("Error!", "Could not update status.", "error");
  //   }
  // };
  const toggleStatus = async (category) => {
    console.log(category?.status, "category");
    const headers = { Authorization: `Bearer ${accessToken}` };
    const newStatus = category?.status == 1 ? 0 : 1;
    console.log(newStatus, "newStatus");

    try {
      // Check status from product if needed
      // const productStatus = await checkProductStatus(category);
      // if (productStatus !== newStatus) {
      //   Swal.fire("Error!", "Product status does not match.", "error");
      //   return;
      // }

      // Create a FormData object

      const formData = new FormData();
      formData.append("status", newStatus);

      await axios.patch(`${API_BASE_URL}/book/${category.slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire("Updated!", "Category status updated successfully.", "success");
      fetchBooks(); // Refresh category list
    } catch (error) {
      console.error("Error updating category status:", error);
      Swal.fire("Error!", "Could not update status.", "error");
    }
  };

  const activeButton = (rowData) => {
    return (
      <InputSwitch
        checked={rowData.status == 1 ? true : false}
        onChange={() => toggleStatus(rowData)}
      />
    );
  };

  //---------------------------------------------------------
  const checkboxbook = (rowData) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault"></label>
      </div>
    );
  };

  return (
    <>
      <div className="m-auto" style={{ maxWidth: "1000px" }}>
        <div className="pt-3">
          <div className="d-flex">
            <div className="d-flex"> 
              <div >
                <Button
                  label="Export to Excel"
                  onClick={exportToExcel}
                  // className="mb-3"
                />
              </div>
              <div>
                <Button
                  label="Export to PDF"
                  onClick={exportToPDF}
                  // className="mb-3"
                />
              </div>
              {/* <Button label="Print PDF" onClick={handlePrint} className="mb-3" /> */}
            </div>

            <div className="ms-auto">
              <Button
                icon="pi pi-plus"
                label="Create Book"
                onClick={() => router.push("/dashboard/book/create")}
              />
            </div>
          </div>
          <div>
            <DataTable value={books} paginator rows={5}>
              {/* <Column headerStyle={{ width: "3rem" }} body={checkboxbook} /> */}
              <Column
                header="Title"
                body={(rowData) => (
                  <Link href={`/dashboard/book/${rowData.slug}`}>
                    {rowData.title}
                  </Link>
                )}
              />

              <Column field="author" header="Author" />
              <Column field="language" header="language" />
              <Column
                field="price"
                header="Price"
                body={(rowData) => <span>₹ {rowData.price}</span>}
              />
              <Column header="Active" body={activeButton} readOnly />
              <Column
                header="Actions"
                body={(rowData) => (
                  <div
                    className="d-flex "
                    style={{ justifyContent: "space-around" }}
                  >
                    <Button
                      icon="pi pi-pencil"
                      style={{ all: "unset  " }}
                      onClick={() => handleEdit(rowData)}
                    />
                    <Button
                      icon="pi pi-trash"
                      style={{ all: "unset" }}
                      onClick={() => handleDelete(rowData.slug)}
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
        {/* {visible && <EditBookForm id={selectedBook} visible={visible} onClose={() => setVisible(false)} />} */}
      </div>
    </>
  );
};

export default BookTable;
