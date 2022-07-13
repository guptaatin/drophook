import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./profile.css";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider as MuiDivider,
  Grid,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import "./products.css";
import "./profile.css";
import CircularProgress from "@mui/material/CircularProgress";
import { VendorRequestByEmailService } from "../../services/VendorRequestService";
import { GetVendorUsersService } from "../../services/VendorService";
import { GetAllUsersService } from "../../services/UserService";
import MUIDataTable from "mui-datatables";

const Paper = styled(MuiPaper)(spacing);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

type RowType = {
  [key: string]: string | number;
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
};

function descendingComparator(a: RowType, b: RowType, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: "desc" | "asc", orderBy: string) {
  return order === "desc"
    ? (a: RowType, b: RowType) => descendingComparator(a, b, orderBy)
    : (a: RowType, b: RowType) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: Array<RowType>,
  comparator: (a: RowType, b: RowType) => number
) {
  const stabilizedThis = array.map((el: RowType, index: number) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

type HeadCell = {
  id: string;
  alignment: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  label: string;
  disablePadding?: boolean;
};
const headCells: Array<HeadCell> = [
  { id: "first_name", alignment: "left", label: "Name" },
  { id: "code", alignment: "left", label: "Role" },
  { id: "email", alignment: "left", label: "Email" },
  { id: "phone_no", alignment: "left", label: "Phone" },
];

type EnhancedTableHeadProps = {
  order: "desc" | "asc";
  orderBy: string;
  onRequestSort: (e: any, property: string) => void;
};
const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow className="users-head">
        {headCells.map((headCell: HeadCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<any[]>([]);
  const profileUserEmail = localStorage.getItem("userSignInEmail");
  var role = localStorage.getItem("role");
  const [loader, setLoader] = React.useState(true);
  const [searchUser, setSearchUser] = React.useState<any>("");
  useEffect(() => {
    if (
      role === "ROLE_ADMINISTRATOR" ||
      role === "ROLE_SUPER ADMINISTRATOR" ||
      role === "ROLE_MANAGER"
    ) {
      const adminUsers = async () => {
        const json = await GetAllUsersService();
        setRows(json);
        setLoader(false);
      };
      adminUsers();
    }
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const vendorUsers = async () => {
        const json = await VendorRequestByEmailService(profileUserEmail);
        const jsonNew = await GetVendorUsersService(json[0].id);
        setRows(jsonNew);
        setLoader(false);
      };
      vendorUsers();
    }
  }, [profileUserEmail, role]);

  const lowercasedFilter = searchUser.toLowerCase();
  const filteredData = rows?.filter((item: any) => {
    return Object.keys(item).some(
      (key) =>
        typeof item[key] === "string" &&
        item[key].toLowerCase().includes(lowercasedFilter)
    );
  });

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Paper>
        <div className="search-type">
          <input
            placeholder="Search User"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            {!loader ? (
              <>
                <TableBody>
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: number) => {
                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={`${row.id}-${index}`}
                            component={NavLink}
                            to={`/users/userdetails/${row.id}`}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              textDecoration: "none",
                            }}
                          >
                            <TableCell align="left">
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
                            </TableCell>
                            <TableCell>
                              {row.code !== null ? (
                                <>
                                  {row.code === "1000"
                                    ? "Super Administrator"
                                    : row.code === "2001"
                                    ? "Vendor Administrator"
                                    : row.code === "1002"
                                    ? "Administrator"
                                    : row.code === "2002"
                                    ? "Vendor Manager"
                                    : row.code === "1003"
                                    ? "Manager"
                                    : null}
                                </>
                              ) : null}
                            </TableCell>
                            <TableCell>
                              {row.code !== null ? <>{row.email}</> : null}
                            </TableCell>
                            <TableCell>
                              {row.phone_no !== null ? (
                                <>
                                  {row.phone_no === null ? "-" : row.phone_no}
                                </>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )} */}
                </TableBody>
              </>
            ) : (
              <CircularProgress color="error" className="details-loader" />
            )}
          </Table>
        </TableContainer>
        <TablePagination
          className="cstm-pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export const Users = () => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [usersServe, setUsersServe] = React.useState<any>();
  const profileUserEmail = localStorage.getItem("userSignInEmail");
  const [loader, setLoader] = React.useState(true);
  var role = localStorage.getItem("role");
  useEffect(() => {
    if (
      role === "ROLE_ADMINISTRATOR" ||
      role === "ROLE_SUPER ADMINISTRATOR" ||
      role === "ROLE_MANAGER"
    ) {
      const adminUsers = async () => {
        try {
          const json = await GetAllUsersService();
          setRows(json);
          setLoader(false);
        } catch (e) {
          setUsersServe(e)
        }
      };
      adminUsers();
    }
    if (role === "ROLE_VENDOR ADMINISTRATOR") {
      const vendorUsers = async () => {
        try {
          const json = await VendorRequestByEmailService(profileUserEmail);
          const jsonNew = await GetVendorUsersService(json[0].id);
          setRows(jsonNew);
          setLoader(false);
        } catch (e) {
          setUsersServe(e)
        }
      };
      vendorUsers();
    }
  }, [profileUserEmail, role]);
  rows.forEach((row) => {
    if (row.first_name !== null && row.last_name !== null) {
      row.full_name =
        row.first_name.charAt(0).toUpperCase() +
        row.first_name.slice(1) +
        " " +
        row.last_name.charAt(0).toUpperCase() +
        row.last_name.slice(1);
    } else {
      row.full_name =
        row.code === "1000" ? "Super Administrator" : "Administrator";
    }
    row.role =
      row.code === "1000"
        ? "Super Administrator"
        : row.code === "2001"
        ? "Vendor Administrator"
        : row.code === "1002"
        ? "Administrator"
        : row.code === "2002"
        ? "Vendor Manager"
        : "Manager";
  });
  const columns = [
    {
      name: "full_name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "25%" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "email",
      label: "Vendor Email",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "25%" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { width: "25%" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "phone_no",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "25%" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === null ? "NA" : value}</>;
        },
      },
    },
  ];
  const options: any = {
    selectableRows: false,
    onRowClick: (rowData: any, rowMeta: any) => {
      handleClick(rows[rowMeta.dataIndex]);
    },
    setRowProps: () => {
      return {
        style: { cursor: "pointer" },
      };
    },
    textLabels: {
      body: {
        noMatch: loader ? <CircularProgress color="error" /> : 'Sorry, there is no matching data to display',
      }
    }
  };
  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate("/users/usersadd");
  };
  const handleClick = (row: any) => {
    navigate(`/users/userdetails/${row.id}`);
  };
  return (
    <>
    {usersServe === undefined ?
    <div>
      <Helmet title="Users" />
      <Box sx={{ width: "100%" }}>
        <Grid
          className="above-box-wrapper add-users-new width100"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} className="approve-btn-wrapper">
            <Grid item>
              <Typography variant="h3" gutterBottom display="inline">
                Users
              </Typography>

              <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/dashboard/default">
                  Dashboard
                </Link>
                <Typography>Users</Typography>
              </Breadcrumbs>
            </Grid>
            <Item>
              <Button
                className="approve-btn form-btn"
                value="approved"
                onClick={handleAddUser}
              >
                <svg
                  className="MuiSvgIcon-root-ffqUiY cydUGy MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  data-testid="AddIcon"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                </svg>
                Add User
              </Button>
            </Item>
          </Grid>
          <Divider my={6} />
          <Grid className="width100 users-new-class">
            {/* <EnhancedTable /> */}
            <MUIDataTable
              title={"Users List"}
              data={rows}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
    :
    <h1 className="not-working">Users are currently unavailable. Please try again after few minutes.</h1>
    }
    </>
  );
};
