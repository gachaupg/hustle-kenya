import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveAppBar from "./components/Navbar";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewProduct from "./pages/products/NewProducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import Dashboard from "./pages/users/Dashboard";
import SingleProducts from "./pages/products/SingleProducts";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import AllProducts from "./pages/Admin/AllProducts";
import Profile from "./pages/users/Profile";
import SocialPlace from "./pages/users/SocialPlace";
import SocialProfil from "./pages/users/Social-Profil";
import Protected from "./services/PrivateRoute";
import Mpesa from "./pages/mpesa/Mpesa";
import Transactions from "./pages/Admin/Transactions";
import Footer from "./components/Footer";
import AllProductsPage from "./pages/products/AllProducts";
import Middleware from "./Middleware";
import NoPayments from "./pages/mpesa/NoPayments";
import Beauty from "./pages/categories/Beauty";
import Cars from "./pages/categories/Cars";
import Clothing from "./pages/categories/Clothing";
import Electronics from "./pages/categories/Electronics";
import Furnatures from "./pages/categories/Furnatures";
import Houses from "./pages/categories/Houses";
import Laptops from "./pages/categories/Laptops";
import Others from "./pages/categories/Others";
import Phones from "./pages/categories/Phones";
import Plots from "./pages/categories/Plots";
import Shoes from "./pages/categories/Shoes";
import Technology from "./pages/categories/Technology";
import VacantHouse from "./pages/categories/VacantHouse";
import Control from "./Control";

function App() {
  const dispatch = useDispatch();
  const [data, setDate] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/social" element={<SocialPlace />} />
          <Route path="/profile" element={<Profile />} />{" "}
          <Route path="/social" element={<SocialProfil />} />{" "}
          <Route path="/social-profile/:id" element={<SocialProfil />} />
          <Route
            path={`/users-dashboard/${user?.result?.name}`}
            element={<Dashboard />}
          />
          <Route path="new-product" element={<NewProduct />} />
          <Route
            path={`/admin-dashboard/${user?.result?.name}`}
            element={<AdminDashboard />}
          />
          <Route
            path={`/admin-dashboard/${user?.result?.name}`}
            element={<AdminDashboard />}
          />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/mpesa-payment" element={<Mpesa />} />
          {/* <Route path="/social" element={<SocialPlace/>}/> */}
          {/* <Route path="/social-profile/:id" element={<SocialProfil />} /> */}
          <Route path="/single-product/:id" element={<SingleProducts />} />
          {/* <Route */}
          {/* // path={`/users-dashboard/${user?.result?.name}`} */}
          {/* // element={<Dashboard />} */}
          {/* // /> */}
          {/* <Route */}
          {/* // path={`/admin-dashboard/${user?.result?.name}`} */}
          {/* // element={<AdminDashboard />} */}
          {/* // /> */}
          {/* <Route path="/users" element={<Users />} /> */}
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-transactions" element={<Transactions />} />
          <Route path="/all-products-page" element={<AllProductsPage />} />
          <Route path="/middleware" element={<Middleware />} />
          <Route path="/no-payment" element={<NoPayments />} />
          {/* categories */}
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/furnatures" element={<Furnatures />} />
          <Route path="/Houses" element={<Houses />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/others" element={<Others />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/plots" element={<Plots />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/vacant" element={<VacantHouse />} />
          <Route path="/control" element={<Control/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
