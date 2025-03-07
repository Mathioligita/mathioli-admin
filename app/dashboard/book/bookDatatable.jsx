

"use client"
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
// import { API_BASE_URL } from "../../utlis";
// import { useRouter } from "next/navigation";
import EditBookForm from "./EditBookForm";
import Link from "next/link";
import Swal from "sweetalert2";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
import "jspdf-autotable"; // For tables in PDF
import "./BookDetail.css"
// import Cookies from "js-cookie";
import { BookAPIGET, BookDelete } from "../../../api/page";
const BookTable = () => {
  const [books, setBooks] = useState([]);
  // const router = useRouter();
  // const accessToken = localStorage.getItem("accessToken");
  // const accessToken =Cookies.get("accessToken")
  const [visible, setVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BookAPIGET()
        // const headers = { Authorization: `Bearer ${accessToken}` };
        // const response = await axios.get(`${API_BASE_URL}/book`, { headers });
        setBooks(response?.data?.books);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (slug) => {
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
        // const response = await axios.delete(`${API_BASE_URL}/book/${slug}`);
        const response = await BookDelete(slug)
        if (response) {
          setBooks(books.filter((book) => book.slug !== slug));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (rowData) => {
    setSelectedBook(rowData.slug);
    setVisible(true);
  };

  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(books);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Books");
  //   XLSX.writeFile(wb, "books.xlsx");
  // };

  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   doc.autoTable({
  //     head: [["Title", "Author", "Genre", "Price"]],
  //     body: books.map((book) => [
  //       book.title,
  //       book.author,
  //       book.genre,
  //       book.price,
  //     ]),
  //   });
  //   doc.save("books.pdf");
  // };

  // const handlePrint = () => {
  //   const doc = new jsPDF();
  //   doc.autoTable({
  //     head: [["Title", "Author", "Genre", "Price"]],
  //     body: books.map((book) => [
  //       book.title,
  //       book.author,
  //       book.genre,
  //       book.price,
  //     ]),
  //   });
  //   doc.autoTable({ html: "#bookTable" });
  //   doc.save("books_print.pdf");
  // };

  return (
    <>
      <div>
        {/* <Button label="Export to Excel" onClick={exportToExcel} />
        <Button label="Export to PDF" onClick={exportToPDF} />
        <Button label="Print PDF" onClick={handlePrint} /> */}
        <div className="d-flex flex-column flex-sm-row justify-content-between">
            <div><h3>Top Books</h3></div>
            <div><Button label="Create Book"/></div>
        </div>

      </div>

      <DataTable value={books} className="justify-iteam-center">
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
        <Column
          header="Title"
          body={(rowData) => (
            <Link href={`/dashboard/book/${rowData.slug}`}>{rowData.title}</Link>
          )}
        />
        <Column field="author" header="Author" />
        <Column field="genre" header="Genre" />
        <Column field="price" header="Price" />
                <Column
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
                ></Column>
        <Column
          header="Actions"
          body={(rowData) => (
            <div>
              <Button label="Edit" onClick={() => handleEdit(rowData)} />
              <Button label="Delete" onClick={() => handleDelete(rowData.slug)} />
            </div>
          )}
        />
      </DataTable>
      {visible && <EditBookForm id={selectedBook} visible={visible} onClose={() => setVisible(false)} />}
    </>
  );
};

export default BookTable;
