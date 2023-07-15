import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteTour } from "../../redux/features/productSlice";
import {toast} from 'react-toastify'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
    deleteTodo,
    getTodos,
    rejectUser,
    updateTodo,
  } from "../../redux/features/todosSlice";
  import moment from "moment";
  import { useNavigate } from "react-router-dom";
function ResponsiveExample() {


     const [todo, setTodo] = useState({
    status: false,
    isComplete: false,
  });




  const [users, setUsers] = useState([]);
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  const dispatch=useDispatch()
  const { user } = useSelector((state) => ({ ...state.auth }));
const[loading, setLoading]=useState(true)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };
  const todosState = useSelector((state) => state.todosState);
  const { todos } = todosState;

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
console.log(todos);
//   const handleDelete = (id) => {
//     dispatch(deleteTodo(id));
//   };
  const handleSubmit = (e) => {
    // e.preventDefault();
    window.alert("are sure  you want to temporarily deactivate  this user");
    if (todo._id) {
      dispatch(updateTodo(todo));
     
    }
    setTodo({
      isComplete: false,
      status: false,
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete1 = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    window.alert("are sure  you want to activate this user");
    if (todo._id) {
      dispatch(rejectUser(todo));
      
    }
    setTodo({
      isComplete: false,
      status: false,
    });
  };
  const id = user?.result?._id;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/mpesa/stkPush`
        );
        // res.data.sort(compare);
        // const result = res.data.filter((_, index) => index < 30);
        setUsers(res.data);
        setLoading(false)
        console.log("user", users);
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
      <>
     <Stack spacing={1}>
       {/* For variant="text", adjust the height via font-size */}
       <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
       {/* For other variants, adjust the size with `width` and `height` */}
       <Skeleton variant="circular" width={40} height={40} />
       <Skeleton variant="rectangular" width={210} height={60} />
       <Skeleton variant="rounded" width={210} height={60} />
     </Stack>
     </>
   ) : (
    <Table responsive>
      <thead>
        <tr>
          {/* {Array.from({ length: 5 }).map((_, index) => ( */}
          <>
            <th> name</th>
            <th>Amount</th>
            <th>Phone</th>

            <th>Email</th>
            <th>Status</th>
           
            <th>Activate</th>
            <th>Reject</th>
            <th>Delete</th>

            
          </>

          {/* ))} */}
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr>

            <>
            <td key={index}>{item.name}</td>
            <td key={index}>{item.amount}</td>
            <td key={index}>{item.phone}</td>
            <td key={index}>{item.email}</td>
              <td key={index}>{item.isComplete===false ? 'Pending':'Active'}</td>
              <td key={index}>
              <form onSubmit={handleSubmit1} className="pending-btns">
              {todosState.getTodosStatus === "pending" ? "loading" : null}

              <button
                className="btn-admin"
                type="submit"
                onClick={() => setTodo({ ...todo })}
              >
                <h6 style={{}}>Activate user</h6>
              </button>
            </form>
              </td>
              <td key={index}>Reject</td>
              <td key={index} style={{color:'red',cursor:'pointer'}} onClick={() => handleDelete(item._id)} >Delete</td>
              
              

            </>
          </tr>
        ))}
      </tbody>
    </Table>
   )}
    </>
  );
}

export default ResponsiveExample;
