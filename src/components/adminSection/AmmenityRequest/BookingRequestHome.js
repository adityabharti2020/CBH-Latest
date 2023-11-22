import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
// import { Option } from "@mui/base/Option";
import axios from "axios";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Option } from "@mui/joy";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import { UserListHead } from "../../../sections/@dashboard/user";
import Scrollbar from "../../scrollbar/Scrollbar";
import TableModal from "../MaintenaceRequests/TableModal";

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "amenityType", label: "AmenityType" },
  { id: "bookedOn", label: "BookedOn" },
  { id: "bookedDate", label: "BookingDate/s" },
  { id: "netPrice", label: "Net Price(Inc.Gst)" },
  { id: "status", label: "Status" },

  //   { id: "action", label: "Action" },
];

const BookingRequestHome = ({ title, setCardData }) => {
  const [BookingDetails, setBookingDetails] = useState();
  const [activeRequestData, setActiveRequestData] = useState(null);
  const [openScheduleMeetModal, setOpenScheduleMeetModal] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();

  //   const handleOpen = () => ;
  const handleOpen = (id) => {
    setUserId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const toggleScheduleModal = () =>
    setOpenScheduleMeetModal(!openScheduleMeetModal);

  const bookingRequest = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get("/api/v1/admin/get/all/bookings");
      setBookingDetails(response?.data?.allBookings);
      setCardData(response?.data?.allBookings);
      // console.log("bookingDetails====>", response?.data);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };

  useEffect(() => {
    bookingRequest();
  }, []);

  return (
    <>
      {/* <Grid
        container
        rowGap={2}
        columnGap={1}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ mt: "20px" }}
      >
        {BookingDetails?.map((request, index) => {
          return request?.Amenity?.amenityName === "Conference Room" ? (
            <ConferenceHall
              cardData={request}
              key={request._id}
              bookingRequest={bookingRequest}
              handleOpenModal={handleOpenModal}
            />
          ) : (
            <AdverTisingBoard
              cardData={request}
              key={index}
              open={openScheduleMeetModal}
              handleClose={handleCloseModal}
              data={activeRequestData}
            />
          );
        })}
      </Grid> */}
      {/* <Typography color="#9f2936" variant="h5" component="h2">
        Pending Request
      </Typography> */}
      <Grid>
        {BookingDetails?.length === 0 ? (
          "No Data Found"
        ) : (
          <Card>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  {BookingDetails?.map((cardData, index) => {
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

                              {/* {cardData?.shop?.shopNo} */}
                            </TableCell>

                            <TableCell align="left">
                              {dayjs(cardData?.createdAt).format("DD-MM-YYYY ")}
                            </TableCell>

                            {cardData?.Amenity?.amenityName ===
                            "Conference Room" ? (
                              <TableCell
                                sx={{ minWidth: "10rem" }}
                                align="left"
                              >
                                <TextField
                                  select
                                  value={"See The Slot"}
                                  placeholder="See the Slot"
                                  fullWidth
                                  size="small"
                                  // onChange={(e) => {
                                  //   handleChange(e);
                                  // }}
                                >
                                  {cardData?.bookedSlots?.map(
                                    (slot, rowIndex) => {
                                      return (
                                        // <MenuItem
                                        //   key={rowIndex}
                                        //   value={slot._id}
                                        // >
                                        //   {dayjs(slot?.startTime).format(
                                        //     "hh:MM A "
                                        //   )}
                                        //   {" to"}
                                        //   &nbsp;
                                        //   {dayjs(slot?.endTime).format(
                                        //     "hh:MM A"
                                        //   )}
                                        // </MenuItem>
                                        <Select defaultValue={10}>
                                          <Option value={10}>
                                            Documentation
                                          </Option>
                                          <Option value={20}>Components</Option>
                                          <Option value={30}>Features</Option>
                                        </Select>
                                      );
                                    }
                                  )}
                                </TextField>
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
                                  cardData.bookingStatus === "completed"
                                    ? "green"
                                    : cardData.bookingStatus === "rejected"
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

export default BookingRequestHome;
