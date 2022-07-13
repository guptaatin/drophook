import React from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import {
  Breadcrumbs as MuiBreadcrumbs,
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
import { GetAllVendorApprovedService } from "../../services/VendorService";
import MUIDataTable from "mui-datatables";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

type RowType = {
  [key: string]: string | number;
  id: string;
  company_name: string;
  email: string;
  company_website: string;
  received_on: string;
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
  { id: "company_name", alignment: "left", label: "Company Name" },
  { id: "email", alignment: "left", label: "Vendor Email" },
  { id: "company_website", alignment: "left", label: "Company Website" },
  { id: "createdAt", alignment: "left", label: "Received On" },
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
  const [loader, setLoader] = React.useState(true);
  const [searchVendor, setSearchVendor] = React.useState<any>("");
  React.useEffect(() => {
    const allVendorsApproved = async () => {
      const json = await GetAllVendorApprovedService();
      setRows(json);
      setLoader(false);
    };
    allVendorsApproved();
  }, []);
  const lowercasedFilter = searchVendor.toLowerCase();
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
            placeholder="Search Vendor"
            value={searchVendor}
            onChange={(e) => setSearchVendor(e.target.value)}
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
                          to={`/vendor/vendordetails/${row.id}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            textDecoration: "none",
                          }}
                        >
                          <TableCell align="left">{row.company_name}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">
                            {row.company_website}
                          </TableCell>
                          <TableCell align="left">
                            {moment(row.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

function Vendor() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [vendorsServe, setVendorsServe] = React.useState<any>();
  const [loader, setLoader] = React.useState(true);
  const columns = [
    {
      name: "company_name",
      label: "Company Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "25%" },
        }),
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
      },
    },
    {
      name: "company_website",
      label: "Company Website",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: (value: any) => ({
          style: { width: "25%" },
        }),
      },
    },
    {
      name: "createdAt",
      label: "Received At",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => {
          return <>{moment(value).format("MMMM Do YYYY, h:mm:ss a")}</>;
        },
        setCellHeaderProps: (value: any) => ({
          style: { width: "25%" },
        }),
      },
    },
  ];
  React.useEffect(() => {
    const allVendorsApproved = async () => {
      try {
        const json = await GetAllVendorApprovedService();
        setRows(json);
        setLoader(false);
      } catch (e) {
        setVendorsServe(e)
      }
    };
    allVendorsApproved();
  }, []);
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
  const handleClick = (row: any) => {
    navigate(`/vendor/vendordetails/${row.id}`);
  };
  return (
    <>
    {vendorsServe === undefined ?
    <React.Fragment>
      <Helmet title="Vendors" />
      <Grid
        className="total-back width100"
        justifyContent="space-between"
        container
        spacing={10}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Vendors
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/dashboard/default">
              Dashboard
            </Link>
            <Typography>Vendors</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* <EnhancedTable /> */}
          <MUIDataTable
            title={"Vendors List"}
            data={rows}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </React.Fragment>
    :
    <h1 className="not-working">Vendors are currently unavailable. Please try again after few minutes.</h1>
    }
    </>
  );
}

export default Vendor;
