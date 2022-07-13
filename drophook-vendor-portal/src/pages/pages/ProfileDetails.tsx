import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./profile.css";
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Grid as MuiGrid,
  Typography as MuiTypography,
  Alert,
  Modal,
  TextField,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import { spacing, SpacingProps } from "@mui/system";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  JoinVendorsService,
  UpdateVendorsService,
} from "../../services/VendorService";
import {
  DeleteProfileImageService,
  GetProfileImageService,
  UpdateProfileImageService,
  UpdateSingleUserByIdService,
  UploadProfileImageService,
} from "../../services/UserService";
import { VendorRequestsUpdateByIdService } from "../../services/VendorRequestService";
import axios from "axios";
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

const Card = styled(MuiCard)(spacing);

const Grid = styled(MuiGrid)(spacing);

interface TypographyProps extends SpacingProps {
  component?: string;
}

export const ProfileDetails = () => {
  const userId: any = localStorage.getItem("userid");
  const role = localStorage.getItem("role");
  const userFirstName = localStorage.getItem("user_first_name");
  const userLastName = localStorage.getItem("user_last_name");
  const userInVendorId: any = localStorage.getItem("userinvendorid");
  const [data, setData] = useState<any>({});
  const [classAdd, setClassAdd] = useState("profile-img-cls");
  const [open, setOpen] = React.useState(true);
  const [editData, setEditData] = useState<any>({
    first_name: "",
    last_name: "",
    company_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  });
  const [editDataUser, setEditDataUser] = useState<any>({
    first_name: userFirstName,
    last_name: userLastName,
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [profileImageOnload, setProfileImageOnload] = useState("");
  const [profileImageName, setProfileImageName] = useState<any>();
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<any>();
  const [errorTextFirstName, setErrorTextFirstName] = useState<any>("");
  const [errorTextLastName, setErrorTextLastName] = useState<any>("");
  const [errorTextCompanyName, setErrorTextCompanyName] = useState<any>("");
  const [errorTextAddress, setErrorTextAddress] = useState<any>("");
  const [errorTextState, setErrorTextState] = useState<any>("");
  const [errorTextCity, setErrorTextCity] = useState<any>("");
  const [errorTextZip, setErrorTextZip] = useState<any>("");
  const [redirectTime, setRedirectTime] = useState(0);
  const [savingClass, setSavingClass] = useState<any>();
  const handleCloseCountry = () => {
    setOpenCountry(false);
  };
  const handleOpenCountry = () => {
    setOpenCountry(true);
  };
  const handleCloseState = () => {
    setOpenState(false);
  };
  const handleOpenState = () => {
    setOpenState(true);
  };
  const handleAllCountries = () => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCountries(result.data);
      });
  };
  const handleAllStates = (e: any) => {
    const json = { country: e.target.value };
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((result) => {
        setStates(result.data.states);
      });
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
        if (json) {
          setData(json[0]);
          setEditData({
            first_name:
              json[0].first_name.charAt(0).toUpperCase() +
              json[0].first_name.slice(1),
            last_name:
              json[0].last_name.charAt(0).toUpperCase() +
              json[0].last_name.slice(1),
            company_name: json[0].company_name,
            address: json[0].vendor.company_address,
            city: json[0].vendor.city_name,
            state: json[0].vendor.company_state,
            zip: json[0].vendor.company_zip,
            email: json[0].email,
          });
        }
      };
      joinVendors();
      const getImage = async () => {
        const json = await GetProfileImageService(userInVendorId);
        if (json.name !== "Error") {
          setProfileImageOnload(json.name);
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
          setProfileImageOnload(json.name);
          const file = await getImageFile(json.name);
          setProfileImage(file);
          setClassAdd(classAdd + " image-up");
        }
      };
      getImage();
    }
    handleAllCountries();
  }, [role, userId, userInVendorId]);
  const navigate = useNavigate();
  const handleImageUpload = (e: any) => {
    var profileImg = document.getElementById("profile-img-id-new");
    if (profileImg !== null) {
      profileImg.classList.add("image-up");
    }
    setProfileImageFile(e.target.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setProfileImageName(e.target.files[0].name);
  };
  const handleImageRemove = (e: any) => {
    var profileImg = document.getElementById("profile-img-id-new");
    if (profileImg !== null) {
      profileImg.classList.remove("image-up");
      profileImg.classList.remove("profile-img");
    }
    setProfileImageFile("");
    setProfileImage("");
    setProfileImageName("");
  };
  const handleEditProfileSave = async () => {
    setRedirectTime(1);
    setSavingClass("saving-info");
    if (
      profileImageFile &&
      (profileImageOnload === "" || profileImageOnload === undefined)
    ) {
      const formData = new FormData();
      formData.append("file", profileImageFile);
      if (role === "ROLE_VENDOR ADMINISTRATOR") {
        formData.append("user_id", userInVendorId);
        await UploadProfileImageService(formData);
      } else {
        formData.append("user_id", userId);
        await UploadProfileImageService(formData);
      }
    }
    if (
      profileImageFile &&
      profileImageOnload &&
      profileImageName !== profileImageOnload
    ) {
      const formData: any = new FormData();
      formData.append("file", profileImageFile);
      if (role === "ROLE_VENDOR ADMINISTRATOR") {
        // formData.append("user_id", userInVendorId);
        await UpdateProfileImageService(userInVendorId, formData);
      } else {
        // formData.append("user_id", userId);
        await UpdateProfileImageService(userId, formData);
      }
    }
    if (profileImageOnload && profileImageName === "") {
      if (role === "ROLE_VENDOR ADMINISTRATOR") {
        await DeleteProfileImageService(userInVendorId);
      } else {
        await DeleteProfileImageService(userId);
      }
    }
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      var reg1 = /^[a-zA-Z ]*$/;
      !editData.first_name || !reg1.test(editData.first_name)
        ? setErrorTextFirstName("Please add Your First Name")
        : setErrorTextFirstName("");
      !editData.last_name || !reg1.test(editData.last_name)
        ? setErrorTextLastName("Please add Your Last Name")
        : setErrorTextLastName("");
      !editData.company_name || !reg1.test(editData.company_name)
        ? setErrorTextCompanyName("Please add Your Company Name")
        : setErrorTextCompanyName("");
      !editData.address || !reg1.test(editData.address)
        ? setErrorTextAddress("Please add Company Address")
        : setErrorTextAddress("");
      !editData.state
        ? setErrorTextState("Please add Company State")
        : setErrorTextState("");
      !editData.city || !reg1.test(editData.city)
        ? setErrorTextCity("Please add Company City")
        : setErrorTextCity("");
      !editData.zip
        ? setErrorTextZip("Please add Company ZipCode")
        : setErrorTextZip("");
      if (
        editData.first_name &&
        editData.last_name &&
        editData.company_name &&
        editData.address &&
        editData.city &&
        editData.state &&
        editData.zip
      ) {
        const json = {
          first_name: editData.first_name,
          last_name: editData.last_name,
          company_name: editData.company_name,
        };
        await VendorRequestsUpdateByIdService(userId, json);
        const jsonNew = {
          company_address: editData.address,
          city_name: editData.city,
          company_state: editData.state,
          company_zip: editData.zip,
        };
        await UpdateVendorsService(userId, jsonNew);
      }
    }
    if (role === "ROLE_MANAGER" || role === "ROLE_VENDOR MANAGER") {
      var reg2 = /^[a-zA-Z ]*$/;
      !editDataUser.first_name || !reg2.test(editDataUser.first_name)
        ? setErrorTextFirstName("Please add Your First Name")
        : setErrorTextFirstName("");
      !editDataUser.last_name || !reg2.test(editDataUser.last_name)
        ? setErrorTextLastName("Please add Your Last Name")
        : setErrorTextLastName("");
      if (editDataUser.first_name && editDataUser.last_name) {
        const json = {
          first_name: editDataUser.first_name,
          last_name: editDataUser.last_name,
        };
        await UpdateSingleUserByIdService(userId, json);
        localStorage.setItem("user_first_name", editDataUser.first_name);
        localStorage.setItem("user_last_name", editDataUser.last_name);
      }
    }
    setTimeout(redirectFunction, 5000);
  };
  const redirectFunction = () => {
    navigate("/pages/profile");
    setRedirectTime(2);
  };
  const handleEditProfileCancel = () => {
    navigate("/pages/profile");
  };
  return (
    <div>
      {role === "ROLE_VENDOR ADMINISTRATOR" ? (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box sx={{ width: "100%" }} className="modal-wrap">
              <Grid className="left-item" item xs={12}>
                <Item className="avtar-wrap">
                  <Card id="profile-img-id-new" mb={2} className={classAdd}>
                    <input
                      type="file"
                      className="profile-dropzone"
                      onChange={handleImageUpload}
                    />
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
                      <img src={profileImage} alt="profile-img" />
                    </div>
                  </Card>
                  {profileImage !== "" ? (
                    <div className="profile-remove">
                      <DeleteOutlinedIcon onClick={handleImageRemove} />
                    </div>
                  ) : null}
                </Item>
              </Grid>
              <Grid
                className="below-box-wrapper mb-30 mt-30 users-add box-shadow edit-box-wrapper"
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid className="left-item" item xs={3}>
                  <Item>First Name</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="First Name"
                    value={editData.first_name}
                    onChange={(e: any) =>
                      setEditData({
                        ...editData,
                        first_name: e.target.value,
                      })
                    }
                  />
                  {errorTextFirstName !== "" ? (
                    <Alert severity="error">{errorTextFirstName}</Alert>
                  ) : null}
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Last Name</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Last Name"
                    value={editData.last_name}
                    onChange={(e: any) =>
                      setEditData({
                        ...editData,
                        last_name: e.target.value,
                      })
                    }
                  />
                  {errorTextLastName !== "" ? (
                    <Alert severity="error">{errorTextLastName}</Alert>
                  ) : null}
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Company Name</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Last Name"
                    value={editData.company_name}
                    onChange={(e: any) =>
                      setEditData({
                        ...editData,
                        company_name: e.target.value,
                      })
                    }
                  />
                  {errorTextCompanyName !== "" ? (
                    <Alert severity="error">{errorTextCompanyName}</Alert>
                  ) : null}
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Email</Item>
                </Grid>
                <Grid className="right-item" item xs={3}>
                  <Item>{editData.email}</Item>
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Address</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Company Address"
                    value={editData.address}
                    onChange={(e: any) =>
                      setEditData({
                        ...editData,
                        address: e.target.value,
                      })
                    }
                  />
                  {errorTextAddress !== "" ? (
                    <Alert severity="error">{errorTextAddress}</Alert>
                  ) : null}
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Country</Item>
                </Grid>
                <Grid className="right-item" item xs={3}>
                  <FormControl className="edit-text" fullWidth>
                    <Select
                      fullWidth
                      placeholder="Country"
                      size="small"
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openCountry}
                      onClose={handleCloseCountry}
                      onOpen={handleOpenCountry}
                      label="Country"
                      onChange={handleAllStates}
                    >
                      {countries.map((name: any) => (
                        <MenuItem key={name.name} value={name.name}>
                          <ListItemText primary={name.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>State</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <FormControl className="edit-text" fullWidth>
                    <Select
                      placeholder="State"
                      size="small"
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openState}
                      onClose={handleCloseState}
                      onOpen={handleOpenState}
                      label="State"
                      value={editData.state}
                      onChange={(e: any) =>
                        setEditData({
                          ...editData,
                          state: e.target.value,
                        })
                      }
                    >
                      {states.length < 1 ? (
                        <MenuItem value={editData.state}>
                          <ListItemText primary={editData.state} />
                        </MenuItem>
                      ) : (
                        states.map((name: any) => (
                          <MenuItem key={name.name} value={name.name}>
                            <ListItemText primary={name.name} />
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                  {errorTextState !== "" ? (
                    <Alert severity="error">{errorTextState}</Alert>
                  ) : null}
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>City</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Company City"
                    value={editData.city}
                    onChange={(e: any) =>
                      setEditData({
                        ...editData,
                        city: e.target.value,
                      })
                    }
                  />
                  {errorTextCity !== "" ? (
                    <Alert severity="error">{errorTextCity}</Alert>
                  ) : null}
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Zip Code</Item>
                </Grid>
                <Grid className="right-item validate-wrap" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Company Zip Code"
                    value={editData.zip}
                    onChange={(e: any) =>
                      setEditData({
                        ...editData,
                        zip: e.target.value,
                      })
                    }
                  />
                  {errorTextZip !== "" ? (
                    <Alert severity="error">{errorTextZip}</Alert>
                  ) : null}
                </Grid>
                <Grid
                  className="above-box-wrapper"
                  sx={{ marginBottom: "10px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    item
                    xs={6}
                    className="profile_edit-cta back-btn-wrapper"
                  >
                    <Item>
                      <Button
                        className="back-btn form-btn mt-15"
                        onClick={handleEditProfileSave}
                      >
                        Save
                      </Button>
                    </Item>
                    <Item>
                      <Button
                        className="back-btn form-btn mt-15"
                        onClick={handleEditProfileCancel}
                      >
                        Cancel
                      </Button>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <div className={savingClass}>
              {redirectTime === 1 ? (
                <p>
                  <CircularProgress sx={{ color: "#fff" }} size={16} />
                  Saving Information
                </p>
              ) : null}
            </div>
          </>
        </Modal>
      ) : (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box sx={{ width: "100%" }} className="modal-wrap">
              <Grid className="left-item" item xs={12}>
                <Item className="avtar-wrap">
                  <Card id="profile-img-id-new" mb={2} className={classAdd}>
                    <input
                      type="file"
                      className="profile-dropzone"
                      onChange={handleImageUpload}
                    />
                    {userFirstName !== null && userLastName !== null ? (
                      <div className="user-name">
                        {userFirstName.charAt(0).toUpperCase()}
                        {userLastName.charAt(0).toUpperCase()}
                      </div>
                    ) : null}
                    <div className="profile-img">
                      <img src={profileImage} alt="profile-img" />
                    </div>
                  </Card>
                  {profileImage !== "" ? (
                    <div className="profile-remove">
                      <DeleteOutlinedIcon onClick={handleImageRemove} />
                    </div>
                  ) : null}
                </Item>
              </Grid>
              <Grid
                className="below-box-wrapper mb-30 mt-30 users-add box-shadow edit-box-wrapper"
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid className="left-item" item xs={3}>
                  <Item>First Name</Item>
                </Grid>
                <Grid className="right-item" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="First Name"
                    value={editDataUser.first_name}
                    onChange={(e: any) =>
                      setEditDataUser({
                        ...editDataUser,
                        first_name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid className="left-item" item xs={3}>
                  <Item>Last Name</Item>
                </Grid>
                <Grid className="right-item" item xs={3}>
                  <TextField
                    fullWidth
                    className="top-label edit-text"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Last Name"
                    value={editDataUser.last_name}
                    onChange={(e: any) =>
                      setEditDataUser({
                        ...editDataUser,
                        last_name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid
                  className="above-box-wrapper"
                  sx={{ marginBottom: "10px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    item
                    xs={6}
                    className="profile_edit-cta back-btn-wrapper"
                  >
                    <Item>
                      <Button
                        className="back-btn form-btn mt-15"
                        onClick={handleEditProfileSave}
                      >
                        Save
                      </Button>
                    </Item>
                    <Item>
                      <Button
                        className="back-btn form-btn mt-15"
                        onClick={handleEditProfileCancel}
                      >
                        Cancel
                      </Button>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <div className={savingClass}>
              {redirectTime === 1 ? (
                <p>
                  <CircularProgress sx={{ color: "#fff" }} size={16} />
                  Saving Information
                </p>
              ) : null}
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};
