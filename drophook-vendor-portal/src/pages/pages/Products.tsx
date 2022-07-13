import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
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
import CircularProgress from "@mui/material/CircularProgress";
import { ProductsService } from "../../services/ProductService";
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
  { id: "name", alignment: "left", label: "Product Name" },
  { id: "sku", alignment: "left", label: "SKU" },
  { id: "price", alignment: "left", label: "Price" },
  { id: "tax", alignment: "left", label: "Tax" },
  { id: "stock", alignment: "left", label: "Stock" },
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
      <TableRow className="products-head">
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
  const userId = localStorage.getItem("userid");
  var role = localStorage.getItem("role");
  const [loader, setLoader] = React.useState(true);
  const [searchProduct, setSearchProduct] = useState<any>("");
  useEffect(() => {
    if (role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR") {
      const ProductData = async () => {
        try {
          const json = await ProductsService();
          if (json) {
            setRows(json);
            setLoader(false);
          }
        } catch (e) {
          // Any errors thrown by `fetchData` or `doSomethingComplex` are caught.
        }
      };
      ProductData();
    } else {
      const ProductData = async () => {
        try {
          const json = await ProductsService();
          if (json) {
            setRows(json);
            setLoader(false);
          }
        } catch (error: any) {
          return error;
          // Any errors thrown by `fetchData` or `doSomethingComplex` are caught.
        }
      };
      ProductData();
    }
  }, [userId, role]);

  const handleProductSearch = (value: any) => {
    setSearchProduct(value);
  };

  const lowercasedFilter = searchProduct.toLowerCase();
  const filteredData = rows.filter((item: any) => {
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
            placeholder="Search Product"
            value={searchProduct}
            onChange={(e) => handleProductSearch(e.target.value)}
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
                    .map((row: RowType, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={`${row.id}-${index}`}
                          component={NavLink}
                          to={`/products/productdetails/${row.id}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            textDecoration: "none",
                          }}
                        >
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">
                            {row.sku === "" ? "NA" : row.sku}
                          </TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.tax}</TableCell>
                          <TableCell align="left">{row.stock}</TableCell>
                        </TableRow>
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

export const Products = () => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [productsServe, setProductsServe] = React.useState<any>();
  var role = localStorage.getItem("role");
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    if (role === "ROLE_ADMINISTRATOR" || role === "ROLE_SUPER ADMINISTRATOR") {
      const ProductData = async () => {
        try {
          const json = await ProductsService();
          if (json) {
            setRows(json);
            setLoader(false);
          }
        } catch (e) {
          setProductsServe(e)
        }
      };
      ProductData();
    } else {
      const ProductData = async () => {
        try {
          const json = await ProductsService();
          if (json) {
            setRows(json);
            setLoader(false);
          }
        } catch (error) {
          setProductsServe(error)
        }
      };
      ProductData();
    }
  }, [role]);
  const columns = [
    {
      name: "name",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "20%", cursor: "pointer" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "sku",
      label: "SKU",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "20%", cursor: "pointer" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "20%", cursor: "pointer" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "tax",
      label: "Tax",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "20%", cursor: "pointer" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
        },
      },
    },
    {
      name: "stock",
      label: "Stock",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "20%", cursor: "pointer" },
        }),
        customBodyRender: (value: any) => {
          return <>{value === "" ? "NA" : value}</>;
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
    navigate("/products/productsadd");
  };
  const handleClick = (row: any) => {
    navigate(`/products/productdetails/${row.id}`);
  };
  return (
    <>
    {productsServe === undefined ?
    <div>
      <Helmet title="Products" />
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
                Products
              </Typography>

              <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/dashboard/default">
                  Dashboard
                </Link>
                <Typography>Products</Typography>
              </Breadcrumbs>
            </Grid>
            {role !== "ROLE_ADMINISTRATOR" &&
            role !== "ROLE_SUPER ADMINISTRATOR" ? (
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
                  Add Product
                </Button>
              </Item>
            ) : null}
          </Grid>
          <Divider my={6} />
          <Grid className="width100 users-new-class">
            {/* <EnhancedTable /> */}
            <MUIDataTable
              title={"Products List"}
              data={rows}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
    :
    <h1 className="not-working">Products are currently unavailable. Please try again after few minutes.</h1>
    }
    </>
  );
};
