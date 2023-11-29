import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Grid,
  Stack,
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const UserProfileModal = ({ open, data, handleClose }) => {
  const [userProfile, setUserProfile] = useState();
  // console.log(data);
  const userDetails = async () => {
    if (!data) return;
    try {
      const response = await axios.get(`/api/v1/admin/get/user/${data}`);
      setUserProfile(response?.data.userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userDetails();
  }, [data]);
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile);
    }
  }, [userProfile]);
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        xs={12}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          px: 4,
          borderRadius: "10px",
        }}
      >
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          >
            <Avatar
              alt={userProfile?.firstName}
              src={userProfile?.profilePicture}
              sx={{ width: 100, height: 100 }}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              {userProfile?.userName}
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary="First Name"
                  secondary={userProfile?.firstName}
                />
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary="Last Name"
                  secondary={userProfile?.lastName}
                />
              </ListItem>
            </List>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary="Contact No"
                  secondary={userProfile?.contactNo}
                />
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary="Gender"
                  secondary={userProfile?.gender}
                  sx={{mr: 3}}
                />
              </ListItem>
            </List>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Email" secondary={userProfile?.email} />
              </ListItem>
            </List>
          </Stack>
        </Grid>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            mt: 2,
            marginX: "auto",
            backgroundColor: " #9F2936",
            color: "white",
          }}
        >
          Close
        </Button>
      </Grid>
    </Modal>
  );
};

export default UserProfileModal;
