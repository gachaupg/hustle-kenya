import axios from 'axios';
import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RedirectComponent = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const navigate = useNavigate();
  const id = user?.result?._id;

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
        const res = await axios.get(`https://hustle-kenya-7azi.onrender.com/mpesa/stkPush/${id}`);
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 1);
        setUsers(result);
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);

  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      const targetDate = new Date(users[0]?.createdAt);
      const currentDate = new Date();
      console.log(targetDate);
      const differenceInMinutes = Math.floor((currentDate - targetDate) / (1000 * 60));

      setTimeDifference(differenceInMinutes);
    }
  }, [users]);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (timeDifference < 3) {
        navigate('/new-product');
      } else {
        navigate('/no-payment');
      }
    }, 20000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate, timeDifference]);


  return <div className='midlleware'>
   <div>
    <h2>check your phone for an sim toolkit push to pay</h2>
   <MDBBtn disabled>
        <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
        Redirecting in 10 seconds...
      </MDBBtn>
   </div>
      
      {/* <MDBBtn disabled>
        <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
        check your phone for an sim toolkit push to pay
      </MDBBtn> */}
    
 <div>
      <MDBSpinner grow color='primary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='mx-2' color='secondary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow color='success'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='mx-2' color='warning'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow color='danger'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='mx-2' color='info'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow color='light'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='ms-2' color='dark'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </div>
    <div>
      {timeDifference !== null ? (
        <div>
          Time difference: {timeDifference} minutes
        </div>
      ) : (
        <div>
          Calculating time difference...
        </div>
      )}
    </div>
  </div>;
};

export default RedirectComponent;
