import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const SocialPlace = () => {
    const[users,setUsers]=useState([])
    const[loading, setLoading]=useState(true)

    function compare(a, b) {
        if (a._id < b._id) {
          return 1;
        }
        if (a._id > b._id) {
          return -1;
        }
        return 0;
      }
    useEffect(() => {
        async function fetchData() {
          try {
            const res = await axios.get(
              `https://hustle-kenya-7azi.onrender.com/users`
            );
            res.data.sort(compare);
            // const result = res.data.filter((_, index) => index
            setUsers(res.data);
            setLoading(false)
          } catch (error) {
            console.log(error);
            setLoading(false)

          }
        }
        fetchData();
      }, []);
  return (
    <>

{loading ? (
          <Stack style={{
            display: "flex",
            marginTop: "5rem",
            alignItems: "center",
            justifyContent: "center",
          }} spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
        ) : (<>

    <h2 style={{textAlign:'center'}}> Social Place</h2>
    

    <div class="row p-5 row-cols-1 row-cols-md-4 g-4">
        {users.map((user)=>{
return(
    
    <div className="col ">
    <div className="cardss">
    <Link to={`/social-profile/${user._id}`}>
      <img src={user.img} class="card-img-top" alt="Skyscrapers"/>
 
      <div class="card-body">
        <h5 class="card-title">{user.name}</h5>
        <p class="card-text">
            {user.location}
        </p>
        <p class="card-text">
            {user.phone}
</p>
      </div>
      </Link>
      <div class="card-footer d-flex " style={{display:'flex',
    justifyContent:"space-around"}}>
       <a
                style={{ color: "black" }}
                href={`https://wa.me/${users.phone}`}
              >
      <button type="button" class="btn btn-success">Message</button>
      </a>
      </div>
    </div>
  </div>
 
)
        })}
 
 

 
 
 

 
 
 
 
 
 
 
  {/* <div class="col"> */}
    {/* <div class="card h-100"> */}
      {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" class="card-img-top" alt="Los Angeles Skyscrapers"/> */}
      {/* <div class="card-body"> */}
        {/* <h5 class="card-title">Card title</h5> */}
        {/* <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p> */}
      {/* </div> */}
      {/* <div class="card-footer"> */}
        {/* <small class="text-muted">Last updated 3 mins ago</small> */}
      {/* </div> */}
    {/* </div> */}
  {/* </div> */}
  {/* <div class="col"> */}
    {/* <div class="card h-100"> */}
      {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp" class="card-img-top" alt="Palm Springs Road"/> */}
      {/* <div class="card-body"> */}
        {/* <h5 class="card-title">Card title</h5> */}
        {/* <p class="card-text"> */}
          {/* This is a wider card with supporting text below as a natural lead-in to */}
          {/* additional content. This card has even longer content than the first to show */}
          {/* that equal height action. */}
        {/* </p> */}
      {/* </div> */}
      {/* <div class="card-footer"> */}
        {/* <small class="text-muted">Last updated 3 mins ago</small> */}
      {/* </div> */}
    {/* </div> */}
  {/* </div> */}
</div>
</>)}     
</>


  )
}

export default SocialPlace