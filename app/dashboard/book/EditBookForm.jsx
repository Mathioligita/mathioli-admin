"use client";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CreateBookForm.css";
// import axiosInstance from "../../../axiosConfig";
import { Col, Row } from "react-bootstrap";
// import { useParams } from 'next/navigation';
import axios from "axios";
import { API_BASE_URL } from "../../utlis";
import { BookAPIGETSingle, BookPAtch } from "../../../api/page";

const EditBookForm = ({visible,id,onClose}) => {
    console.log(id,"id");
    
//   const { id } = useParams();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorBiography: "",
    genre: "",
    category: "",
    publishDate: null,
    publisher: "",
    language: "",
    pages: "",
    description: "",
    price: "",
    isHardCopyAvailable: false,
    isAudiobookAvailable: false,
    isEBookAvailable: false,
    bookimage: [],
    audiobookUpload: [],
    EbookUpload: [],
  });

  const handleFileUpload = (files, setter) => {
    console.log(`Uploading files for ${setter}:`, files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [setter]: [...prevFormData[setter], ...files],
    }));
  };

  const handleFileChange = (event, setter) => {
    const files = Array.from(event.target.files);
    handleFileUpload(files, setter);
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file, index) => {
            payload.append(`${key}[${index}]`, file);
          });
        } else {
          payload.append(key, formData[key]);
        }
      }
    });

    // Log the contents of the FormData object
    for (let pair of payload.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      // const response = await axios.patch(`${API_BASE_URL}/book/${id}`, payload, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      // });
      const data = payload
      const response = await BookPAtch(id,data)
      if (response) {
        alert("Book updated successfully");
      } else {
        alert("Error updating book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category`);
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBook = async () => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/book/${id}`);
      const response = await BookAPIGETSingle(id)
      const book = response.data.data.book[0];
      setFormData({
        title: book.title,
        author: book.author,
        authorBiography: book.authorBiography,
        genre: book.genre,
        category: book.category,
        publishDate: new Date(book.publishDate),
        publisher: book.publisher,
        language: book.language,
        pages: book.pages,
        description: book.description,
        price: book.price,
        isHardCopyAvailable: book.isHardCopyAvailable,
        isAudiobookAvailable: book.isAudiobookAvailable,
        isEBookAvailable: book.isEBookAvailable,
        bookimage: book.bookimage,
        audiobookUpload: book.audiobookUpload,
        EbookUpload: book.EbookUpload,
      });
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBook();
  }, [id]);

  console.log(formData, "categories");

  return (
    <div>
      {/* <Button label="Edit Book" onClick={() => setIsPopupVisible(true)} /> */}

      {visible && (
        <div className="popup-overlay" onClick={() => setIsPopupVisible(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Book</h2>

            <div className="">
              <Row>
                <Col>
                  <div className=" ">
                    <label>Title</label> <br />
                    <InputText
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>Author</label> <br />
                    <InputText
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className=" ">
                    <label>Genre</label> <br />
                    <InputText
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>Price</label> <br />
                    <InputText
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className=" ">
                    <label>Category</label> <br />
                    <Dropdown
                      value={formData?.category}
                      options={categories.map((item)=> item.name)}
                      onChange={(e) => setFormData({ ...formData, category: e.value })}
                      placeholder="Select a Category"
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>Publish Date</label> <br />
                    <Calendar
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className=" ">
                    <label>Publisher</label> <br />
                    <InputText
                      value={formData.publisher}
                      onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>Language</label> <br />
                    <InputText
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className=" ">
                    <label>Pages</label> <br />
                    <InputText
                      value={formData.pages}
                      onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="">
                    <label>Author Biography</label> <br />
                    <InputTextarea
                      value={formData.authorBiography}
                      onChange={(e) => setFormData({ ...formData, authorBiography: e.target.value })}
                      rows={5}
                      cols={30}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>Description</label> <br />
                    <InputTextarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      cols={30}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className=" ">
                    <label>Audiobook Available</label> <br />
                    <InputSwitch
                      checked={formData.isAudiobookAvailable}
                      onChange={(e) => setFormData({ ...formData, isAudiobookAvailable: e.value })}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>EBook Available</label> <br />
                    <InputSwitch
                      checked={formData.isEBookAvailable}
                      onChange={(e) => setFormData({ ...formData, isEBookAvailable: e.value })}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" ">
                    <label>Hard Copy Available</label> <br />
                    <InputSwitch
                      checked={formData.isHardCopyAvailable}
                      onChange={(e) => setFormData({ ...formData, isHardCopyAvailable: e.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                {formData?.isAudiobookAvailable && (
                  <Col>
                    <div className="">
                      <label>Upload Audiobook Files</label>
                      <input
                        type="file"
                        accept="audio/*"
                        multiple
                        onChange={(e) => handleFileChange(e, 'audiobookUpload')}
                      />
                    </div>
                  </Col>
                )}
                {formData?.isEBookAvailable && (
                  <Col>
                    <div className="">
                      <label>Upload Ebook Files</label> <br />
                      <input
                        type="file"
                        accept=".pdf,.epub"
                        multiple
                        onChange={(e) => handleFileChange(e, 'EbookUpload')}
                      />
                    </div>
                  </Col>
                )}
                <Col>
                  <div className="">
                    <label>Upload Book Images</label> <br />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange(e, 'bookimage')}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="p-grid">
              <div className="">
                <Button label="Submit" onClick={handleSubmit} />
                <Button
                  label="Close"
                  className="p-button-secondary"
                  onClick={ onClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBookForm;
