
"use client";
import React, { useState, useEffect, useRef } from "react";
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
// import axios from "axios";
// import { API_BASE_URL } from "../../utlis";
import { Toast } from 'primereact/toast';
import { BookAPIPOST, CategoryAPI } from "../../../api/page";
const CreateBookForm = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const toast =useRef(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorBiography: "",
    genre: "",
    category: "",
    publishDate: null,
    publisher: "",
    newArrival:false,
    language: "",
    pages: "",
    description: "",
    price: "",
    isHardCopyAvailable: false,
    isAudiobookAvailable: false,
    isEBookAvailable: false,
    weightUnit:"",
    quantity:"",
    weight:"",
    books: [],
    audiobooks: [],
    ebooks: [],
  });

  const handleFileUpload = (files, setter) => {
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
          formData[key].forEach((file) => {
            payload.append(`${key}`, file);
          });
        } else {
          payload.append(key, formData[key]);
        }
      }
    });

    try {
      //  await axios.post(`${API_BASE_URL}/book`, payload, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': `Bearer ${accessToken}`,
      //   },
      // });
      const response = await BookAPIPOST(payload)
      if (response.status === 200) {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
        setIsPopupVisible(false);


      } else {
        toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
      }
    } catch (error) {
      console.error("Error creating book:", error);
      toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }
  };

  const fetchCategories = async () => {
    try {
      // const response = await axios.get(`${}/category`, {
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`,
      //   },
      // });
      const response = await CategoryAPI()
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <Button label="Create Book" onClick={() => setIsPopupVisible(true)} />

      {isPopupVisible && (
        <div className="popup-overlay" onClick={() => setIsPopupVisible(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Book</h2>

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
                      value={formData.category}
                      options={categories.map((item) => item.name)}
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
              <Col>
                  <div className=" ">
                    <label>New Arrival</label> <br />
                    <InputSwitch
                      checked={formData.newArrival}
                      onChange={(e) => setFormData({ ...formData, newArrival: e.value })}
                    />
                  </div>
                </Col>
              </Row>
              <Row>

              <Col>
                  <div className=" ">
                    <label> Weight Unit</label> <br />
                    <InputText
                      value={formData.weightUnit}
                      onChange={(e) => setFormData({ ...formData,  weightUnit: e.target.value })}
                    />
                  </div>
                </Col>
              <Col>
                  <div className=" ">
                    <label>  weight</label> <br />
                    <InputText
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData,   weight: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                {formData.isAudiobookAvailable && (
                  <Col>
                    <div className="">
                      <label>Upload Audiobook Files</label>
                      <input
                        type="file"
                        accept="audio/*"
                        multiple
                        onChange={(e) => handleFileChange(e, 'audiobooks')}
                      />
                    </div>
                  </Col>
                )}
                {formData.isEBookAvailable && (
                  <Col>
                    <div className="">
                      <label>Upload Ebook Files</label> <br />
                      <input
                        type="file"
                        accept=".pdf,.epub"
                        multiple
                        onChange={(e) => handleFileChange(e, 'ebooks')}
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
                      onChange={(e) => handleFileChange(e, 'books')}
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
                  onClick={() => setIsPopupVisible(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBookForm;
