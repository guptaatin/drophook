import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import {
  GetRolesService,
  GetVendorRolesService,
} from "../../services/RoleService";
import {
  GetSingleUserByIdService,
  UpdateSingleUserByIdService,
} from "../../services/UserService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const UserEdit = () => {
  const { id } = useParams<{ id?: string }>();
  const [data, setData] = useState<any>({});
  const role = localStorage.getItem("role");
  const [accessLevel, setAccessLevel] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = useState<any>({
    first_name: "",
    last_name: "",
    phone: "",
    code: "",
    id: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR") {
      const getRoles = async () => {
        const json = await GetRolesService();
        setAccessLevel(json);
      };
      getRoles();
    }
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const getVendorRoles = async () => {
        const json = await GetVendorRolesService();
        setAccessLevel(json);
      };
      getVendorRoles();
    }
    const getSingleUser = async () => {
      const json = await GetSingleUserByIdService(id);
      setData(json[0]);
      setEditData({
        first_name: json[0].first_name,
        last_name: json[0].last_name,
        phone: json[0].phone_no,
        id: json[0].id,
      });
    };
    getSingleUser();
  }, [id, role]);
  const sortIt = (sortBy: any) => (a: any, b: any) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    return 0;
  };
  const sortedByName = accessLevel.sort(sortIt("name"));
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleUserEdit = async () => {
    const json = {
      first_name: editData.first_name,
      last_name: editData.last_name,
      phone_no: editData.phone,
      code: editData.code,
    };
    const result = await UpdateSingleUserByIdService(id, json);
    if (result) {
      navigate(`/users/userdetails/${id}`);
    }
  };
  const handleBack = () => {
    navigate(`/users/userdetails/${id}`);
  };
  return (
    <div>
      <Helmet title="Edit User Detail" />
      <Box sx={{ width: "100%" }}>
        <Grid
          className=" user-box-wrap"
          sx={{ marginBottom: "10px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} className="back-btn-wrapper">
            <Item>
              <Button className="back-btn form-btn" onClick={handleBack}>
                Back
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }}>
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
            {data.first_name && (
              <Item className="edit-text">
                <TextField
                  fullWidth
                  className="top-label mt-10"
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
              </Item>
            )}
          </Grid>
          <Grid className="left-item" item xs={3}>
            <Item>Last Name</Item>
          </Grid>
          <Grid className="right-item" item xs={3}>
            {data.last_name && (
              <Item className="edit-text">
                <TextField
                  fullWidth
                  className="top-label mt-10"
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
              </Item>
            )}
          </Grid>
          <Grid className="left-item" item xs={3}>
            <Item>Email</Item>
          </Grid>
          <Grid className="right-item" item xs={3}>
            <Item>{data.email}</Item>
          </Grid>
          <Grid className="left-item" item xs={3}>
            <Item>Phone</Item>
          </Grid>
          <Grid className="right-item" item xs={3}>
            {data.phone_no !== null ? (
              <Item className="edit-text">
                <TextField
                  fullWidth
                  className="top-label mt-10"
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Phone"
                  value={editData.phone}
                  onChange={(e: any) =>
                    setEditData({
                      ...editData,
                      phone: e.target.value,
                    })
                  }
                />
              </Item>
            ) : (
              <Item className="edit-text">
                <TextField
                  fullWidth
                  className="top-label mt-10"
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Phone"
                  value={editData.phone}
                  onChange={(e: any) =>
                    setEditData({
                      ...editData,
                      phone: e.target.value,
                    })
                  }
                />
              </Item>
            )}
          </Grid>
          <Grid className="left-item" item xs={3}>
            <Item>Role</Item>
          </Grid>
          <Grid className="right-item" item xs={3}>
            <Item className="edit-text">
              <FormControl
                className="rt-cntrl lbl-mrgn-fix lbl-pos hide-legend"
                fullWidth
                size="small"
              >
                <Select
                  className="height-fix-28"
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  label="Access Level"
                  placeholder="Access Level"
                  name="accessLevel"
                  value={editData.code}
                  onChange={(e: any) => {
                    setEditData({
                      ...editData,
                      code: e.target.value,
                    });
                  }}
                >
                  {sortedByName.map((name: any) => (
                    <MenuItem key={name.name} value={name.code}>
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          {role === "ROLE_ADMINISTRATOR" ||
          role === "ROLE_SUPER ADMINISTRATOR" ? (
            <>
              <Grid className="left-item" item xs={3}>
                <Item>User ID</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                <Item>{editData.id}</Item>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid
          className="above-box-wrapper"
          sx={{ marginBottom: "10px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} className="back-btn-wrapper">
            <Item>
              <Button
                className="back-btn form-btn mt-15"
                onClick={handleUserEdit}
              >
                Save
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
