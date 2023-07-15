import React from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
  } from "mdb-react-ui-kit";
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
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';

const AllProductsPage = () => {


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
            `https://hustle-kenya-7azi.onrender.com/stats/clothing`
          );
          res.data.sort(compare);
        //   const result = res.data.filter((_, index) => index < 8);
          setUsers(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      fetchData();
    }, []);

  return (
    <>
    { loading ?(
      <Box sx={{ width: 800 ,display:'flex' ,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:'7rem'
      ,height:'20rem'}}>
      <Skeleton sx={{ width: 800 ,display:'flex' ,
      alignItems:'center'
      ,height:'1rem'}} />
      <Skeleton sx={{ width: 800 ,display:'flex' ,
      alignItems:'center'
      ,height:'1rem'}}  animation="wave" />
      <Skeleton sx={{ width: 800 ,display:'flex' ,
      alignItems:'center'
      ,height:'1rem'}} animation={false} />
      <Skeleton sx={{ width: 800 ,display:'flex' ,
      alignItems:'center'
      ,height:'1rem'}} animation={false} />
      <Skeleton sx={{ width: 800 ,display:'flex' ,
      alignItems:'center'
      ,height:'1rem'}} animation={false} />
    </Box>
    ):(
      <MDBContainer fluid className="my-5 text-center">
      <h4 className="mt-4 mb-5">
        <strong> All Clothings</strong>
      </h4>
      <div style={{ marginTop: "1rem" }} className="new-arrivals">
                {users.map((i) => {
                  const { images } = i;
                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/single-product/${i._id}`}
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
      </MDBContainer>
    ) }
   
    </>
  )
}

export default AllProductsPage