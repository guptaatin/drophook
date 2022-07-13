import React, { useState, useEffect } from "react";
import { Typography, styled, Paper, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet-async";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import "./usersadd.css";
import { useNavigate } from "react-router-dom";
import {
  GetRolesService,
  GetVendorRolesService,
} from "../../services/RoleService";
import { GetVendorIdsService } from "../../services/VendorService";
import { AuthSignUpService } from "../../services/AuthorizationService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const UsersAdd = () => {
  const [open, setOpen] = React.useState(false);
  const [openVendor, setOpenVendor] = React.useState(false);
  const [accessLevel, setAccessLevel] = useState<any>([]);
  const addUserId = localStorage.getItem("userid");
  const [vendorIds, setVendorIds] = useState([]);
  const [vendorIdsSelected, setVendorIdsSelected] = useState();
  const [errorText, setErrorText] = React.useState<string>();
  var role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR") {
      const getRoles = async () => {
        const json = await GetRolesService();
        setAccessLevel(json);
      };
      getRoles();
      const getVendorIds = async () => {
        const json = await GetVendorIdsService();
        setVendorIds(json.vendor_data);
      };
      getVendorIds();
    }
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const getVendorRoles = async () => {
        const json = await GetVendorRolesService();
        setAccessLevel(json);
      };
      getVendorRoles();
    }
  }, [role]);
  const sortIt = (sortBy: any) => (a: any, b: any) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    return 0;
  };

  const sortedByName = accessLevel.sort(sortIt("name"));
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    accessLevel: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseVendor = () => {
    setOpenVendor(false);
  };
  const handleOpenVendor = () => {
    setOpenVendor(true);
  };

  const handleUserSave = async () => {
    setErrorText("");
    var reg1 = /^[a-zA-Z_ ]*$/;
    var reg2 = /^\d+$/;
    var reg3 = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!userData.first_name || !reg1.test(userData.first_name)) {
      setErrorText("Please Fill Correct First Name");
      return false;
    } else if (!userData.last_name || !reg1.test(userData.last_name)) {
      setErrorText("Please Fill Correct Last Name");
      return false;
    } else if (!userData.phone || !reg2.test(userData.phone)) {
      setErrorText("Please Fill Correct Phone");
      return false;
    } else if (!userData.email || !reg3.test(userData.email)) {
      setErrorText("Please Fill Correct Email");
      return false;
    } else if (!userData.accessLevel) {
      setErrorText("Please Choose Access Level");
      return false;
    } else if (
      (role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR") &&
      !vendorIdsSelected
    ) {
      setErrorText("Please Choose Vendor Id");
      return false;
    } else {
      const jsonAuth = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: "Password@123",
        phone_no: userData.phone,
        roles: [userData.accessLevel],
        vendor_id:
          role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR"
            ? vendorIdsSelected
            : addUserId,
      };
      const result = await AuthSignUpService(jsonAuth);
      if (result) {
        navigate("/users");
      }
    }
  };
  const handleBack = () => {
    navigate("/users");
  };
  return (
    <div>
      <Helmet title="Add User" />
      <Grid item xs={6} className="back-btn-wrapper">
        <Item className="pd-0 mb-15">
          <Button className="back-btn form-btn" onClick={handleBack}>
            Back
          </Button>
        </Item>
      </Grid>
      <div className="users-add box-shadow">
        <Box
          component="form"
          noValidate
          className="company-info"
          autoComplete="off"
        >
          <Typography variant="h2" component="div" gutterBottom>
            <h1 className="regular-head">Contact Information</h1>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                className="lft-cntrl top-label"
                id="outlined-basic"
                size="small"
                label="First Name"
                variant="outlined"
                name="firstName"
                placeholder="First Name"
                InputLabelProps={{ shrink: true }}
                value={userData.first_name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    first_name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                className="lft-cntrl top-label"
                id="outlined-basic"
                size="small"
                label="Last Name"
                variant="outlined"
                name="lastName"
                placeholder="Last Name"
                InputLabelProps={{ shrink: true }}
                value={userData.last_name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    last_name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                className="rt-cntrl top-label"
                id="outlined-basic"
                label="Phone"
                size="small"
                variant="outlined"
                name="phone"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter a phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    phone: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                className="lft-cntrl top-label"
                id="outlined-number"
                label="Email Address"
                name="email"
                size="small"
                variant="outlined"
                placeholder="name@company.com"
                InputLabelProps={{ shrink: true }}
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel className="selct-lbl-fix">Access Level</InputLabel>
              <FormControl
                className="rt-cntrl lbl-mrgn-fix lbl-pos hide-legend"
                fullWidth
                size="small"
              >
                <Select
                  className="height-fix-28 "
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  label="Access Level"
                  placeholder="Access Level"
                  name="accessLevel"
                  value={userData.accessLevel}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      accessLevel: e.target.value,
                    })
                  }
                >
                  {sortedByName.map((name: any) => (
                    <MenuItem key={name.name} value={name.name}>
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {role === "ROLE_ADMINISTRATOR" ||
              role === "ROLE_SUPER ADMINISTRATOR" ? (
                <>
                  <InputLabel className="selct-lbl-fix">
                    Vendor Company
                  </InputLabel>
                  <FormControl
                    className="rt-cntrl lbl-mrgn-fix lbl-pos hide-legend"
                    fullWidth
                    size="small"
                  >
                    <Select
                      className="height-fix-28 "
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openVendor}
                      onClose={handleCloseVendor}
                      onOpen={handleOpenVendor}
                      label="Vendor"
                      placeholder="Vendor"
                      name="vendorId"
                      value={vendorIdsSelected}
                      onChange={(e: any) =>
                        setVendorIdsSelected(e.target.value)
                      }
                    >
                      {vendorIds.map((name: any) => (
                        <MenuItem key={name.id} value={name.id}>
                          <ListItemText primary={name.company_name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : null}
            </Grid>
          </Grid>
          {errorText !== undefined ? (
            <Alert className="mt-15" severity="error">
              {errorText}
            </Alert>
          ) : null}
          <Button className="form-btn" onClick={handleUserSave}>
            Save
          </Button>
        </Box>
      </div>
    </div>
  );
};
