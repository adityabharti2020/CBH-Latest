import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
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

const ConfirmRequested = ({ setCardData }) => {
  const dispatch = useDispatch();
  const [activeRequestData, setActiveRequestData] = useState(null);
  const [openScheduleMeetModal, setOpenScheduleMeetModal] = useState(false);
  const [confirmReq, setConfirmReq] = useState();

  const BookingConfirmReq = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get(
        "/api/v1/admin/get/all/bookings/as/per/status?bookingStatus=accepted"
      );
      // console.log(response)
      setConfirmReq(response?.data.bookings);
      setCardData(response?.data.bookings);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
    }
  };
  // console.log("dekhooo Confirm=>", confirmReq);

  useEffect(() => {
    BookingConfirmReq();
  }, []);

  return (
    <>
      {/* <Typography color="#9f2936" variant="h4" component="h2">
        Confirmed Request
      </Typography> */}
      <Grid>
        {confirmReq?.length === 0 ? (
          "No Data Found"
        ) : (
          <Card>
            <Scrollbar>
              <TableContainer>
                <Table>
                  {confirmReq?.map((cardData, index) => {
                    return (
                      <>
                        <UserListHead headLabel={TABLE_HEAD} />
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
                                  variant="text"
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
                                  cardData.bookingStatus === "accepted"
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

export default ConfirmRequested;
