import { Link } from "react-router-dom";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
// import Link from '@mui/joy/Link';
import Favorite from "@mui/icons-material/Favorite";
import axios from "axios";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Button } from "@mui/material";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useState } from "react";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [users, setUsers] = React.useState([]);
  const [social, setSocial] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/products`
        );
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 8);
        setUsers(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/users`
        );
        res.data.sort(compare);

        const result = res.data.slice(0, 3); // Get the first four items

        setSocial(result);
        console.log("socials", social);
        lo;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // random

  const getRandomProducts = () => {
    const shuffled = social.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };
  const [randomProducts, setRandomProducts] = useState(getRandomProducts());

  const handleGenerate = () => {
    setRandomProducts(getRandomProducts());
  };

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const images = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath:
        "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      label: "Bird",
      imgPath:
        "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      label: "Bali, Indonesia",
      imgPath:
        "https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      label: "Bali, Indonesia",
      imgPath:
        "https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      label: "Goč, Serbia",
      imgPath:
        "https://images.pexels.com/photos/5414061/pexels-photo-5414061.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <>
      {loading ? (
        <>
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
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="rectangular" width={310} height={100} />
            <Skeleton variant="rounded" width={310} height={100} />
          </Stack>
        </>
      ) : (
        <>
          <div className="home-seperate">
            <div className="main-home">
              <div className="main-left">
                <div className="home-top">
                  <MDBDropdown>
                    <div></div>
                    <MDBDropdownToggle style={{ width: "18rem" }}>
                      Filter by Categories/Similar Products
                    </MDBDropdownToggle>
                    <MDBDropdownMenu style={{ width: "38%" }}>
                      <ul>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/beauty"
                        >
                          <li>Beauty Equipments</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/cars"
                        >
                          <li>Cars, Bikes & Spares</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/clothing"
                        >
                          <li>Fashion & Clothings</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/electronics"
                        >
                          <li>Electronics Equipments</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/furnatures"
                        >
                          <li>Furnatures & Wood Work</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/houses"
                        >
                          <li>Buildings & Homes</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/laptops"
                        >
                          <li>Laptops</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/phones"
                        >
                          <li>Phones</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/plots"
                        >
                          <li>Plots & Lands</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/shoes"
                        >
                          <li>Shoes</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/technology"
                        >
                          <li>Tech Gadgets</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/beauty"
                        >
                          <li>Beauty</li>
                        </Link>

                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/vacant"
                        >
                          <li>House for Rent</li>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "magenta" }}
                          to="/others"
                        >
                          <li>Others</li>
                        </Link>
                      </ul>
                    </MDBDropdownMenu>
                  </MDBDropdown>

                  <h1 style={{ color: "blue" }}>
                    Hustle <span style={{ color: "magenta" }}>Kenya</span>{" "}
                  </h1>
                  <h1>
                    {" "}
                    Welcome to Hustle Kenya ,
                    <br />
                    Buy and Sell second hand Items Easily
                  </h1>
                  <h4>Items Have upto 30% offer</h4>
                </div>
                <div className="main-bottom">
                  <Link to={user ? `/all-products-page` : `/register`}>
                    <button style={{ width: "70%" }}>
                      {!user ? (
                        <>Get started Today</>
                      ) : (
                        <>Explore The Products</>
                      )}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="main-right">
                <Box sx={{ maxWidth: 600 }}>
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: 20,
                      pl: 2,
                      bgcolor: "background.default",
                    }}
                  ></Paper>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {images.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              </div>
              <h1 style={{ textAlign: "center", color: "brown" }}>
                {" "}
                New Arrivals{" "}
              </h1>
              <div style={{ marginTop: "1rem" }} className="new-arrivals">
                {users?.map((i) => {
                  const { images } = i;
                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`single-product/${i._id}`}
                    >
                      <Card variant="outlined" sx={{ width: 260 }}>
                        <CardOverflow>
                          <AspectRatio ratio="2">
                            <img
                              style={{ objectFit: "contain", width: "100%" }}
                              src={images[0]?.url}
                              loading="lazy"
                              alt=""
                            />
                          </AspectRatio>
                          <IconButton
                            aria-label="Like minimal photography"
                            size="md"
                            variant="solid"
                            color="danger"
                            sx={{
                              position: "absolute",
                              zIndex: 2,
                              borderRadius: "50%",
                              right: "1rem",
                              bottom: 0,
                              transform: "translateY(50%)",
                            }}
                          >
                            <Favorite />
                          </IconButton>
                        </CardOverflow>
                        <div style={{ display: "flex" }}>
                          <CardContent>
                            <Typography level="h2" fontSize="md">
                              {i.item}
                            </Typography>
                            <Typography level="body2" sx={{ mt: 0.5 }}>
                              ksh {i.discountPrice}
                            </Typography>
                            <Typography>
                              discount {i.discountPercentage}%
                            </Typography>
                            <Typography
                              className="home-line"
                              level="body2"
                              sx={{ mt: 0.5 }}
                            >
                              ksh {i.price}
                              <div className="dis-lines"></div>
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography level="h2" fontSize="md">
                              <Link
                                href="#multiple-actions"
                                overlay
                                underline="none"
                              >
                                {/* {i.category} */}
                              </Link>
                            </Typography>
                            <Typography level="body2" sx={{ mt: 0.5 }}>
                              <Link href="#multiple-actions">{i.location}</Link>
                            </Typography>
                          </CardContent>
                        </div>

                        <CardOverflow
                          variant="soft"
                          sx={{ bgcolor: "background.level1" }}
                        >
                          <Divider inset="context" />
                          <CardContent orientation="horizontal">
                            {/* <Typography */}
                            {/* // level="body3" */}
                            {/* // sx={{ fontWeight: "md", color: "text.secondary" }} */}
                            {/* // > */}
                            {/* 6.3k likes */}
                            {/* </Typography> */}
                            <Divider orientation="vertical" />
                            <Typography
                              level="body3"
                              sx={{ fontWeight: "md", color: "text.secondary" }}
                            >
                              {i.age} months old
                            </Typography>
                          </CardContent>
                          <button className="buy">buy</button>
                        </CardOverflow>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="social-users">
              <h6 style={{ marginTop: ".5rem", color: "rebeccapurple" }}>
                radom users
              </h6>
              <div className="users-location">
                {social?.map((i) => {
                  return (
                    <>
                      {user && (
                        <Link to={`/social-profile/${i._id}`}>
                          <div className="users-location-details">
                            <img
                              style={{
                                width: "3rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={i.img}
                              alt=""
                            />
                            <h6>{i.name}</h6>
                          </div>
                        </Link>
                      )}
                    </>
                  );
                })}
                {user && (
                  <Link to="/social">
                    <h6>View More users</h6>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="more-products">
        <div>
          <Link to="/all-products-page">
            <button style={{ width: "20rem" }} className="buy">
              More Products
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
