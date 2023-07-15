import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

const pages = ["Products", "Pricing", "Blog"];
const settings = [
  { one: "Profile" },
  { three: "Dashboard" },
  { four: "Login" },
  { five: "New Product" },
  { seven: "Admin" },

  { six: "Logout" },
];

function ResponsiveAppBar() {
  const { user, loading } = useSelector((state) => ({ ...state.auth }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  }));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{ color: "black ", background: "white" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link
            variant="h6"
            noWrap
            component="a"
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>


                </MenuItem> */}
              {/* ))} */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  {user?.result?._id && (
                    <Link to="/profile">
                      <Typography textAlign="center">{setting.one}</Typography>
                    </Link>
                  )}
                  {user?.result?._id && (
                    <Link to={`/users-dashboard/${user?.result?.name}`}>
                      <Typography textAlign="center">
                        {setting.three}
                      </Typography>
                    </Link>
                  )}
                  {user?.result?.admin === true && (
                    <Link to={`/admin-dashboard/${user?.result?.name}`}>
                      {setting.seven}
                    </Link>
                  )}
                  {user?.result?._id ? (
                    <>
                      <Typography
                        onClick={() => handleLogout()}
                        textAlign="center"
                      >
                        {setting.six}
                      </Typography>
                      <Link to="/mpesa-payment">
                        <Typography textAlign="center">
                          {setting.five}
                        </Typography>
                      </Link>
                    </>
                  ) : (
                    <Link to="/login">
                      <Typography textAlign="center">{setting.four}</Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
            
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for items ..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{ flexGrow: 1, ml: 20, display: { xs: "none", md: "flex" } }}
          >
            <Typography>Customer care: 0789312381</Typography>
            <Typography style={{ marginLeft: ".5rem" }}>
              <a style={{ color: "black" }} href="https://wa.me/0757198515">
                <WhatsAppIcon />
              </a>
            </Typography>

            <Typography style={{ marginLeft: ".5rem" }}>
              <a style={{ color: "black" }} href="href=tel:+254757198515">
                <CallIcon />
              </a>
            </Typography>
            <div style={{marginLeft:'2rem'}}>
            <MDBDropdown>
                    <div></div>
                    <MDBDropdownToggle style={{ width: "100%" }}>
                      Filter By Categories
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
          </div>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: ".5rem",
                  alignItems: "",
                }}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                {/* {user?.result?.name} */}
                <Avatar alt="" src={user?.result?.img} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {user?.result?._id && (
                    <Link to="/profile">
                      <Typography textAlign="center">{setting.one}</Typography>
                    </Link>
                  )}
                  {user?.result?._id && (
                    <Link to={`/users-dashboard/${user?.result?.name}`}>
                      <Typography textAlign="center">
                        {setting.three}
                      </Typography>
                    </Link>
                  )}
                  {user?.result?.admin === true && (
                    <Link to={`/admin-dashboard/${user?.result?.name}`}>
                      {setting.seven}
                    </Link>
                  )}
                  {user?.result?._id ? (
                    <>
                      <Typography
                        onClick={() => handleLogout()}
                        textAlign="center"
                      >
                        {setting.six}
                      </Typography>
                      <Link to="/mpesa-payment">
                        <Typography textAlign="center">
                          {setting.five}
                        </Typography>
                      </Link>
                    </>
                  ) : (
                    <Link to="/login">
                      <Typography textAlign="center">{setting.four}</Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
