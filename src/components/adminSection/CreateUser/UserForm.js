import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
// import Iconify from "../../iconify";
// import AddUserDropdown from "./AddUserDropdown";
// import ShopDropDown from "./ShopDropDown";
// import Tags from "./Tags";
import Addshops from "./Addshops";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formDetail, setFormDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    contactNo: "",
    shopId: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [FileUrl, setFileUrl] = useState(null);
  const [shopArray, setShopArray] = useState([]);
  const [shopDetails, setShopDetails] = useState([]);

  const handleShopPushArray = (id) => {
    const tempArray = shopArray;
    if (tempArray.includes(id)) {
      const i = tempArray.indexOf(id);
      tempArray.splice(tempArray.indexOf(id), 1);
    } else {
      tempArray.push(id);
    }
    setShopArray(tempArray);
    console.log("parent element Comming ID->", id);
    console.log(shopArray);
  };

  // *****************************Handle Change Add picture************************************

  const handleUpload = (e) => {
    // console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    // formdata.append("file", e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
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
    console.log("userDetalis", formDetail);
    dispatch(isLoading(true));
    const formdata = new FormData();
    formdata.append("firstName", formDetail.firstName);
    formdata.append("lastName", formDetail.lastName);
    formdata.append("email", formDetail.email);
    formdata.append("gender", formDetail.gender);
    formdata.append("contactNo", formDetail.contactNo);
    formdata.append("shops", formDetail.shopId);
    formdata.append("profilePicture", file);
    // for (const entry of formdata.entries()) {
    //   console.log(entry[0], entry[1],entry[2],entry[3],entry[4],entry[5],entry[6],);
    // }
    try {
      const res = await axios.post(`/api/v1/admin/create/user`, formdata);
      // console.log(res);
      if (res.data.success === true) {
        dispatch(isLoading(false));
        setFormDetail({
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
          contactNo: "",
          shopId: [],
        });
        dispatch(openSnackbar("User Added Successfully", "success"));
        navigate("/dashboard/user", { replace: true });
      }
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
      console.log("galat hai credentials");
    }
  };
  const shopOptions = shopDetails?.map((option) => ({
    id: option._id,
    label: `Shop No.${option?.shopNo}`,
  }));
  const handleAutocompleteChange = (event, newValues) => {
    const newid = newValues.map((value) => value.id);
    console.log(newid)
    setFormDetail({ ...formDetail, shopId: newid });
  };
  console.log(formDetail.shopId);
  

  const handleDelete = (id) => {
    console.log("delete id ", id);
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
          Add User
        </Typography>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ cursor: "pointer", "&>hover": { color: "red" } }}
          mb={1}
          onClick={() => navigate(-1)}
        >
          <KeyboardBackspaceIcon sx={{ color: " #9F2936" }} />{" "}
          <Typography
            variant="body2"
            component={"span"}
            sx={{ color: " #9F2936" }}
          >
            Back
          </Typography>
        </Stack>
      </Stack>
      <Stack component={Paper} p={2}>
        <Box
          component={"label"}
          mb={1}
          sx={{ color: "white", bgcolor: "#9F2936", pl: 2, borderRadius: 1 }}
        >
          User Information
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowGap={2}
            columnGap={1}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {FileUrl ? (
                <>
                  <Stack position={"relative"}>
                    <Box
                      sx={{
                        width: "125px",
                        height: "125px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#9F2936",
                      }}
                    >
                      <img
                        src={FileUrl}
                        alt="logo"
                        accept="image/*"
                        style={{
                          height: "120px",
                          width: "120px",
                          borderRadius: "9px",
                          
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          right: 8,
                          bottom: -1,
                        }}
                        onClick={() => setFileUrl(null)}
                      >
                        {
                          <DeleteIcon
                            sx={{
                              color: "#9F2936",
                              borderRadius: "7px",
                              border: "1px solid black",
                            }}
                          />
                        }
                      </Box>
                    </Box>
                  </Stack>
                </>
              ) : (
                <Stack position={"relative"}>
                  <Box
                    sx={{
                      width: "125px",
                      height: "125px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "#9F2936",
                      // p:2
                    }}
                  >
                    <Box
                      variant="h5"
                      gutterBottom
                      sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "white",
                      }}
                    >
                      <Typography sx={{ color: "#9F2936" }}>
                        Upload Image
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      right: 8,
                      bottom: -1,
                    }}
                  >
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        sx={{ display: "none" }}
                        id="fileInput"
                        onChange={handleUpload}
                      />
                    </FormControl>
                    <InputLabel htmlFor="fileInput">
                      <PhotoCameraIcon
                        sx={{
                          color: "#9F2936",
                          borderRadius: "7px",
                          // bgcolor: "yellow",
                          border: "1px solid black",
                        }}
                      />
                    </InputLabel>
                  </Box>
                </Stack>
              )}
            </Grid>
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
            <Grid item xs={12} sm={5.75}>
              {" "}
              <FormControl fullWidth>
                <InputLabel id="gender-label">Select Gender *</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-select"
                  size="small"
                  name="gender"
                  value={formDetail?.gender}
                  onChange={handleChange}
                  label="Select Gender"
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="transgender">Others</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                name="gender"
                label="Gender"
                size="small"
                value={formDetail?.gender}
                fullWidth
                required
                onChange={handleChange}
              /> */}
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

            <Grid item xs={12} sm={5.75}>
              <Addshops
                formDetail={formDetail}
                setFormDetail={setFormDetail}
                setShopDetails={setShopDetails}
                shopDetails={shopDetails}
              />
              {/* <Tags
                settingShopArray={shopArray}
                formDetail={formDetail}
                setFormDetails={setFormDetail}
              /> */}
              {/* <ShopDropDown
                settingShopArray={shopArray}
                formDetail={formDetail}
                setFormDetails={setFormDetail}
              /> */}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Stack spacing={1}>
                <Autocomplete
                  multiple
                  required
                  id="tags-filled"
                  options={shopOptions}
                  onChange={handleAutocompleteChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.label}
                        onClick={() => handleDelete(option)}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Shops"
                      size="small"
                      placeholder="Shops"
                    />
                  )}
                />
              </Stack>
            </Grid>
          </Grid>

          <Stack direction={"row"}>
            <Button
              type="submit"
              sx={{
                paddingX: "1.5rem",
                border: "1px solid #9F2936",
                marginTop: "1rem",
                backgroundColor: " #9F2936",
                boxShadow: "none",
                color: "white",
                "&:hover": {
                  backgroundColor: " #9F2936",
                  color: "white",
                  boxShadow: "none",
                },
              }}
            >
              Create User
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default UserForm;
