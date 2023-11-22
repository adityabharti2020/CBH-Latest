import {
  Button,
  Card,
  Grid,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { isLoading } from "../../../redux/action/defaultActions";
import { UserListHead } from "../../../sections/@dashboard/user";
import Scrollbar from "../../scrollbar/Scrollbar";

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "amenityType", label: "AmenityType" },
  { id: "bookedOn", label: "BookedOn" },
  { id: "bookedDate", label: "BookingDate/s" },
  { id: "netPrice", label: "Net Price(Inc.Gst)" },
  { id: "status", label: "Status" },

  //   { id: "action", label: "Action" },
];

const ResolvedRequest = ({ setCardData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const [resolve, setResolve] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // *******************select shop in dropdown **********************

  const resolveRequest = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get("/api/v1/admin/get/all/past/bookings");
      // console.log(response?.data.bookings);
      setResolve(response?.data.bookings);
      setCardData(response?.data.bookings);

      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
    }
  };
  //
  useEffect(() => {
    resolveRequest();
  }, []);

  return (
    <>
      {/* <Typography color="#9f2936" variant="h4" component="h2">
        Past Booking
      </Typography> */}
      <Grid>
        {resolve?.length === 0 ? (
          "No Data Found"
        ) : (
          <Card>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  {resolve?.map((cardData, index) => {
                    return (
                      <>
                        <TableBody>
                          <TableRow
                            hover
                            key={index}
                            // onClick={(_id) => {
                            //   handleOpen(cardData._id);
                            // }}
                          >
                            <TableCell component="th" scope="row">
                              {cardData?.user?.firstName}{" "}
                              {cardData?.user?.lastName}
                            </TableCell>
                            <TableCell align="left">
                              {cardData?.Amenity?.amenityName}
                            </TableCell>
                            <TableCell align="left" minWidth={"5rem"}>
                              {dayjs(cardData?.createdAt).format("DD-MM-YYYY ")}
                            </TableCell>
                            {cardData?.Amenity?.amenityName ===
                            "Conference Room" ? (
                              <TableCell
                                sx={{ minWidth: "10rem" }}
                                align="left"
                              >
                                {/* <TextField
                                  select
                                  value={"See The Slot"}
                                  size="small"
                                  placeholder="See the Slot"
                                  fullWidth
                                  sx={{
                                    border: "0px !important",
                                    "&>fieldset": { display: "none" },
                                    outline: "none",
                                  }}
                                  // onChange={(e) => {
                                  //   handleChange(e);
                                  // }}
                                >
                                
                                  {cardData?.bookedSlots?.map(
                                    (slot, rowIndex) => {
                                      return (
                                        <MenuItem
                                          key={rowIndex}
                                          value={slot._id}
                                        >
                                          {dayjs(slot?.startTime).format(
                                            "hh:MM A "
                                          )}
                                          {" to"}
                                          &nbsp;
                                          {dayjs(slot?.endTime).format(
                                            "hh:MM A"
                                          )}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </TextField> */}

                                <Button
                                  id="basic-button"
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={handleClick}
                                >
                                  See All Slot
                                </Button>

                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  // MenuListProps={{
                                  //   "aria-labelledby": "basic-button",
                                  // }}
                                >
                                  {cardData?.bookedSlots?.map(
                                    (slot, keyIndex) => {
                                      return (
                                        <MenuItem
                                          key={keyIndex}
                                          // value={slot._id}
                                          onClick={handleClose}
                                        >
                                          {dayjs(slot?.startTime).format(
                                            "hh:MM A "
                                          )}
                                          {" to"}
                                          &nbsp;
                                          {dayjs(slot?.endTime).format(
                                            "hh:MM A"
                                          )}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Menu>
                              </TableCell>
                            ) : (
                              <TableCell align="left">
                                {dayjs(
                                  cardData?.dateForAdvertisingBoard?.from
                                ).format("DD-MM-YYYY ")}
                                {" to"}
                                &nbsp;
                                {dayjs(
                                  cardData?.dateForAdvertisingBoard?.TO
                                ).format("DD-MM-YYYY ")}
                              </TableCell>
                            )}
                            <TableCell align="left">
                              ₹{cardData?.price}
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                backgroundColor:
                                  cardData?.bookingStatus === "completed"
                                    ? "green"
                                    : cardData?.bookingStatus === "rejected"
                                    ? "red"
                                    : "#d9d91a",
                                color: "white",
                              }}
                            >
                              {cardData.bookingStatus.slice(0, 1).toUpperCase()}
                              {cardData.bookingStatus.slice(1)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </>
                    );
                  })}
                </Table>
              </TableContainer>
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
        )}
      </Grid>
    </>
  );
};

export default ResolvedRequest;
