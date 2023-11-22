import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/joy/Autocomplete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import Iconify from "../../iconify";
import AddUserDropdown from "./AddUserDropdown";

const formdata = new FormData();
const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formDetail, setFormDetail] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    contactNo: "",
    shopId: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [shopArray, setShopArray] = useState([]);

  const handleShopPushArray = (id) => {
    const tempArray = shopArray;
    if (tempArray.includes(id)) {
      const i = tempArray.indexOf(id);
      tempArray.splice(tempArray.indexOf(id), 1);
    } else {
      tempArray.push(id);
    }
    setShopArray(tempArray);
    // console.log("parent element Comming ID->", id);
    // console.log(shopArray);
  };

  // *****************************Handle Change Add picture************************************

  const handleUpload = (e) => {
    // console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    formdata.append("file", e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  // *****************************Handle ChangeThe CHange the in textBOx************************************
  const handleChange = (e) => {
    setFormDetail({
      ...formDetail,
      [e.target.name]: e.target.value,
    });
  };
  // *****************************Handle Submit Form************************************
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    try {
      const res = await axios.post(`/api/v1/admin/sign/in`, formDetail);

      if (res.data.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar("logged in Successfully", "success"));
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
      console.log("galat hai credentials");
    }
  };
  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          color="#9f2936"
          variant="h4"
          fontFamily={"monospace"}
          component="h2"
        >
          Add Users
        </Typography>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ cursor: "pointer", "&>hover": { color: "red" } }}
          mb={1}
          onClick={() => navigate(-1)}
        >
          <KeyboardBackspaceIcon />{" "}
          <Typography variant="body2" component={"span"}>
            Back
          </Typography>
        </Stack>
      </Stack>
      <Stack component={Paper} p={2}>
        <Box component={"label"} mb={1}>
          User Info
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowGap={2}
            columnGap={1}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} sm={5.75}>
              {" "}
              <TextField
                size="small"
                name="firstName"
                label="First Name"
                value={formDetail?.firstName}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5.75}>
              <TextField
                name="lastName"
                value={formDetail?.lastName}
                size="small"
                label="Last Name"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {" "}
              <TextField
                name="gender"
                label="Gender"
                size="small"
                value={formDetail?.gender}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5.75}>
              <TextField
                name="contactNo"
                label="Mobile No"
                size="small"
                type="number"
                value={formDetail?.contactNo}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5.75}>
              {" "}
              <TextField
                name="email"
                label="Email"
                size="small"
                type="email"
                fullWidth
                value={formDetail?.email}
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {" "}
              <TextField
                name="address"
                label="Address"
                size="small"
                multiline
                rows={3}
                fullWidth
                value={formDetail?.address}
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                name="address"
                label="Address"
                size="small"
                multiline
                rows={3}
                fullWidth
                value={formDetail?.address}
                required
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={5.75}>
              <TextField
                label="Select Floor"
                size="small"
                name="floor"
                required
                value={floor}
                select
                sx={{
                  width: "150px",
                  marginRight: "1rem",
                  marginTop: "0.5rem",
                }}
                onChange={(e) => setFloor(e.target.value)}
              >
                <MenuItem value={"select"}>--select--</MenuItem>
                {floorValues?.map((data) => {
                  return (
                    <MenuItem
                      value={`${data?._id}`}
                      onClick={() => {
                        handleGetShop(data?._id);
                      }}
                    >
                      {data?.floor}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid> */}
            <Grid item xs={12} sm={5.75}>
              {file ? (
                <>
                  <Stack>
                    <img
                      src={file}
                      alt="logo"
                      accept="image/*"
                      style={{
                        height: "100px",
                        width: "100px",
                        marginTop: "10px",
                        borderRadius: "9px",
                      }}
                    />
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => setFile(null)}
                      sx={{
                        bgcolor: "transparent",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.2)" },
                        maxHeight: "35px",
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </>
              ) : (
                <TextField
                  type="file"
                  variant="outlined"
                  size="small"
                  accept="image/png, image/jpeg"
                  fullWidth
                  name="file"
                  onChange={handleUpload}
                />
              )}
            </Grid>
          </Grid>

          <Stack direction={"row"}>
            <Button
              type="submit"
              sx={{
                paddingX: "1.5rem",
                border: "1px solid #9F2936",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: " #9F2936",
                  boxShadow: "none",
                  color: "white",
                },
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default UserForm;
