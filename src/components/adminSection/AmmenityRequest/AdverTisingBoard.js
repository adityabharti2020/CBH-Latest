import React, { useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Chip,
  List,
  ListItem,
  Avatar,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Box,
  Button
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddHomeIcon from '@mui/icons-material/AddHome';

import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdverTisingBoard = ({ cardData, index, handleClose, data, open }) => {
    // console.log(cardData);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const navigate = useNavigate();
  const Startdate = dayjs(cardData.dateForAdvertisingBoard.from);
  const StartformattedDate = Startdate.format("DD-MM-YYYY");

  const Enddate = dayjs(cardData.dateForAdvertisingBoard.to);
  const EndformattedDate = Enddate.format("DD-MM-YYYY");
  //   console.log(formattedDate);
  const Createddate = dayjs(cardData.createdAt);
  const CreateddateFormatted = Createddate.format("DD-MM-YYYY");

  const SlotStartTimeFormater = (starttime) => {
    const currentTime = dayjs(starttime);
    // const formattedTime = currentTime.format('HH:mm:ss');
    const formattedStartTime = currentTime.format("h:mm A");
    // console.log(formattedStartTime);
    return formattedStartTime;
  };
  const SlotEndTimeFormater = (endTime) => {
    const currentTime = dayjs(endTime);
    // const formattedTime = currentTime.format('HH:mm:ss');
    const formattedEndTime = currentTime.format("h:mm A");
    // console.log(formattedEndTime);
    return formattedEndTime;
  };
  const statusAcceptHandler = async () => {
    setAccept(true);
    console.log("inside status");
    try {
      const response = await axios.put("/api/v1/admin/update/booking/status", {
        bookingId: cardData._id,
        orderBookingStatus: "accepted",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const statusRejectHandler = async () => {
    setAccept(true);
    console.log("inside status");
    try {
      const response = await axios.put("/api/v1/admin/update/booking/status", {
        bookingId: cardData._id,
        orderBookingStatus: "rejected",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Grid
        item
        key={index}
        xs={12}
        sm={5.75}
        md={5.75}
        sx={{
          bgcolor: "rgb(223, 229, 228)",
          paddingX: "20px",
          paddingY: "20px",
          borderRadius: "10px",
          display:"flex",
          justifyContent:"space-between",
          flexDirection:"column"
        }}
      >
        <Stack
          spacing={1}
          sx={{
            justifyContent: "space-between",
            display:"flex",
            flexDirection:{
              xs:"column",
              sm:"row",
              md:"row",
            }
          }}
        >
          <Stack>
          <List>
            <ListItem disablePadding>
              
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "22px", fontWeight: "bold" }}
              >
                Booking Detail
              </Typography>
            </ListItem>
          </List>
        </Stack>
          <Chip
            label={`${cardData?.bookingStatus.toUpperCase()}`}
            color={
              cardData?.bookingStatus === "accepted"
                ? "primary"
                : cardData?.bookingStatus === "rejected"
                ? "error"
                : "warning"
            }
            sx={{ color: "white" }}
          />
        </Stack>
        <Stack sx={{mt:"5px"}}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon sx={{}}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", width: 35, height: 35}}>
                    {<AddHomeIcon />}
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="body1"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {cardData?.Amenity.amenityName}
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booked On"
                secondary={CreateddateFormatted}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Duration of Booking"
                secondary={`${StartformattedDate} to ${EndformattedDate}`}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booking Id"
                secondary={cardData._id}
              />
            </ListItem>
          </List>
        </Stack>
        <Stack>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", width: 35, height: 35 }} />
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                User Detail
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            justifyContent: "space-between",
            flexWrap: "wrap",
            
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booking Raised By"
                secondary={` ${cardData.user.firstName} ${cardData.user.lastName}`}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Contact Number"
                secondary={cardData.user.contactNo}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Email"
                secondary={cardData.user.email}
              />
            </ListItem>
          </List>
        </Stack>
        <Stack>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "gray",width: 35, height: 35 }}>
                      {<CreditCardIcon />}
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <Typography
                  varient="h6"
                  component="body1"
                  sx={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  Price Detail
                </Typography>
              </ListItem>
            </List>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
              },
              justifyContent: "space-between",
              flexWrap: "wrap",
              
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary="Base Price"
                  secondary={` ${cardData.Amenity.basePrice}`}
                />
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="GST" secondary={`${cardData.Amenity.GST} %`} />
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Total Price" secondary={cardData.price} />
              </ListItem>
            </List>
          </Stack>
        <Stack direction={"column"} sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "green",
                marginX: "15px",
                "&:hover": { bgcolor: "green" },
              }}
              onClick={statusAcceptHandler}
            >
              Accept
            </Button>
            {/* <Snackbar
              open={accept}
              autoHideDuration={3000}
              onClose={AccepthandleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <AcceptAlert
                onClose={AccepthandleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Booking Accepted!
              </AcceptAlert>
            </Snackbar> */}
            <Button
              variant="contained"
              sx={{ bgcolor: "red", "&:hover": { bgcolor: "red" } }}
              onClick={statusRejectHandler}
            >
              Reject
            </Button>
            {/* <Snackbar
              open={reject}
              autoHideDuration={3000}
              onClose={RejecthandleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <RejecttAlert
                onClose={RejecthandleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Booking Canceled!
              </RejecttAlert>
            </Snackbar> */}
          </Box>
        </Stack>
      </Grid>
    </>
  );
};
AdverTisingBoard.propTypes = { cardData: [] };

export default AdverTisingBoard;
