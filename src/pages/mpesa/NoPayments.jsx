import * as React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
const NoPayments = () => {
  return (
    <div className="midlleware">
      <MDBCard>
        <MDBCardImage
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            position: "relative",
          }}
          src="data:image/png;base64,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"
          alt="..."
          position="top"
        />
        <h3 style={{position:'absolute', padding:'1rem'}}>
         <span style={{color:"red"}}>OPPS !!</span>   Error while try to pay
        </h3>
        <MDBCardBody>
          <MDBCardFooter style={{display:'flex', justifyContent:'space-evenly'}}>
           <Link to='/mpesa-payment'>
        <button style={{background:'red'}} className="buy">
            Try Again
        </button>
           </Link>
           <Link to='/'>
        <button className="buy">
           Return Home
        </button>
           </Link>
          </MDBCardFooter>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default NoPayments;
