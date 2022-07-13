import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { VendorRequestsByIdService } from "../../services/VendorRequestService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const VendorDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [data, setData] = useState<any>({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const vendorDetail = async () => {
      const json = await VendorRequestsByIdService(id);
      setData(json);
      setLoader(false);
    };
    vendorDetail();
  }, [id]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/vendor");
  };
  return (
    <div>
      <Helmet title="Vendor Details" />
      {!loader ? (
        <>
          <Box sx={{ width: "100%" }}>
            <Grid
              className="above-box-wrapper"
              container
              sx={{ marginBottom: "10px" }}
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
                <Item>Company Name</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                <Item>{data.company_name}</Item>
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Status</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                <Item>
                  {data.status === "declined"
                    ? "Declined"
                    : data.status === "pending"
                    ? "Pending"
                    : "Approved"}
                </Item>
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Email</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                <Item>{data.email}</Item>
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Number of Products</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                <Item>{data.current_products}</Item>
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Average Processing Time</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                {data.avg_processing_time !== undefined ? (
                  <>
                    {data.avg_processing_time.indexOf("days") > -1 ||
                    data.avg_processing_time.indexOf("day") > -1 ? (
                      <Item>{data.avg_processing_time}</Item>
                    ) : (
                      <Item>{data.avg_processing_time} days</Item>
                    )}
                  </>
                ) : null}
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Average Shipping Time US</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                {data.avg_processing_time !== undefined ? (
                  <>
                    {data.avg_shipping_time_us.indexOf("days") > -1 ||
                    data.avg_shipping_time_us.indexOf("day") > -1 ? (
                      <Item>{data.avg_shipping_time_us}</Item>
                    ) : (
                      <Item>{data.avg_shipping_time_us} days</Item>
                    )}
                  </>
                ) : null}
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Average Shipping Time International</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                {data.avg_processing_time !== undefined ? (
                  <>
                    {data.avg_shipping_time_in.indexOf("days") > -1 ||
                    data.avg_shipping_time_in.indexOf("day") > -1 ? (
                      <Item>{data.avg_shipping_time_in}</Item>
                    ) : (
                      <Item>{data.avg_shipping_time_in} days</Item>
                    )}
                  </>
                ) : null}
              </Grid>
              <Grid className="left-item" item xs={3}>
                <Item>Company Website</Item>
              </Grid>
              <Grid className="right-item" item xs={3}>
                <Item>{data.company_website}</Item>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <CircularProgress color="error" className="details-loader" />
      )}
    </div>
  );
};
