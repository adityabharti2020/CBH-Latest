import React from "react";
import dayjs from "dayjs";
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


const AcceptAdverTisingBoard = ({ cardData, index }) => {
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
                varient="body1"
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
                ? "secondary"
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
          <Stack>
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary='Booking Id'
                  secondary={cardData?._id}
                />
              </ListItem>
            </List>
            </Stack>
          <Stack>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "gray", width: 35, height: 35}} />
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
                <ListItemText primary="Email" secondary={cardData.user.email} />
              </ListItem>
            </List>
          </Stack>
          <Stack>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "gray", width: 35, height: 35}}>
                      {<CreditCardIcon />}
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <Typography
                  varient="body1"
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
              // marginY: "-20px",
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
AcceptAdverTisingBoard.propTypes = { cardData: [] };

export default AcceptAdverTisingBoard;
