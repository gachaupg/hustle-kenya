import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
// import { useCreateProductMutation } from "../../services/appApi";
// import axios from "../../../axios";
// import "./NewProduct.css";

function NewProduct() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const initialState = {
    description: "",
    tell: "",
    discountPercentage: "",
    age: "",

    item: "",
    // description:"",
    // discountPercentage:"",
    // location:"",
    // age:"",
    infoAdd: "",
    price: "",
    category: "",
    brand: "",
    firstname: "",
    phone: "",
    lastname: "",
    address: "",
    specifications: "",
    specifications1: "",
    specifications2: "",
    specifications3: "",
    specifications4: "",
  };

  const dispatch = useDispatch();
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const d = new Date();
  let hours = d.getHours();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currenDate = date.getTime("h");
  const currentTime = new Date();

  const id = user?.result?._id;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/mpesa/stkPush/${id}`
        );
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 1);
        setUsers(result);
        if (users.amount < 50) {
          navigate("/mpesa-payment");
        }
        setLoading(false);
        console.log("date", users);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  // useEffect(()=>{
  //   if()
  // })

  const [images, setImages] = useState([]);

  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  //   const [createProduct, { isError, error, isLoading, isSuccess }] =
  // useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  const [form, setForm] = useState(initialState);
  console.log("form", form);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      images,
      tell: user?.result?.phone,
    }));
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form) {
      dispatch(createProject({ ...form, toast }));
    }
  };
  console.log(user?.result?.phone);
  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "pitz",
        uploadPreset: "peter-main",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  console.log("img", images);
  return (
    <>
      {users.amount < 50 ? (
        <></>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            action=""
            style={{ color: "black" }}
            className="maininfo"
            id="forms"
          >
            <h1>Post an Item</h1>
            {/* {user?.result?._id} */}
            
              <>
                <div className="sep">
                  <div className="sep-left">
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        required
                        onChange={(e) =>
                          setForm({ ...form, item: e.target.value })
                        }
                        type="text"
                        placeholder="item"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        required
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        type="text"
                        placeholder="Item description"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        required
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                        type="number"
                        placeholder="price"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        required
                        onChange={(e) =>
                          setForm({
                            ...form,
                            discountPercentage: e.target.value,
                          })
                        }
                        type="number"
                        placeholder="discount in percentage"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        required
                        onChange={(e) =>
                          setForm({ ...form, age: e.target.value })
                        }
                        type="number"
                        placeholder="Age in months "
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, brand: e.target.value })
                        }
                        type="text"
                        placeholder="Brand of the item"
                      />
                    </div>
                  </div>
                  <div className="sep-left">
                    <Form.Group
                      className="mb-1"
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                    >
                      <Form.Label>Select a Category</Form.Label>
                      <Form.Select>
                        <option value="technology">Technology</option>
                        <option value="beauty">Beauty</option>
                        <option value="phones">Phones</option>
                        <option value="laptops">Laptops</option>
                        <option value="electronics">Electronics</option>
                        <option value="funatures">Furnatures</option>
                        <option value="cars">Cars</option>
                        <option value="clothing">Clothing</option>
                        <option value="shoes">Shoes</option>
                        <option value="houses">Houses</option>
                        <option value="vacant">Vacant</option>
                        <option value="land">Plots</option>
                        <option value="others">Others</option>
                      </Form.Select>
                    </Form.Group>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, specifications: e.target.value })
                        }
                        type="text"
                        placeholder="first specification"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, specifications1: e.target.value })
                        }
                        type="text"
                        placeholder="second specification"
                      />{" "}
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, specifications2: e.target.value })
                        }
                        type="text"
                        placeholder="third specification"
                      />{" "}
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, specifications3: e.target.value })
                        }
                        type="text"
                        placeholder="fouth specification"
                      />{" "}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, specifications4: e.target.value })
                        }
                        type="text"
                        placeholder="last specification"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, infoAdd: e.target.value })
                        }
                        type="text"
                        placeholder="additional information"
                      />
                    </div>

                    <Form.Group className="mb-3">
                      <Button
                        style={{ width: "100%", textAlign: "center" }}
                        type="button"
                        onClick={showWidget}
                      >
                        Upload Images
                      </Button>

                      <div className="images-preview-container">
                        {images.map((image) => (
                          <div className="image-preview">
                            <img width={200} src={image.url} />
                            {imgToRemove != image.public_id && (
                              <i
                                className="fa fa-times-circle"
                                onClick={() => handleRemoveImg(image)}
                              ></i>
                            )}
                          </div>
                        ))}
                      </div>
                    </Form.Group>
                  </div>
                  <button
                    type="submit"
                    style={{ width: "90%", marginBottom: "1rem" }}
                    class="btn btn-primary btn-block"
                  >
                    Post the Product
                  </button>
                </div>
              </>
            
          </form>
        </>
      )}
    </>
  );
}

export default NewProduct;
