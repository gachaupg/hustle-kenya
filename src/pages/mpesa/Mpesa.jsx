import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { createProject } from "../../redux/features/mpesa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const Mpesa = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  const { user } = useSelector((state) => ({ ...state.auth }));
  const initalState = {
    phone: user?.result?.phone,
    amount: 50,
    name: user?.result?.name,
    email: user?.result?.email,
    Order_ID: user?.result?._id,
    location: user?.result?.location,
  };

  const [form, setForm] = useState(initalState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBlur = (e) => {
    e.preventDefault();
    if (form.phone.length < 10) {
      setError("Phone number should be at least 10 digits");
    } else {
      setError("");
    }
  };
  // console.log(user?.result?.phone);
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      name: user?.result?.name,
      email: user?.result?.email,
      Order_ID: user?.result?._id,
      location: user?.result?.location,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.amount) {
      dispatch(
        createProject({
          ...form,
          navigate,
          toast,
        })
      );
      //  if(users.amount===50 && user?.result?._id===users.Order_ID){
      setLoading(false);
      navigate("/control");
    }
    e.target.reset();
    //  navigate('/')
  };
  const id = user?.result?._id;
  console.log(form);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/mpesa/stkPush/${id}`
        );
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 1);
        setUsers(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Stack
          style={{
            display: "flex",
            marginTop: "5rem",
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={1}
        >
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ) : (
        <>
          <section>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <div className="col-md-6 mb-8 ">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Biling details</h5>

                    {users.map((i) => {
                      return <></>;
                    })}
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <p style={{ color: "blue" }}>
                        Hello {user?.result?.name} pay ksh 50 only to post
                        anything
                      </p>

                      <hr className="my-4" />
                      <div class="card mb-4">
                        <div class="card-header py-3">
                          <h5 class="mb-0">Summary</h5>
                        </div>
                        <div class="card-body">
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              Post per Product is
                              <span>ksh50.00</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                              Transaction Cost
                              <span>ksh0.00</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                              <div>
                                <strong>Total amount</strong>
                                <strong>
                                  <p class="mb-0">
                                    (including transitions cost)
                                  </p>
                                </strong>
                              </div>
                              <span>
                                <strong>ksh50.00</strong>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="checkoutForm3"
                          checked
                        />
                        <label className="form-check-label" for="checkoutForm3">
                          Mpesa
                        </label>
                      </div>

                      <div className="row mb-4">
                        {/* <div className="col"> */}
                        {/* <div className="form-outline"> */}
                        {/* <input type="text" id="" className="form-control" /> */}
                        {/* <label className="form-label" for=""> */}
                        {/* Mpesa User Name */}
                        {/* </label> */}
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      <div className="row mb-4"></div>

                      <button
                        style={{
                          textAlign: "center",
                          paddingBottom: "2rem",
                          backgroundColor: "green",
                        }}
                        className="btn btn-primary"
                        type="submit"
                      >
                        Pay With M-Pesa
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Mpesa;
