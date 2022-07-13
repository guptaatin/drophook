import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { Chip as MuiChip, TableRow, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, Paper, TextField, Link, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import "./orders.css";
import { spacing, SpacingProps } from "@mui/system";
import { red, yellow } from "@mui/material/colors";
import image1 from "../../components/sidebar/assets/prdct1.jpg";
import image2 from "../../components/sidebar/assets/prdct2.jpg";
import image3 from "../../components/sidebar/assets/prdct3.jpg";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "left",
}));

interface ChipProps extends SpacingProps {
  unshipped?: number;
  buyshipping?: number;
  confirmshippment?: number;
  printpackingslip?: number;
  cancelorder?: number;
}

const Chip = styled(MuiChip)<ChipProps>`
  ${spacing};
  background: ${(props) => props.unshipped && red[500]};
  background: ${(props) => props.buyshipping && yellow[500]};
  background: ${(props) => props.confirmshippment && yellow[500]};
  background: ${(props) => props.printpackingslip && yellow[500]};
  background: ${(props) => props.cancelorder && yellow[500]};
  color: ${(props) => props.theme.palette.common.white};
`;

type NavbarProps = {
  theme: {};
};

const Orders: React.FC<NavbarProps> = () => {
  return (
    <div className="ordersview-wrapper">
      <Helmet title="Orders" />
      <Grid container>
        <Grid item xs={12} className="cstm-area">
          <Item className="no-bg">
            <Item className="no-bg">
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <Item className="no-bg">
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Item className="active-block status-block">
                          <Typography variant="h6" component="h6">
                            00
                          </Typography>
                          <Typography variant="caption" component="text">
                            Pending
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item className="status-block">
                          <Typography variant="h6" component="h6">
                            00
                          </Typography>
                          <Typography variant="caption" component="text">
                            Unshipped
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item className=" status-block">
                          <Typography variant="h6" component="h6">
                            00
                          </Typography>
                          <Typography variant="caption" component="text">
                            Canceled
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item className=" status-block">
                          <Typography variant="h6" component="h6">
                            00
                          </Typography>
                          <Typography variant="caption" component="text">
                            Shipped
                          </Typography>
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <FormControl
                        fullWidth
                        className=" input-hide order-id-lbl"
                      >
                        <InputLabel
                          id="demo-simple-select-label"
                          className="label-trans"
                        >
                          Order ID
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          className="select-fix"
                        >
                          <MenuItem value="Vegetables">A-123</MenuItem>
                          <MenuItem value="Clothes">B-123</MenuItem>
                          <MenuItem value="Jewellery">A-123</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <Item className="order-search-wrap">
                        <TextField
                          id="search"
                          className="search-field"
                          placeholder="Search"
                          fullWidth
                          size="small"
                          type="text"
                        />
                        <Button variant="contained" className="btn red-btn">
                          Search
                        </Button>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-30 cstm-clmn">
                <Grid item xs={12} className="text-left">
                  <Typography variant="h4" component="h4">
                    Manage Orders
                  </Typography>
                </Grid>
                <Grid item xs={1} className="text-left">
                  {" "}
                  <Typography
                    variant="caption"
                    component="text"
                    className="filter-text"
                  >
                    Refine By
                  </Typography>
                </Grid>
                <Grid item xs={3} className="text-left">
                  <Item className="no-bg">
                    <FormControl fullWidth className=" input-hide">
                      <InputLabel id="demo-simple-select-label">
                        Ship by Date
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="select-fix"
                      >
                        <MenuItem value="Clothes">All Dates</MenuItem>
                        <MenuItem value="Jewellery">Past Due</MenuItem>
                        <MenuItem value="Vegetables">Ship by today</MenuItem>
                        <MenuItem value="Vegetables">Ship by tomorrow</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={3} className="text-left">
                  <Item className="no-bg">
                    <FormControl fullWidth className=" input-hide">
                      <InputLabel id="demo-simple-select-label">
                        Merchants
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="select-fix"
                      >
                        <MenuItem value="Clothes">Merchants Name</MenuItem>
                        <MenuItem value="Jewellery">Merchants Name</MenuItem>
                        <MenuItem value="Vegetables">Merchants Name</MenuItem>
                        <MenuItem value="Vegetables">Merchants Name</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={3} className="text-left">
                  <Item className="no-bg">
                    <FormControl fullWidth className=" input-hide">
                      <InputLabel id="demo-simple-select-label">
                        Shipping Service
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="select-fix"
                      >
                        <MenuItem value="Clothes">Premium</MenuItem>
                        <MenuItem value="Jewellery">Super</MenuItem>
                        <MenuItem value="Vegetables">Regular</MenuItem>
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-30">
                <Grid item xs={12} className="text-right">
                  <ul className="filter order-filter">
                    <li>
                      <Link href="#">Date Range: Last 7 Days</Link>
                    </li>
                    <li>
                      <Link href="#">Ship by Date</Link>
                    </li>
                    <li>
                      <Link href="#">Results per page: 15</Link>
                    </li>
                    <li>
                      <Link href="#">Set Table Preferences</Link>
                    </li>
                    <li>
                      <Link href="#">Refresh</Link>
                    </li>
                  </ul>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} className="">
                  <Item className="pd-30 box-shadow">
                    <Grid className="width100 users-new-class">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650 }}
                          aria-label="simple table"
                          className=" order-tbl"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Order date</TableCell>
                              <TableCell align="left">Order details</TableCell>
                              <TableCell align="center">Image</TableCell>
                              <TableCell align="left">Product Name</TableCell>
                              <TableCell align="left">Custom Option</TableCell>
                              <TableCell align="center">Order Status</TableCell>
                              <TableCell align="center">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              key="1"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>4 days ago</strong>
                                <br />
                                2/17/2022 2:17 pm PST
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>000-0000000-0000000</strong>
                                <br /> Buyer name: John Smith Fulfillment
                                method: Select
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                                className="prdct-img"
                              >
                                <img src={image1} alt="image1" />
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <span className="product-name">
                                  RealMe mobile phone, 32GB, 1TB, 5 inch,
                                  (Black)
                                </span>
                                <p className="order-info">
                                  ASIN: 0000000
                                  <br />
                                  SKU: AMZ-C103-18-BLK
                                  <br />
                                  Quantity: 1<br />
                                  Item subtotal: $59.95
                                </p>
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>Free Economy Shipping</strong>
                                <br />
                                Ship by: Feb 28, 2022 to Mar 4, 2022
                                <br />
                                Deliver by Mar 4, 2022 to Mar 26. 2022
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                              >
                                <Chip
                                  size="small"
                                  className="status-btn"
                                  mr={1}
                                  mb={1}
                                  label="Unshipped"
                                  unshipped={+true}
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                              >
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Buy shipping"
                                  buyshipping={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Confirm shipment"
                                  confirmshippment={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Print packing slip"
                                  printpackingslip={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Cancel order"
                                  cancelorder={+true}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              key="2"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>5 days ago</strong>
                                <br />
                                2/17/2022 2:17 pm PST
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>123-456789-9876543</strong>
                                <br /> Buyer name: John Smith Fulfillment
                                method: Select
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                                className="prdct-img"
                              >
                                <img src={image2} alt="image2" />
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <span className="product-name">
                                  Headphone - Bluetooth HD sound with microphone
                                  (Black, Medium)
                                </span>
                                <p className="order-info">
                                  ASIN: 0000000
                                  <br />
                                  SKU: AMZ-C103-18-BLK
                                  <br />
                                  Quantity: 1<br />
                                  Item subtotal: $59.95
                                </p>
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>Free Economy Shipping</strong>
                                <br />
                                Ship by: Feb 28, 2022 to Mar 4, 2022
                                <br />
                                Deliver by Mar 4, 2022 to Mar 26. 2022
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                              >
                                <Chip
                                  size="small"
                                  className="status-btn"
                                  mr={1}
                                  mb={1}
                                  label="Unshipped"
                                  unshipped={+true}
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                              >
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Buy shipping"
                                  buyshipping={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Confirm shipment"
                                  confirmshippment={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Print packing slip"
                                  printpackingslip={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Cancel order"
                                  cancelorder={+true}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              key="3"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>5 days ago</strong>
                                <br />
                                2/17/2022 2:17 pm PST
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>000-0000000-0000000</strong>
                                <br /> Buyer name: John Smith Fulfillment
                                method: Select
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                                className="prdct-img"
                              >
                                <img src={image3} alt="image3" />
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <span className="product-name">
                                  Bluetooth speakers - 25 Wt , FM, Aux and Mike
                                  (Black, Medium)
                                </span>
                                <p className="order-info">
                                  ASIN: 0000000
                                  <br />
                                  SKU: AMZ-C103-18-BLK
                                  <br />
                                  Quantity: 1<br />
                                  Item subtotal: $59.95
                                </p>
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ verticalAlign: "top" }}
                              >
                                <strong>Free Economy Shipping</strong>
                                <br />
                                Ship by: Feb 28, 2022 to Mar 4, 2022
                                <br />
                                Deliver by Mar 4, 2022 to Mar 26. 2022
                              </TableCell>

                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                              >
                                <Chip
                                  size="small"
                                  className="status-btn"
                                  mr={1}
                                  mb={1}
                                  label="Unshipped"
                                  unshipped={+true}
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ verticalAlign: "top" }}
                              >
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Buy shipping"
                                  buyshipping={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Confirm shipment"
                                  confirmshippment={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Print packing slip"
                                  printpackingslip={+true}
                                />
                                <Chip
                                  size="small"
                                  className="actions-btn"
                                  mr={1}
                                  mb={1}
                                  label="Cancel order"
                                  cancelorder={+true}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Item>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default withTheme(Orders);
