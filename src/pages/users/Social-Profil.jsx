import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
  } from "mdb-react-ui-kit";
import { useSelector } from 'react-redux';
const SocialProfil = () => {
    const { user } = useSelector((state) => ({ ...state.auth }));

    const {id}=useParams()
    const[users,setUsers]=useState([])

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
              `https://hustle-kenya-7azi.onrender.com/users/${id}`
            );
            // res.data.sort(compare);
            // const result = res.data.filter((_, index) => index
            setUsers(res.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);
  return (
    <section style={{ backgroundColor: "#eee" }}>
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
            <MDBBreadcrumbItem>
              <Link  to="/">Home</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <Link to="/social">All Users</Link>
            </MDBBreadcrumbItem>
          
            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src={users.img}
                alt="avatar"
                className="rounded-circle"
                style={{ width: "150px" }}
                fluid
              />
              <div className="d-flex justify-content-center mb-2">
              <a
                style={{ color: "black" }}
                href={`https://wa.me/${users.phone}`}
              >
                <MDBBtn outline className="ms-1">
                  Message
                </MDBBtn>
                </a>
              </div>
            </MDBCardBody>
          </MDBCard>
          {/* <MDBCard className="mb-4 mb-lg-0"> */}
            {/* {products.map((i) => { */}
            {/* //   return ( */}
                {/* // <MDBCardBody className="p-0"> */}
                  {/* <MDBListGroup flush className="rounded-3"> */}
                    {/* <MDBListGroupItem className="d-flex  align-items-center p-3"> */}
                      {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                      {/* <MDBCardText>Latest Item Posted</MDBCardText> */}
                    {/* </MDBListGroupItem> */}
                    {/* <MDBListGroupItem className="d-flex  align-items-center p-3"> */}
                      {/* <MDBIcon */}
                        {/* // fab */}
                        {/* // icon="github fa-lg" */}
                        {/* // style={{ color: "#333333" }} */}
                    {/* //   /> */}
                      {/* <MDBCardText>{i.item}</MDBCardText> */}
                    {/* </MDBListGroupItem> */}
                    {/* <MDBListGroupItem className="d-flex  align-items-center p-3"> */}
                      {/* <MDBIcon */}
                        {/* // fab */}
                        {/* // icon="twitter fa-lg" */}
                        {/* // style={{ color: "#55acee" }} */}
                    {/* //   /> */}
                      {/* <MDBCardText> Initial Price: ksh{i.price}</MDBCardText> */}
                    {/* </MDBListGroupItem> */}
                    {/* <MDBListGroupItem className="d-flex  align-items-center p-3"> */}
                      {/* <MDBIcon */}
                        {/* // fab */}
                        {/* // icon="instagram fa-lg" */}
                        {/* // style={{ color: "#ac2bac" }} */}
                    {/* //   /> */}
                      {/* <MDBCardText> */}
                        {/* Discount Price ksh{i.discountPrice} */}
                      {/* </MDBCardText> */}
                    {/* </MDBListGroupItem> */}
                    {/* <MDBListGroupItem className="d-flex  align-items-center p-3"> */}
                      {/* <MDBIcon */}
                        {/* // fab */}
                        {/* // icon="facebook fa-lg" */}
                        {/* // style={{ color: "#3b5998" }} */}
                    {/* //   /> */}
                      {/* <MDBCardText> */}
                        {/* Discount % {i.discountPercentage}% */}
                      {/* </MDBCardText> */}
                    {/* </MDBListGroupItem> */}
                  {/* </MDBListGroup> */}
                {/* </MDBCardBody> */}
            {/* //   ); */}
            {/* // })} */}
          {/* </MDBCard> */}
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Full Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {users.name}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {users.email}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {users.phone}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              {/* <hr /> */}
              {/* <MDBRow> */}
              {/* <MDBCol sm="3"> */}
              {/* <MDBCardText>Mobile</MDBCardText> */}
              {/* </MDBCol> */}
              {/* <MDBCol sm="9"> */}
              {/* <MDBCardText className="text-muted">(098) 765-4321</MDBCardText> *
              {/* </MDBCol> */}
              {/* </MDBRow> */}
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {users.location}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBRow>
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            {/* <MDBCol md="6"> */}
            {/* <MDBCard className="mb-4 mb-md-0"> */}
            {/* <MDBCardBody> */}
            {/* <MDBCardText className="mb-4"><span className="text-primary font-ita
            {/* <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Product
            {/* <MDBProgress className="rounded"> */}
            {/* <MDBProgressBar width={80} valuemin={0} valuemax={100} /> */}
            {/* </MDBProgress> */}
            {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>We
            {/* <MDBProgress className="rounded"> */}
            {/* <MDBProgressBar width={72} valuemin={0} valuemax={100} /> */}
            {/* </MDBProgress> */}
            {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>On
            {/* <MDBProgress className="rounded"> */}
            {/* <MDBProgressBar width={89} valuemin={0} valuemax={100} /> */}
            {/* </MDBProgress> */}
            {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mo
            {/* <MDBProgress className="rounded"> */}
            {/* <MDBProgressBar width={55} valuemin={0} valuemax={100} /> */}
            {/* </MDBProgress> */}
            {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Ba
            {/* <MDBProgress className="rounded"> */}
            {/* <MDBProgressBar width={66} valuemin={0} valuemax={100} /> */}
            {/* </MDBProgress> */}
            {/* </MDBCardBody> */}
            {/* </MDBCard> */}
            {/* </MDBCol> */}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  )
}

export default SocialProfil