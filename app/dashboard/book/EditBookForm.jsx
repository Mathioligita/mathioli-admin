"use client";
import React, { useState, useEffect } from "react";
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

const EditBookForm = ({ id }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
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
        // audiobooks: book.audiobookUpload[0],
        isHardCopyAvailable: book.isHardCopyAvailable,
        isAudiobookAvailable: book.isAudiobookAvailable,
        isEBookAvailable: book.isEBookAvailable,
        // books: book?.bookimage[0],
        audiobookPrice: book.audiobookPrice,
        ebookPrice: book.EbookUpload,
        weightUnit: book?.weightUnit,
        weight: book?.weight,
        awardWinningBook: book?.awardWinningBook,
        newArrival: book?.newArrival,
      });
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBook();
  }, [id]);

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
          {/* <Col>
            <div className="d-flex">
              <div className="">
                <InputSwitch
                  checked={formData.isEBookAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isEBookAvailable: e.value })
                  }
                  className="mr-3"
                />
              </div>
              <div className="">
                <label>EBook Available</label> <br />
              </div>
            </div>
          </Col> */}

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
            </Col>
          )}
          {/* {formData?.isEBookAvailable && (
            <Col sm={12} md={4}>
              <div className=" d-flex mb-3">
              <div className="">
                <label>Upload Ebook Files</label>
                <input
                  type="file"
                  accept=".pdf,.epub"
                  multiple
                  onChange={(e) => handleFileChange(e, "ebooks")}
                />
              </div>
              </div>
            </Col>
          )} */}
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
          {/* {formData?.isEBookAvailable && (
            <Col>
              <div className=" ">
                <label>EBook Price</label> <br />
                <InputText
                  value={formData.ebookPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, ebookPrice: e.target.value })
                  }
                  className="w-100"
                />
              </div>
            </Col>
          )} */}
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
    </div>
  );
};

export default EditBookForm;
