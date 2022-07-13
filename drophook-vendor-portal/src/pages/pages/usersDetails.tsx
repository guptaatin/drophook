import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { GetSingleUserByIdService } from "../../services/UserService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const UsersDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [data, setData] = useState<any>({});
  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("userSignInEmail");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getSingleUser = async () => {
      const json = await GetSingleUserByIdService(id);
      setData(json[0]);
      setLoader(false);
    };
    getSingleUser();
  }, [id]);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/users");
  };
  const handleEditUser = () => {
    navigate(`/users/useredit/${id}`);
  };
  return (
    <React.Fragment>
      <Helmet title="User Details" />
      {!loader ? (
        <>
          {data ? (
            <>
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
                      <Button
                        className="back-btn form-btn"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </Item>
                    {userEmail !== data.email ? (
                      <>
                        {(role === "ROLE_ADMINISTRATOR" &&
                          data.code !== "2001" &&
                          data.code !== "1000") ||
                        (role === "ROLE_VENDOR ADMINISTRATOR" &&
                          data.code !== "1000" &&
                          data.code !== "1002" &&
                          data.code !== "1003") ||
                        role === "ROLE_SUPER ADMINISTRATOR" ||
                        role !== "ROLE_MANAGER" ? (
                          <Item>
                            <Button
                              className="back-btn form-btn"
                              onClick={handleEditUser}
                            >
                              Edit User
                            </Button>
                          </Item>
                        ) : null}
                      </>
                    ) : null}
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Grid
                  className="below-box-wrapper mb-30 mt-30 users-add box-shadow"
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid className="left-item" item xs={3}>
                    <Item>First Name</Item>
                  </Grid>
                  <Grid className="right-item" item xs={3}>
                    {data.first_name && (
                      <Item>
                        {data.first_name.charAt(0).toUpperCase() +
                          data.first_name.slice(1)}
                      </Item>
                    )}
                  </Grid>
                  <Grid className="left-item" item xs={3}>
                    <Item>Last Name</Item>
                  </Grid>
                  <Grid className="right-item" item xs={3}>
                    {data.last_name && (
                      <Item>
                        {data.last_name.charAt(0).toUpperCase() +
                          data.last_name.slice(1)}
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
                      <Item>{data.phone_no}</Item>
                    ) : (
                      <Item>-</Item>
                    )}
                  </Grid>
                  <Grid className="left-item" item xs={3}>
                    <Item>Role</Item>
                  </Grid>
                  <Grid className="right-item" item xs={3}>
                    <Item>
                      {data.code === "1000"
                        ? "Super Administrator"
                        : data.code === "2001"
                        ? "Vendor Administrator"
                        : data.code === "1002"
                        ? "Administrator"
                        : data.code === "2002"
                        ? "Vendor Manager"
                        : data.code === "1003"
                        ? "Manager"
                        : null}
                    </Item>
                  </Grid>
                  {role === "ROLE_ADMINISTRATOR" ||
                  role === "ROLE_SUPER ADMINISTRATOR" ? (
                    <>
                      <Grid className="left-item" item xs={3}>
                        <Item>User ID</Item>
                      </Grid>
                      <Grid className="right-item" item xs={3}>
                        <Item>{data.id}</Item>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </Box>
            </>
          ) : null}
        </>
      ) : (
        <CircularProgress color="error" className="details-loader" />
      )}
    </React.Fragment>
  );
};
