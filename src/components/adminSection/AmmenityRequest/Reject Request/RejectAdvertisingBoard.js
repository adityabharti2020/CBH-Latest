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
import EventIcon from "@mui/icons-material/Event";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddHomeIcon from '@mui/icons-material/AddHome';


import dayjs from "dayjs";

const RejectAdvertisingBoard = ({ cardData }) => {
  // console.log(cardData)
  const Generateddate = dayjs(cardData.createdAt);
  const formatteGenerateddate = Generateddate.format("DD-MM-YYYY");

  const UpdatedDate = dayjs(cardData?.updatedAt);
  const UpdateformattedDate = UpdatedDate.format("DD-MM-YYYY");

  const Startdate = dayjs(cardData.dateForAdvertisingBoard.from);
  const StartformattedDate = Startdate.format("DD-MM-YYYY");

  const Enddate = dayjs(cardData.dateForAdvertisingBoard.to);
  const EndformattedDate = Enddate.format("DD-MM-YYYY");

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
        {" "}
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
            flexWrap: "wrap",
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
              <ListItemText
                primary="Duration of Booking"
                secondary={`${StartformattedDate} to ${EndformattedDate}`}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary={`${cardData?.bookingStatus} On`}
                secondary={UpdateformattedDate}
              />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "5px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary='Booking Id'
                secondary={cardData?._id}
              />
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
              <ListItemText primary="GST" secondary={`${cardData.Amenity.GST} %`} />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Total Price" secondary={cardData.price} />
            </ListItem>
          </List>
        </Stack>
      </Grid>
    </>
  );
};
RejectAdvertisingBoard.propTypes = { cardData: [] };

export default RejectAdvertisingBoard;
