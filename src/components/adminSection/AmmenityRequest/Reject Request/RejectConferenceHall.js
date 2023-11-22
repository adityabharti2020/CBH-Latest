import React from "react";
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
} from "@mui/material";
import "../style.css";

import EventIcon from "@mui/icons-material/Event";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddHomeIcon from "@mui/icons-material/AddHome";

import dayjs from "dayjs";

const RejectConferenceHall = ({ cardData }) => {
  const date = dayjs(cardData.dateForConferenceHall);
  const formattedDate = date.format("DD-MM-YYYY");

  const Generateddate = dayjs(cardData.createdAt);
  const formatteGenerateddate = Generateddate.format("DD-MM-YYYY");

  const UpdatedDate = dayjs(cardData?.updatedAt);
  const UpdateformattedDate = UpdatedDate.format("DD-MM-YYYY");
  const SlotStartTimeFormater = (starttime) => {
    const currentTime = dayjs(starttime);
    const formattedStartTime = currentTime.format("h:mm A");
    return formattedStartTime;
  };

  const SlotEndTimeFormater = (endTime) => {
    const currentTime = dayjs(endTime);
    const formattedEndTime = currentTime.format("h:mm A");
    return formattedEndTime;
  };
  return (
    <>
      <Grid
        item
        key={cardData._id}
        xs={12}
        sm={5.75}
        md={5.75}
        sx={{
          bgcolor: "#CCBBFF",
          paddingX: "20px",
          paddingY: "20px",
          borderRadius: "10px",
        }}
      >
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "row" }}
          sx={{
            justifyContent: {
              xs: "center",
              sm: "space-between",
              md: "space-between",
            },
          }}
        >
          <Chip
            label={`${cardData?.Amenity.amenityName}`}
            color={
              cardData?.bookingStatus === "accepted"
                ? "success"
                : cardData?.bookingStatus === "rejected"
                ? "error"
                : "warning"
            }
          />
          <Chip
            label={`${cardData?.bookingStatus.toUpperCase()}`}
            color={
              cardData?.bookingStatus === "accepted"
                ? "success"
                : cardData?.bookingStatus === "rejected"
                ? "error"
                : "warning"
            }
          />
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon sx={{}}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", fontSize: "15px" }}>
                    {<EventIcon />}
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Booking Detail
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
            flexWrap: { xs: "wrap", sm: "wrap", md: "wrap", lg: "wrap" },
            marginY: "-20px",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booked On"
                secondary={formatteGenerateddate}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Booked for" secondary={formattedDate} />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary={`${cardData?.bookingStatus} on`}
                secondary={UpdateformattedDate}
              />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "5px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Booking Id" secondary={cardData?._id} />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ mb: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", fontSize: "15px" }} />
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
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
            marginY: "-20px",
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
              <ListItemText primary="Email" secondary={cardData.user.email} />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", fontSize: "15px" }}>
                    {<CreditCardIcon />}
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
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
            marginY: "-20px",
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
              <ListItemText
                primary="GST"
                secondary={`${cardData.Amenity.GST} %`}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Total Price" secondary={cardData.price} />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray" }}>{<PunchClockIcon />}</Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Booking Slots
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            overflow: "hidden",
            overflowX: "auto",
            maxWidth: "500px",
            maxHeight: {
              xs: "100px",
            },
            overflowY: {
              xs: "auto",
            },
            padding: "10px",
          }}
          className="custom-scrollbar"
        >
          {/* {[1, 2, 3, 4, 5, 6, 7].map((item, id) => {
            return (
              <Typography
                key={id}
                sx={{
                  textAlign: "center",
                  bgcolor: "lightcyan",
                  borderRadius: "5px",
                  marginX: "15px",
                  marginBottom: "20px",
                  minWidth: "25%",
                  padding:"10px"
                }}
              >
                (9AM - 10AM)
              </Typography>
            );
          })} */}

          {cardData.bookedSlots.map((slots, id) => {
            return (
              <Typography
                key={id}
                sx={{
                  textAlign: "center",
                  bgcolor: "rgba(128, 224, 224, 0.9)",
                  borderRadius: "5px",
                  marginX: "10px",
                  marginBottom: "20px",
                  minWidth: "30%",
                  padding: "5px",
                  fontSize: "15px",
                }}
              >
                {`${SlotStartTimeFormater(
                  slots.startTime
                )} - ${SlotEndTimeFormater(slots.endTime)}`}
              </Typography>
            );
          })}
        </Stack>
      </Grid>
    </>
  );
};
RejectConferenceHall.propTypes = { cardData: [] };

export default RejectConferenceHall;
