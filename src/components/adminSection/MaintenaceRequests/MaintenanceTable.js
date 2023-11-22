import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../../scrollbar";
import { UserListHead } from "../../../sections/@dashboard/user";
import TableModal from "./TableModal";
import RequestAcceptModal from "./RequestAcceptModal";

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "shopId", label: "Floor/Shop" },
  { id: "date", label: "Date" },
  { id: "problemType", label: "ProblemType" },
  { id: "contact", label: "Contact Number" },
  { id: "status", label: "Status" },

  //   { id: "action", label: "Action" },
];

const MaintenanceTable = ({ cardData }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = useState([]);
  const [filterVal, setFilterVal] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);

    // navigate("/dashboard/maintenanceRequestModal", {
    //   state: open,
    //   handleClose,
    //   handleOpen,
    //   cardData,
    // });
  };
  const handleClose = () => setOpen(false);

  const [searchValue, setSearchValue] = useState("");
  // console.log("objec===>t", cardData[0]?.createdAt);
  const date = dayjs(cardData?.createdAt);
  const formattedDate = date.format("DD-MM-YYYY");
  // console.log("tableData========>", cardData);

  const handleChange = (event) => {
    setFilterVal(event.target.value);
    switch (event.target.value) {
      case "A":
        sortAtoZ();
        break;
      case "Z":
        sortZtoA();
        break;
      case "Date":
        sortByDate();
        break;
      default:
        setSearchValue(event.target.value);
        break;
    }
  };

  const sortAtoZ = () => {
    cardData.sort((a, b) => {
      const problemTypeA = a?.user?.firstName?.toUpperCase(); // Ignore case while sorting
      const problemTypeB = b?.user?.firstName?.toUpperCase();
      if (problemTypeA < problemTypeB) {
        return -1;
      }
      if (problemTypeA > problemTypeB) {
        return 1;
      }
      return 0; // Problem types are equal);
    });
  };

  const sortZtoA = () => {
    cardData.sort((a, b) => {
      const problemTypeA = a.problemId.problemType.toUpperCase(); // Ignore case while sorting
      const problemTypeB = b.problemId.problemType.toUpperCase();
      if (problemTypeA > problemTypeB) {
        return -1;
      }
      if (problemTypeA < problemTypeB) {
        return 1;
      }
      return 0; // Problem types are equal);
    });
  };

  const sortByDate = () => {
    cardData.sort((a, b) => {
      const problemTypeA = new Date(a.createdAt).getTime(); // Ignore case while sorting
      const problemTypeB = new Date(b.createdAt).getTime();
      if (problemTypeA > problemTypeB) {
        return -1;
      }
      if (problemTypeA < problemTypeB) {
        return 1;
      }
      return 0; // Problem types are equal);
    });
  };
  // console.log("mstDATA====>", cardData);

  const filteredData = searchValue
    ? cardData?.filter((data) => {
        return (
          // data?.user?.firstName?.toLowerCase().includes(searchValue) ||
          // data?.user?.lastName?.toLowerCase().includes(searchValue) ||
          data.problemId?.problemType?.toLowerCase().includes(searchValue)
        );
      })
    : cardData;

  return (
    <>
      <Card>
        <Stack>
          <Grid
            TableContainer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid style={{ minWidth: "20%", padding: "0.5rem" }}>
              <FormControl size="small" fullWidth p={1}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterVal}
                  label="Filter"
                  onChange={handleChange}
                >
                  <MenuItem value={"A"}>A to Z</MenuItem>
                  {/* <MenuItem value={"electrical"}>Electrical</MenuItem> */}
                  {/* <MenuItem value={"Z"}>Z to A</MenuItem> */}
                  <MenuItem value={"Date"}>Latest Date</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid style={{ width: "60%", padding: "0.5rem" }}>
              <TextField
                fullWidth
                size={"small"}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                // order={order}
                // orderBy={orderBy}
                headLabel={TABLE_HEAD}
                // rowCount={USERLIST.length}
                // numSelected={selected.length}
                // onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredData?.map((cardData, index) => {
                  return (
                    <>
                      <TableRow
                        hover
                        key={index}
                        // onClick={(_id) => {
                        //   handleOpen(cardData._id);
                        // }}
                      >
                        <TableCell component="th" scope="row">
                          {cardData?.user?.firstName} {cardData?.user?.lastName}
                        </TableCell>
                        <TableCell align="left">
                          Floor :{cardData?.shop?.floor?.floor}/ ShopNo:
                          {cardData?.shop?.shopNo}
                        </TableCell>
                        <TableCell align="left">
                          {dayjs(cardData?.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="left">
                          {cardData?.problemId?.problemType}
                        </TableCell>
                        <TableCell align="left">
                          {cardData?.user?.contactNo}
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{
                            backgroundColor:
                              cardData.status === "accepted"
                                ? "blue"
                                : cardData.status === "rejected"
                                ? "red"
                                : cardData.status === "resolved"
                                ? "orange"
                                : cardData?.status === "closed"
                                ? "green"
                                : "#d9d91a",
                            cursor: "pointer",
                            color: "white",
                          }}
                          onClick={handleOpen}
                        >
                          {cardData.status.slice(0, 1).toUpperCase()}
                          {cardData.status.slice(1)}
                        </TableCell>

                        {/* <TableCell align="left"></TableCell> */}
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <RequestAcceptModal
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          cardData={cardData}
        />
        {/* <TableModal open={open} handleClose={handleClose} userId={userId} /> */}

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
    </>
  );
};
export default MaintenanceTable;
