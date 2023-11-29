import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Box,
} from "@mui/material";
// components
import { useNavigate, useLocation } from "react-router-dom";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IMG_PATH } from "../utils/url";
import { isLoading, openSnackbar } from "../redux/action/defaultActions";
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import UserProfileModal from "./UserProfileModal";
import UserDetailsEditModel from "./UserDetailsEditModel";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
// ----------------------------------------------------------------------

function CustomeGridToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "contact", label: "Contact Number", alignRight: false },
  { id: "username", label: "username", alignRight: false },
  { id: "shopId", label: "ShopId", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------
function CustomeToolBar() {
  return (
    <Grid container>
      <Grid
        item
        md={6}
        sm={12}
        xs={12}
        sx={{
          alignItems: "center",
          display: "flex",
          direction: "row",
          justifyContent: "start",
        }}
      >
        <Box width="100%" sx={{ p: 2 }}>
          <CustomeGridToolbar />

          {/* <GridToolbarQuickFilter
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "rgba(158, 158, 158, 1)",
                borderRadius: "10px",
                borderColor: "rgba(158, 158, 158, 1)",
              },
            }}
          /> */}
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sm={12}
        xs={12}
        sx={{
          alignItems: "center",
          display: "flex",
          direction: "row",
          justifyContent: "start",
        }}
      >
        {/* <GridToolbar /> */}
        {/* <CustomeGridToolbar /> */}
      </Grid>
    </Grid>
  );
}
// ======================================================================
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [shop, setShop] = useState();
  const [idShop, setIdShop] = useState();

  const [allUsers, setallUsers] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected,  setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userDetails, setUserDetails] = useState();

  const [Filter, setFilter] = useState();
  const [activeData, setActiveData] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [OpenUserEditModal, setOpenUserEditModal] = useState(false);

  const [userId, setuserId] = useState(null);
  const [editActiveData, setEditActiveData] = useState(null);
  const [updatedata, setUpdatedData] = useState({
    contactNo: "",
    email: "",
    shops: [],
  });
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleOpenMenu = (event, data) => {
    console.log(data._id);
    setuserId(data._id);
    setEditActiveData(data);

    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleUserDelete = async () => {
    // console.log(userId);
    handleCloseMenu();
    dispatch(isLoading(true));
    try {
      const response = await axios.delete(
        `/api/v1/admin/delete/user/${userId}`
      );
      // console.log(response);
      // console.log(response?.data?.success);
      if (response?.data?.success === true) {
        getAllusers();
        // handleClose()
      }
      dispatch(openSnackbar("User deleted successfully", "success"));
      dispatch(isLoading(false));
    } catch (error) {
      // console.log(error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  const toggleProfileModal = () => setOpenProfileModal(!openProfileModal);
  const toggleConfirmationModal = () =>
    setOpenConfirmationModal(!openConfirmationModal);
  const handleDeleteConfirmationModal = () => {
    // console.log("hello");
    toggleConfirmationModal();
    setOpen(null);
  };
  const handleCloseConfirmationModal = () => {
    toggleConfirmationModal();
  };
  // ***********************Filter section Function***********************

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  // *******************select shop in dropdown **********************
  const handleChange = (event, id) => {
    // console.log("pehli", event.target.value, "dusri", id);
    setShop(event.target.value);
    setIdShop(id);
  };
  // console.log("mst iD", idShop, "shopNo", shop);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const getAllusers = async () => {
    dispatch(isLoading(true));
    try {
      const response = await axios.get("/api/v1/admin/get/all/users");
      // console.log("=ALLUser=>", response?.data?.allUsers);
      setallUsers(response?.data?.allUsers);
      dispatch(isLoading(false));
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };

  // **********************************Handle create Invoice  *************************
  const handlechange = async (event, id) => {
    dispatch(isLoading(true));
    try {
      const response = await axios.post(
        `/api/v1/admin/create/invoice/${event}`
      );
      // console.log("invoice=>", response);
      if (response?.status === 200) {
        setUserDetails(response.data);
        // navigate("/dashboard/createInvoice", { event });
      }
      dispatch(isLoading(false));
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  // table fields
  const openProfileModalHandler = (data) => {
    setActiveData(data);
    toggleProfileModal();
    // console.log(data)
  };
  const profileCloseHandlerModal = () => {
    setActiveData(null);
    toggleProfileModal();
  };
  const toggleUserEditModal = () => setOpenUserEditModal(!OpenUserEditModal);

  const handleOpenUserEditModal = () => {
    // console.log(data)
    setOpen(null);
    toggleUserEditModal();
  };
  const handleCloseUserEditModal = () => {
    setEditActiveData(null);
    setOpen(null);

    toggleUserEditModal();
  };
  const UserUpdateHandler = async () => {
    dispatch(isLoading(true));
    // console.log("update api =>", updatedata);
    try {
      const response = await axios.put(
        `/api/v1/admin/update/user/and/shops/alloted/${userId}`,
        {
          contactNo: updatedata.contactNo,
          email: updatedata.email,
          shopsAlloted: updatedata.shops,
        }
      );
      // console.log(response);
      // console.log(updatedata);
      if (response?.statusText === "OK") {
        getAllusers();
      }
      handleCloseUserEditModal();
      dispatch(openSnackbar("User Details updated", "success"));
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  const columns = [
    { field: "index", headerName: "Sr No.", width: 60 },
    {
      field: "firstName",
      headerName: "Name",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => openProfileModalHandler(params?.row?._id)}
            >
              <Avatar
                alt={params?.row?.firstName}
                src={`${params?.row?.profilePicture}`}
              />
              <Typography variant="subtitle2" noWrap sx={{ cursor: "pointer" }}>
                {`${params?.row?.firstName} ${params?.row?.lastName}`}
              </Typography>
            </Stack>
          </>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",

      width: 230,
      editable: false,
    },
    {
      field: "userName",
      headerName: "User Name",

      width: 150,
      editable: false,
    },
    {
      field: "contactNo",
      headerName: "Contact Number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "shopsAlloted",
      headerName: "Alloted Shops",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 170,

      renderCell: (params) => {
        return (
          <>
            <TextField
              select
              value={shop}
              defaultValue={"--"}
              fullWidth
              size="small"
              placeholder="Select Shop"
              onChange={(e) => {
                handleChange(e, params?.row?._id);
              }}
            >
              <MenuItem disabled value={"--"}>
                --select--
              </MenuItem>
              {params?.row?.shopsAlloted?.map((shop, rowIndex) => {
                // console.log(`double oops ${rowIndex}  => `,shop)
                return (
                  <MenuItem key={rowIndex} value={shop._id}>
                    {`Shop No.${shop.shopNo}`}
                  </MenuItem>
                );
              })}
            </TextField>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="large"
              color="inherit"
              onClick={(event) => handleOpenMenu(event, params?.row)}
              sx={{ ml: 3 }}
            >
              <Iconify
                icon={"eva:more-vertical-fill"}
                // onClick={() => handlechange(params?.row?._id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //

  const rowsWithIndex = allUsers?.map((row, index) => ({
    ...row,
    index: index + 1,
  }));

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <>
      <Helmet>
        <title> User | Society Management </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom sx={{ color: " #9F2936" }}>
            User
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate("/dashboard/user/createUser")}
          >
            Add User
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <DataGrid
              rows={rowsWithIndex}
              columns={columns}
              slots={{ toolbar: CustomeToolBar }}
              getRowId={(row) => row?._id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              components={{
                HeaderCell: ({ field }) => (
                  
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "unset",
                      overflow: "visible",
                      backgroundColor:"black",
                      color:"white"
                    }}
                  >
                    {/* {field} */}
                  </div>
                ),
              }}
              pageSizeOptions={[10]}
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }}
              // checkboxSelection
              // disableRowSelectionOnClick
            />
          </Scrollbar>
          {/* 
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleDeleteConfirmationModal}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleOpenUserEditModal}
        >
          <Iconify icon={"mingcute:edit-line"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() =>
            navigate("/dashboard/createInvoice", {
              state: { shop, idShop },
            })
          }
          // onClick={() => {
          //   handlechange(_id);
          // }}
        >
          <Iconify icon={"ep:avatar"} sx={{ mr: 2 }} />
          Invoice
        </MenuItem>
      </Popover>
      <UserProfileModal
        open={openProfileModal}
        data={activeData}
        handleClose={profileCloseHandlerModal}
      />
      <UserDetailsEditModel
        data={editActiveData}
        userId={userId}
        getAllusers={getAllusers}
        open={OpenUserEditModal}
        handleClose={handleCloseUserEditModal}
        updatedata={updatedata}
        setUpdatedData={setUpdatedData}
        handleAction={UserUpdateHandler}
      />
      <DeleteConfirmationModal
        open={openConfirmationModal}
        handleClose={handleCloseConfirmationModal}
        handleAction={handleUserDelete}
        warningMsg={"delete"}
        modalFor="User"
      />
    </>
  );
}
