import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./profile.css";
import { FaEdit } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { GoKebabHorizontal } from "react-icons/go";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import image1 from "../../components/sidebar/assets/prdct-img.jpg";
import image2 from "../../components/sidebar/assets/rating.jpg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Grid as MuiGrid,
  Link,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing, SpacingProps } from "@mui/system";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  GetVendorUsersService,
  JoinVendorsService,
} from "../../services/VendorService";
import { GetProfileImageService } from "../../services/UserService";
import { GetAllUsersService } from "../../services/UserService";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Grid = styled(MuiGrid)(spacing);

const Spacer = styled.div(spacing);

interface TypographyProps extends SpacingProps {
  component?: string;
}
const Typography = styled(MuiTypography)<TypographyProps>(spacing);

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 128px;
  width: 128px;
`;

const StatsIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 32px;

  svg {
    width: 32px;
    height: 32px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;
function Details() {
  const userId: any = localStorage.getItem("userid");
  const role = localStorage.getItem("role");
  const userFirstName = localStorage.getItem("user_first_name");
  const userLastName = localStorage.getItem("user_last_name");
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const joinVendors = async () => {
        const json = await JoinVendorsService(userId);
        if (json) {
          setData(json[0]);
        }
      };
      joinVendors();
    }
  }, [role, userId]);
  const navigate = useNavigate();
  const handleEditDetails = () => {
    navigate("/pages/profiledetails");
  };
  return (
    <Card mb={6}>
      {role === "ROLE_VENDOR ADMINISTRATOR" ? (
        <CardContent className="posrel">
          <Spacer mb={4} />
          <Grid className="edit-icon-wrap">
            <FaEdit onClick={handleEditDetails} />
          </Grid>
          <Typography variant="h6" component="div" gutterBottom>
            <Box className="prfl-name">
              {data.first_name &&
                data.first_name.charAt(0).toUpperCase() +
                  data.first_name.slice(1)}
              &nbsp;
              {data.last_name &&
                data.last_name.charAt(0).toUpperCase() +
                  data.last_name.slice(1)}
            </Box>
            <Box sx={{ typography: "body2" }} className="prfl-box-txt">
              VENDOR ADMINISTRATOR
            </Box>
          </Typography>
          <Divider my={2} className="hr" />
          {data.vendor !== undefined ? (
            <>
              <Typography variant="h6" component="div" gutterBottom>
                <Box className="prfl-box-hd prfl-mrgn-tb">
                  {data.company_name}
                </Box>

                <Box sx={{ typography: "body2" }} className="prfl-box-txt">
                  {data.vendor.company_address},
                </Box>

                <Box sx={{ typography: "body2" }} className="prfl-box-txt">
                  {data.vendor.city_name}, {data.vendor.company_state},
                  {data.vendor.company_zip}
                </Box>
              </Typography>
              <Grid className="contact-grid-wrap">
                <Grid className="contact-icon-wrap">
                  <HiOutlineChat />
                </Grid>
                <Typography my={2} variant="h6" component="div" gutterBottom>
                  <Box className="prfl-box-hd prfl-mrgn-tb-1">Contact</Box>
                  <Box sx={{ typography: "body2" }} className="prfl-box-txt">
                    {data.email}
                  </Box>
                </Typography>
              </Grid>
            </>
          ) : null}
        </CardContent>
      ) : role === "ROLE_ADMINISTRATOR" ? (
        <CardContent className="posrel">
          <Spacer mb={4} />
          <Grid className="edit-icon-wrap"></Grid>
          <Typography variant="h6" component="div" gutterBottom>
            <Box className="prfl-name">Drophook Admin</Box>
            <Box sx={{ typography: "body2" }} className="prfl-box-txt">
              ADMINISTRATOR
            </Box>
          </Typography>
        </CardContent>
      ) : role === "ROLE_SUPER ADMINISTRATOR" ? (
        <CardContent className="posrel">
          <Spacer mb={4} />
          <Grid className="edit-icon-wrap"></Grid>
          <Typography variant="h6" component="div" gutterBottom>
            <Box className="prfl-name">Drophook Super Admin</Box>
            <Box sx={{ typography: "body2" }} className="prfl-box-txt">
              SUPER ADMINISTRATOR
            </Box>
          </Typography>
        </CardContent>
      ) : (
        <CardContent className="posrel">
          <Spacer mb={4} />
          <Grid className="edit-icon-wrap">
            <FaEdit onClick={handleEditDetails} />
          </Grid>
          <Typography variant="h6" component="div" gutterBottom>
            <Box className="prfl-name">
              {userFirstName !== null && (
                <>
                  {userFirstName.charAt(0).toUpperCase() +
                    userFirstName.slice(1)}
                </>
              )}
              &nbsp;
              {userLastName !== null && (
                <>
                  {userLastName.charAt(0).toUpperCase() + userLastName.slice(1)}
                </>
              )}
            </Box>
            <Box sx={{ typography: "body2" }} className="prfl-box-txt">
              VENDOR MANAGER
            </Box>
          </Typography>
          <Divider my={2} className="hr" />
        </CardContent>
      )}
    </Card>
  );
}

function Earnings() {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <Box className="prfl-box-hd-xl">Recommended Merchants</Box>
          </Typography>
          <Divider my={2} className="hr" />

          <StatsIcon className="gokebab">
            <GoKebabHorizontal />
          </StatsIcon>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item>
                <Avatar
                  alt="Lucy Lavender"
                  src="/static/img/avatars/avatar-1.jpg"
                  className="small-avtar"
                />
              </Item>
            </Grid>
            <Grid item xs={7}>
              <Item>
                <Box className="prfl-box-hd text-left">Mitchell Williamson</Box>
                <p className="small-text text-left mrgn-0">Company Name</p>
                <p className="nrml-text text-left prfl-mrgn-tb-1">
                  Lorem ipsum dolor sit amet, ipsum lucilius mel id, ad has
                  appareat.
                </p>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item className="chat-icon text-right">
                <HiOutlineChat />
              </Item>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item>
                <Avatar
                  alt="Lucy Lavender"
                  src="/static/img/avatars/avatar-1.jpg"
                  className="small-avtar"
                />
              </Item>
            </Grid>
            <Grid item xs={7}>
              <Item>
                <Box className="prfl-box-hd text-left">Christina Castro</Box>
                <p className="small-text text-left mrgn-0">Company Name</p>
                <p className="nrml-text text-left prfl-mrgn-tb-1">
                  Lorem ipsum dolor sit amet, ipsum lucilius mel id, ad has
                  appareat.
                </p>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item className="chat-icon text-right">
                <HiOutlineChat />
              </Item>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item>
                <Avatar
                  alt="Lucy Lavender"
                  src="/static/img/avatars/avatar-1.jpg"
                  className="small-avtar"
                />
              </Item>
            </Grid>
            <Grid item xs={7}>
              <Item>
                <Box className="prfl-box-hd text-left">Daniel Russo</Box>
                <p className="small-text text-left mrgn-0">Company Name</p>
                <p className="nrml-text text-left prfl-mrgn-tb-1">
                  Lorem ipsum dolor sit amet, ipsum lucilius mel id, ad has
                  appareat.
                </p>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item className="chat-icon text-right">
                <HiOutlineChat />
              </Item>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

function Orders() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const [rows, setRows] = useState<any>([]);
  const userId = localStorage.getItem("userid");
  var role = localStorage.getItem("role");
  const [showArray, setShowArray] = useState([]);
  useEffect(() => {
    if (role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR") {
      const adminUsers = async () => {
        const json = await GetAllUsersService();
        setRows(json);
        setShowArray(json.slice(0, 5));
      };
      adminUsers();
    }
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const vendorUsers = async () => {
        const json = await GetVendorUsersService(userId);
        setRows(json);
        setShowArray(json.slice(0, 5));
      };
      vendorUsers();
    }
  }, [userId, role]);
  const handleExpandMore = () => {
    setShowArray(rows);
  };
  const handleExpandLess = () => {
    setShowArray(rows.slice(0, 5));
  };
  return (
    <>
      {role !== "ROLE_VENDOR MANAGER" ? (
        <Box position="relative">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              className="accordion-summary"
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" gutterBottom>
                <Box className="prfl-box-hd-xl">Users</Box>
              </Typography>

              <StatsIcon className="gokebab">
                <GoKebabHorizontal />
              </StatsIcon>
              <Divider my={2} className="hr" />
            </AccordionSummary>
            <AccordionDetails>
              {showArray.map((row: any) => {
                return (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item>
                          <Box className="prfl-box-hd text-left">
                            {row.first_name !== null &&
                            row.last_name !== null ? (
                              <>
                                {row.first_name.charAt(0).toUpperCase() +
                                  row.first_name.slice(1)}
                                &nbsp;
                                {row.last_name.charAt(0).toUpperCase() +
                                  row.last_name.slice(1)}
                              </>
                            ) : null}
                          </Box>
                          <p className="small-text text-left mrgn-0">
                            {row.email}
                          </p>
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item>
                          <p className="nrml-text text-right mrgn-0">
                            {row.code === "1001"
                              ? "Super Administrator"
                              : row.code === "2001"
                              ? "Administrator"
                              : row.code === "1002"
                              ? "Administrator"
                              : row.code === "2002"
                              ? "Manager"
                              : row.code === "1003"
                              ? "Manager"
                              : null}
                          </p>
                        </Item>
                      </Grid>
                    </Grid>
                    <hr />
                  </>
                );
              })}
              {rows.length !== 0 && rows.length > 5 ? (
                <>
                  {showArray.length !== rows.length ? (
                    <ExpandMoreIcon
                      className="expand-more expand-icon"
                      onClick={handleExpandMore}
                    />
                  ) : (
                    <ExpandLessOutlinedIcon
                      className="expand-less expand-icon"
                      onClick={handleExpandLess}
                    />
                  )}
                </>
              ) : null}
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : null}
      <Box position="relative" className="mt-15">
        <Card mb={6} pt={2}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <Box className="dflex">
                <CheckCircleIcon className="vrfd-icon" />
                <div className="inline-wrapper pl-10">
                  <h2 className="prfl-box-hd-xl mrgn-0">Add Users</h2>
                  <span className="nrml-text-2 mrgn-0">
                    3 Steps toBecome Trusted vendor
                  </span>
                </div>
              </Box>
            </Typography>
            <Divider my={2} className="hr" />

            <StatsIcon className="gokebab">
              <GoKebabHorizontal />
            </StatsIcon>
            <Grid container spacing={2} className="prfl-mrgn-tb-1">
              <Grid item xs={12} className="dflex">
                <CheckCircleOutlineIcon className="tovrfd-icon" />
                <Item className="vrfd-row">
                  <Box className="prfl-box-hd text-left">
                    Complete DH Academy course
                  </Box>
                  <p className="small-text text-left mrgn-0">
                    Estimeted 1 hour
                  </p>
                </Item>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="prfl-mrgn-tb-1">
              <Grid item xs={12} className="dflex">
                <CheckCircleOutlineIcon className="tovrfd-icon" />
                <Item className="vrfd-row">
                  <Box className="prfl-box-hd text-left">
                    List 3 reference contacts
                  </Box>
                </Item>
              </Grid>
            </Grid>

            <Grid container spacing={2} className="prfl-mrgn-tb-1">
              <Grid item xs={12} className="dflex">
                <CheckCircleOutlineIcon className="tovrfd-icon" />
                <Item className="vrfd-row">
                  <Box className="prfl-box-hd text-left">
                    Upload COI (Certificate of Insurance)
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

function Revenue() {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        className="featured-prdct-wrap one-fifth-grid"
      >
        <Grid item xs={3}>
          <Item>
            <div className="product-card">
              <div className="prdct-img">
                <img src={image1} alt="image1" />
              </div>
              <div className="prdct-swatchs">
                <ul>
                  <li className="swatch gray"></li>
                  <li className="swatch black"></li>
                  <li className="swatch orange"></li>
                </ul>
              </div>
              <hr />
              <div className="card-info">
                <div className="vendor-name">Home Decor</div>
                <div className="prdct-detail">
                  <h3 className="prdct-title">Product Name</h3>
                  <div className="price">$00.00</div>
                </div>
              </div>
              <div className="card-rating text-left">
                <img src={image2} alt="image2" />
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <div className="product-card">
              <div className="prdct-img">
                <img src={image1} alt="image1" />
              </div>
              <div className="prdct-swatchs">
                <ul>
                  <li className="swatch gray"></li>
                  <li className="swatch black"></li>
                  <li className="swatch orange"></li>
                </ul>
              </div>
              <hr />
              <div className="card-info">
                <div className="vendor-name">Home Decor</div>
                <div className="prdct-detail">
                  <h3 className="prdct-title">Product Name</h3>
                  <div className="price">$00.00</div>
                </div>
              </div>
              <div className="card-rating text-left">
                <img src={image2} alt="image2" />
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <div className="product-card">
              <div className="prdct-img">
                <img src={image1} alt="image1" />
              </div>
              <div className="prdct-swatchs">
                <ul>
                  <li className="swatch gray"></li>
                  <li className="swatch black"></li>
                  <li className="swatch orange"></li>
                </ul>
              </div>
              <hr />
              <div className="card-info">
                <div className="vendor-name">Home Decor</div>
                <div className="prdct-detail">
                  <h3 className="prdct-title">Product Name</h3>
                  <div className="price">$00.00</div>
                </div>
              </div>
              <div className="card-rating text-left">
                <img src={image2} alt="image2" />
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <div className="product-card">
              <div className="prdct-img">
                <img src={image1} alt="image1" />
              </div>
              <div className="prdct-swatchs">
                <ul>
                  <li className="swatch gray"></li>
                  <li className="swatch black"></li>
                  <li className="swatch orange"></li>
                </ul>
              </div>
              <hr />
              <div className="card-info">
                <div className="vendor-name">Home Decor</div>
                <div className="prdct-detail">
                  <h3 className="prdct-title">Product Name</h3>
                  <div className="price">$00.00</div>
                </div>
              </div>
              <div className="card-rating text-left">
                <img src={image2} alt="image2" />
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

function Profile() {
  const [age, setAge] = React.useState("");
  const userId = localStorage.getItem("userid");
  const userInVendorId = localStorage.getItem("userinvendorid");
  const role = localStorage.getItem("role");
  const [data, setData] = useState<any>({});
  const userFirstName = localStorage.getItem("user_first_name");
  const userLastName = localStorage.getItem("user_last_name");
  const [profileImage, setProfileImage] = useState<any>("");
  const [classAdd, setClassAdd] = useState("profile-img-cls");
  const [openClick, setOpenClick] = React.useState(false);

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpenClick(true);
  };
  const handleClickClose = () => {
    setOpenClick(false);
  };
  async function getImageFile(file: any) {
    const url = "https://vp-services-users.azurewebsites.net/files/" + file;
    const image = await axios.get(url, { responseType: "arraybuffer" });
    const raw = Buffer.from(image.data).toString("base64");
    const base64Image =
      "data:" + image.headers["content-type"] + ";base64," + raw;
    return base64Image;
  }
  useEffect(() => {
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const joinVendors = async () => {
        const json = await JoinVendorsService(userId);
        setData(json[0]);
      };
      joinVendors();
      const getImage = async () => {
        const json = await GetProfileImageService(userInVendorId);
        if (json.name !== "Error") {
          const file = await getImageFile(json.name);
          setProfileImage(file);
          setClassAdd(classAdd + " image-up");
        }
      };
      getImage();
    } else {
      const getImage = async () => {
        const json = await GetProfileImageService(userId);
        if (json.name !== "Error") {
          const file = await getImageFile(json.name);
          setProfileImage(file);
          setClassAdd(classAdd + " image-up");
        }
      };
      getImage();
    }
  }, [userId, userInVendorId, role]);
  return (
    <React.Fragment>
      <Helmet title="Profile" />
      <Typography variant="h3" gutterBottom display="inline">
        Profile
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/dashboard/default">
          Dashboard
        </Link>
        <Typography>Profile</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6} className="bg-image-profile-grid"></Grid>
      <Grid my={2} container>
        <Grid className="first-col" item xs={12} lg={3} xl={3}>
          <Item className="avtar-wrap">
            <Card mb={2} className={classAdd}>
              {role === "ROLE_VENDOR ADMINISTRATOR" ? (
                <>
                  {data.first_name !== undefined &&
                  data.last_name !== undefined ? (
                    <div className="user-name">
                      {data.first_name.charAt(0).toUpperCase()}
                      {data.last_name.charAt(0).toUpperCase()}
                    </div>
                  ) : null}
                </>
              ) : role === "ROLE_SUPER ADMINISTRATOR" ? (
                <div className="user-name">DSA</div>
              ) : role === "ROLE_ADMINISTRATOR" ? (
                <div className="user-name">DA</div>
              ) : (
                <>
                  {userFirstName !== null && userLastName !== null ? (
                    <div className="user-name">
                      {userFirstName.charAt(0).toUpperCase()}
                      {userLastName.charAt(0).toUpperCase()}
                    </div>
                  ) : null}
                </>
              )}
              <div className="profile-img">
                <img
                  src={profileImage}
                  alt="profile-img"
                  onClick={handleClickOpen}
                />
              </div>
            </Card>
            <div className="verify-icon">
              <div>
                <DoneOutlinedIcon className="vrfd-icon" />
              </div>
            </div>
          </Item>
          <Dialog
            fullScreen
            className="dialog-full"
            open={openClick}
            onClose={handleClickClose}
            TransitionComponent={Transition}
          >
            <AppBar className="dialog-header" sx={{ position: "relative" }}>
              {/* <Toolbar> */}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClickClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              {/* </Toolbar> */}
            </AppBar>
            <div className="profile-dialog">
              <img src={profileImage} alt="profile-img" />
            </div>
          </Dialog>
          <Details />
        </Grid>
        <Grid className="second-col" item xs={12} lg={4} mx={4}>
          <Earnings />
        </Grid>
        <Grid className="third-col" item xs={12} lg={5} xl={5}>
          <Orders />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Revenue />
      </Grid>
      <div className="promotion-section"></div>
      <Box className="catlog-section" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={7}>
            <Item className="product-catlog">
              <h2 className="catlog-head">Product Catlog</h2>
            </Item>
          </Grid>
          <Grid item xs={5} className="search-check">
            <Item className="product-catlog select-search">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Checkbox className="check" {...label} defaultChecked />
            <p>Select All</p>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          className="featured-prdct-wrap one-fifth-grid"
        >
          <Grid item xs={4}>
            <Item>
              <div className="product-card">
                <div className="prdct-img">
                  <img src={image1} alt="image1" />
                </div>
                <div className="prdct-swatchs">
                  <ul>
                    <li className="swatch gray"></li>
                    <li className="swatch black"></li>
                    <li className="swatch orange"></li>
                  </ul>
                </div>
                <hr />
                <div className="card-info">
                  <div className="vendor-name">Home Decor</div>
                  <div className="prdct-detail">
                    <h3 className="prdct-title">Product Name</h3>
                    <div className="price">$00.00</div>
                  </div>
                </div>
                <div className="card-rating text-left">
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <div className="product-card">
                <div className="prdct-img">
                  <img src={image1} alt="image1" />
                </div>
                <div className="prdct-swatchs">
                  <ul>
                    <li className="swatch gray"></li>
                    <li className="swatch black"></li>
                    <li className="swatch orange"></li>
                  </ul>
                </div>
                <hr />
                <div className="card-info">
                  <div className="vendor-name">Home Decor</div>
                  <div className="prdct-detail">
                    <h3 className="prdct-title">Product Name</h3>
                    <div className="price">$00.00</div>
                  </div>
                </div>
                <div className="card-rating text-left">
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <div className="product-card">
                <div className="prdct-img">
                  <img src={image1} alt="image1" />
                </div>
                <div className="prdct-swatchs">
                  <ul>
                    <li className="swatch gray"></li>
                    <li className="swatch black"></li>
                    <li className="swatch orange"></li>
                  </ul>
                </div>
                <hr />
                <div className="card-info">
                  <div className="vendor-name">Home Decor</div>
                  <div className="prdct-detail">
                    <h3 className="prdct-title">Product Name</h3>
                    <div className="price">$00.00</div>
                  </div>
                </div>
                <div className="card-rating text-left">
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          className="featured-prdct-wrap one-fifth-grid"
        >
          <Grid item xs={4}>
            <Item>
              <div className="product-card">
                <div className="prdct-img">
                  <img src={image1} alt="image1" />
                </div>
                <div className="prdct-swatchs">
                  <ul>
                    <li className="swatch gray"></li>
                    <li className="swatch black"></li>
                    <li className="swatch orange"></li>
                  </ul>
                </div>
                <hr />
                <div className="card-info">
                  <div className="vendor-name">Home Decor</div>
                  <div className="prdct-detail">
                    <h3 className="prdct-title">Product Name</h3>
                    <div className="price">$00.00</div>
                  </div>
                </div>
                <div className="card-rating text-left">
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <div className="product-card">
                <div className="prdct-img">
                  <img src={image1} alt="image1" />
                </div>
                <div className="prdct-swatchs">
                  <ul>
                    <li className="swatch gray"></li>
                    <li className="swatch black"></li>
                    <li className="swatch orange"></li>
                  </ul>
                </div>
                <hr />
                <div className="card-info">
                  <div className="vendor-name">Home Decor</div>
                  <div className="prdct-detail">
                    <h3 className="prdct-title">Product Name</h3>
                    <div className="price">$00.00</div>
                  </div>
                </div>
                <div className="card-rating text-left">
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <div className="product-card">
                <div className="prdct-img">
                  <img src={image1} alt="image1" />
                </div>
                <div className="prdct-swatchs">
                  <ul>
                    <li className="swatch gray"></li>
                    <li className="swatch black"></li>
                    <li className="swatch orange"></li>
                  </ul>
                </div>
                <hr />
                <div className="card-info">
                  <div className="vendor-name">Home Decor</div>
                  <div className="prdct-detail">
                    <h3 className="prdct-title">Product Name</h3>
                    <div className="price">$00.00</div>
                  </div>
                </div>
                <div className="card-rating text-left">
                  <img src={image2} alt="image2" />
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Profile;
