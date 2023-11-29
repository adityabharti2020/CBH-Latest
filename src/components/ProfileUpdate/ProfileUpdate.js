import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MuiTelInput } from "mui-tel-input";

import {
  Avatar,
  Badge,
  Box,
  CardHeader,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useScrollTrigger,
} from "@mui/material";

import Iconify from "../iconify";
import ChangePassword from "../ChangePassword/ChangePassword";

const ProfileUpdate = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [profileImageUrl, setprofileImageUrl] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [file, setfile] = useState(null);

  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const handleOnCLick = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdateProfilePicture = () => {};
  const handleSubmit = () => {};
  const handleChangeadminValues = () => {};
  const handleChangePhone = () => {};
  // handl profile picture onChange event
  const handleFileChange = (e) => {
    setfile(e.target.files[0]);
    setprofileImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // close profile change handler event state
  const handleCloseFileChange = () => {
    setprofileImageUrl("");
    setfile(null);
  };

  useEffect(() => {
    if (1) {
      setProfilePicture(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GOezyXsZ845elKtmlvGea2zfhdTIHlCgrw&usqp=CAU"
      );
    }
  }, []);

  return (
    <Container>
      {/* <Typography variant="h4">Hi, {nfcTngVendor?.email}</Typography> */}
      <Card>
        <CardContent>
          <Stack
            direction={{ sm: "row", xs: "column" }}
            spacing={4}
            alignItems={"start"}
            justifyContent={"start"}
          >
            <Stack p={1}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box
                    width={"30px"}
                    height={"30px"}
                    bgcolor={"lightgrey"}
                    sx={{
                      transition: "ease-in-out 300ms",
                      color: "primary.dark",
                      "&:hover": {
                        bgcolor: "error.dark",
                        color: "white",
                      },
                    }}
                    borderRadius={"100%"}
                    color={"info.dark"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                    fontSize={"8px"}
                    htmlFor="icon-button-photo"
                    component={"label"}
                  >
                    <Iconify icon="mingcute:edit-3-fill" />
                  </Box>
                }
              >
                <input
                  accept="image/*"
                  id="icon-button-photo"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  type="file"
                />
                <Avatar
                  src={
                    profileImageUrl && profileImageUrl
                      ? profileImageUrl
                      : profilePicture
                  }
                  alt="Nazil Ali"
                  sx={{ width: "100px", minHeight: "100px" }}
                />
              </Badge>

              {profileImageUrl && file ? (
                <Stack spacing={1}>
                  <Button
                    size="small"
                    onClick={handleUpdateProfilePicture}
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Upload
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={handleCloseFileChange}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
            <Stack justifyContent={"start"}>
              <Typography variant="h3" fontFamily={"monospace"}>
                Admin
                {/* {nfcTngAdmin?.name}
                 */}
              </Typography>
              <Stack direction={"row"} spacing={1}>
                <span>
                  <Iconify icon="carbon:email-new" />
                </span>
                <Typography
                  variant="body2"
                  component={"div"}
                  fontFamily={"monospace"}
                >
                  demo@minimals.com
                  {/* {adminValues?.email} */}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <span>
                  <Iconify icon="solar:phone-outline" />
                </span>
                <Typography
                  variant="body2"
                  component={"div"}
                  fontFamily={"monospace"}
                >
                  +91 9874563215
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems={"end"}>
            <Button variant="contained" onClick={handleOnCLick}>
              Change Password
            </Button>
            <ChangePassword isOpen={isOpen} handleClose={handleClose} />
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{ mt: 2, position: "relative" }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <CardHeader
          title={"Admin Profile Data"}
          subheader={"admin information"}
        />
        <Box sx={{ position: "absolute", right: 20, top: 20 }}>
          <IconButton
            color={edit ? "error" : "info"}
            onClick={() => setEdit(!edit)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {edit ? (
              <Iconify icon="fluent:arrow-exit-20-filled" />
            ) : (
              <Iconify icon="akar-icons:edit" />
            )}
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
            <Button
              variant="outlined"
              color={edit ? "error" : "primary"}
              size="small"
              onClick={() => setEdit(!edit)}
              endIcon={
                edit ? (
                  <Iconify icon="iconamoon:close" />
                ) : (
                  <Iconify icon="uil:info" />
                )
              }
            >
              {edit ? "Close" : "Edit Info"}
            </Button>
          </Box>
        </Box>
        <CardContent>
          <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            rowGap={2.5}
            columnGap={3}
            mb={2}
          >
            <Grid item xs={12} md={5.5}>
              <TextField
                name="name"
                disabled={!edit}
                fullWidth
                label="Name"
                size="small"
                // value={adminValues?.name ? adminValues?.name : ""}
                onChange={handleChangeadminValues}
                placeholder="Enter your name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="iconamoon:profile-light" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5.5}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                size="small"
                disabled
                // value={adminValues?.email ? adminValues?.email : ""}
                onChange={handleChangeadminValues}
                placeholder="Enter Email of Vendor"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="clarity:email-line" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5.5}>
              <MuiTelInput
                fullWidth
                disabled={!edit}
                label="Mobile Number"
                defaultCountry="MY"
                size="small"
                // value={phone}
                placeholder="Enter Phone Number"
                onChange={handleChangePhone}
              />
            </Grid>
          </Grid>
          {edit ? (
            <Stack mt={2.5} direction={"row"} alignItems={"center"}>
              <Button variant="contained" size="small" type="submit">
                Update
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileUpdate;
