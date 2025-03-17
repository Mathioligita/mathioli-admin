
"use client";
import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateBookForm.css";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../utlis";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import "./createbook.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const EditBookForm = ({ id }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorBiography: "",
    genre: "",
    quantity: "",
    category: "",
    publishDate: null,
    publisher: "",
    language: "",
    pages: "",
    newArrival: false,
    description: "",
    price: "",
    isHardCopyAvailable: false,
    awardWinningBook: false,
    isAudiobookAvailable: false,
    isEBookAvailable: false,
    books: [],
    audiobooks: [],
    ebooks: [],
    audiobookPrice: "",
    ebookPrice: "",
    weightUnit: "kg",
    weight: "",
  });

  const audioRef = useRef(null);

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
          formData[key].forEach((file, index) => {
            payload.append(`${key}[${index}]`, file);
          });
        } else {
          payload.append(key, formData[key]);
        }
      }
    });

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/book/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response, "response");
      if (response) {
        Swal.fire({
          title: "Success!",
          text: "Book updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.push("/dashboard/book");
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the book.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred while updating the book.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/category`, { headers });
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBook = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/book/${id}`, {
        headers,
      });
      const book = response.data.data.book[0];
      setFormData({
        title: book.title,
        author: book.author,
        authorBiography: book.authorBiography,
        genre: book.genre,
        quantity: book?.quantity,
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
        audiobookPrice: book.audiobookPrice,
        ebookPrice: book.EbookUpload,
        weightUnit: book?.weightUnit,
        weight: book?.weight,
        awardWinningBook: book?.awardWinningBook,
        newArrival: book?.newArrival,
        books: book?.bookimage || [],
        audiobooks: book?.audiobookUpload || [],
      });
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBook();
  }, [id]);

  const handleTimeUpdate = () => {
    if (audioRef.current.audio.current.currentTime > 30) {
      setIsDisabled(true);
    }
  };

  return (
    <div className="p-5 m-2">
      <div className="">
        <Row>
          <Col sm={12} md={12}>
            <div className="">
              <label>Upload Book Images</label> <br />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, "books")}
              />
              {formData?.books?.map((file, index) => (
                <div key={index}>{file?.name}</div>
              ))}
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>Title</label> <br />
              <InputText
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-100"
              />
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>Author</label> <br />
              <InputText
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-100"
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
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
                className="w-100"
              />
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>Price</label> <br />
              <InputText
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-100"
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
                options={categories.map((item) => item.name)}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.value })
                }
                className="w-100"
                placeholder="Select a Category"
              />
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>Publish Date</label> <br />
              <Calendar
                value={formData.publishDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishDate: e.value })
                }
                className="w-100"
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
                onChange={(e) =>
                  setFormData({ ...formData, publisher: e.target.value })
                }
                className="w-100"
              />
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>Language</label> <br />
              <InputText
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                className="w-100"
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
                onChange={(e) =>
                  setFormData({ ...formData, pages: e.target.value })
                }
                className="w-100"
              />
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>quantity</label> <br />
              <InputText
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-100"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <div className="">
              <label>Author Biography</label> <br />
              <InputTextarea
                value={formData.authorBiography}
                onChange={(e) =>
                  setFormData({ ...formData, authorBiography: e.target.value })
                }
                rows={5}
                cols={30}
                className="w-100"
              />
            </div>
          </Col>
          <Col sm={12}>
            <div className=" ">
              <label>Description</label> <br />
              <InputTextarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={5}
                cols={30}
                className="w-100"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className=" d-flex">
              <div className="mr-3">
                <InputSwitch
                  checked={formData.isHardCopyAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isHardCopyAvailable: e.value })
                  }
                />
              </div>
              <div className="">
                <label>Hard Copy Available</label> <br />
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex">
              <div className="">
                <InputSwitch
                  checked={formData.isAudiobookAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isAudiobookAvailable: e.value })
                  }
                  className="mr-3"
                />
              </div>
              <div className="">
                <label>Audiobook Available</label> <br />
              </div>
            </div>
          </Col>
          <Col>
            <div className=" d-flex">
              <div className="">
                <InputSwitch
                  checked={formData.awardWinningBook}
                  className="mr-3"
                  onChange={(e) =>
                    setFormData({ ...formData, awardWinningBook: e.value })
                  }
                />
              </div>
              <div className="">
                <label>Award Winning Book</label> <br />
              </div>
            </div>
          </Col>
          <Col>
            <div className=" d-flex">
              <div className="">
                <InputSwitch
                  checked={formData.newArrival}
                  className="mr-3"
                  onChange={(e) =>
                    setFormData({ ...formData, newArrival: e.value })
                  }
                />
              </div>
              <div className="">
                <label>New Arrival</label> <br />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {formData?.isAudiobookAvailable && (
            <Col sm={12} md={4}>
              <div className="d-flex">
                <div className="mb-3">
                  <label>Upload Audiobook Files</label>
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "audiobooks")}
                  />
                  {formData?.audiobooks?.map((file, index) => (
                    <div key={index}>{file.name}</div>
                  ))}
                </div>
                <div>
                  <Button
                    label="Preview"
                    onClick={() => setIsPopupVisible(true)}
                    className="p-button-secondary"
                  />
                </div>
              </div>
            </Col>
          )}
        </Row>

        <Row>
          {formData?.isAudiobookAvailable && (
            <Col>
              <div className=" ">
                <label>Audiobook Price</label> <br />
                <InputText
                  value={formData.audiobookPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, audiobookPrice: e.target.value })
                  }
                  className="w-100"
                />
              </div>
            </Col>
          )}
        </Row>

        <Row>
          <Col>
            <div className=" ">
              <label>Weight</label> <br />
              <InputText
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-100"
              />
            </div>
          </Col>
          <Col>
            <div className=" ">
              <label>Weight Unit</label> <br />
              <Dropdown
                value={formData.weightUnit}
                options={["kg", "g", "lb", "oz"]}
                onChange={(e) =>
                  setFormData({ ...formData, weightUnit: e.value })
                }
                className="w-100"
                placeholder="Select a Unit"
              />
            </div>
          </Col>
        </Row>

        <div className="p-grid">
          <div className="btn-change">
            <Button label="Submit" onClick={handleSubmit} />
          </div>
          <Button
            label="Close"
            className="p-button-secondary d-none"
            onClick={() => setIsPopupVisible(false)}
          />
        </div>
      </div>

      {/* Popup for Image and Audio Preview */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-contents">
            <div className="d-flex">
              <div className="p-2">
                <div className="d-flex">
                  <div>
                    <img
                      src={formData.books[0]}
                      alt=""
                      style={{
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "15px",
                        padding: "2px",
                      }}
                    />
                  </div>
                  <div className="my-auto">
                    <h4 className="m-2">{formData.title}</h4>
                  </div>
                </div>
              </div>
              <div
                style={{
                  pointerEvents: isDisabled ? "none" : "auto",
                  opacity: isDisabled ? 0.5 : 1,
                }}
                className="w-50 ms-auto mt-auto"
              >
                <AudioPlayer
                  ref={audioRef}
                  autoPlay
                  src={formData.audiobooks[0]}
                  onPlay={(e) => console.log("onPlay")}
                  onListen={handleTimeUpdate} // Track time and disable after 30 sec
                  controls
                  className="w-100"
                />
              </div>
              <div onClick={() => setIsPopupVisible(false)} className="my-auto">
                <i className="pi pi-times ms-4 fw-1"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBookForm;
