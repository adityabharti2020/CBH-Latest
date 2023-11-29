import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
// import Iconify from "src/components/iconify";
import React, { useState, useEffect } from "react";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import DeleteShopModal from "./DeleteShopModal";
import Iconify from "../../iconify/Iconify";

const AddInputRow = () => {
  const dispatch = useDispatch();
  const [floorValues, setFloorValues] = useState([""]);
  const [selectfloor, setSelectFloor] = useState("select");
  const [floor, setFloor] = useState("select");
  const [inputFields, setInputFields] = useState([
    { shopNo: "", shopArea: "", shopType: "" },
  ]);
  // const [shopArea, setShopArea] = useState([{ shop: "", office: "" }]);
  const [shopDetails, setShopDetails] = useState([]);

  const handleAddField = () => {
    setInputFields([...inputFields, {}]);
  };

  const handleInputChange = (event, index) => {
    // console.log("event==>", event?.target.value);
    const values = [...inputFields];
    const inputValues = event.target.value;
    if (inputValues !== "" && Number(inputValues) < 0) {
      setInputFields("");
      // alert("Please enter a non-negative value.");
      dispatch(openSnackbar("Please enter a non-negative value.", "error"));
    }
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value,
    };

    setInputFields([...values]);
  };

  // Handle remove

  const handleRemove = (index) => {
    const temp = [...inputFields];
    temp.splice(index, 1);
    setInputFields([...temp]);
  };

  // Handle dropdown selection

  // ********************** Handle Submit  Floor Api section  ***********************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    // console.log("rowww====>", inputFields, selectfloor);
    const hasNegativeValues = inputFields.some(
      (field) => field.shopArea < 0 || field.shopNo < 0
    );

    if (hasNegativeValues) {
      dispatch(isLoading(false));
      dispatch(openSnackbar("Shop values cannot be negative", "error"));
      return;
    }

    try {
      const res = await axios.post(
        `/api/v1/building/create/building/floor/shops/${selectfloor}`,
        { shops: [...inputFields] }
      );
      // console.log("create shop", res);
      if (res?.data?.success === true) {
        getFloorData();
        const d = [{ shopNo: "", shopArea: "" }];
        setInputFields([...d]);
        dispatch(openSnackbar("Shop Create Successfully", "success"));
        dispatch(isLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };

  // ********************** GetFloor data Api section  ***********************************
  const getFloorData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/all/floors`);
      // console.log("createFloor", res?.data?.allFloors);
      setFloorValues(res?.data?.allFloors);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  // ********************** GetFloor last dropdown section  ***********************************
  const handleGetShop = async (id) => {
    console.log("allFloors", id);
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/allshop/data/${id}`);
      console.log("Getshop", res);
      setShopDetails([...res?.data?.shopData?.shops]);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  useEffect(() => {
    getFloorData();
  }, []);
  // console.log("shopDetails", shopDetails);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Create Shop
        </Typography>
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={handleAddField}
          startIcon={<Iconify icon="fluent:add-12-filled" />}
          // startIcon={<Iconify icon="fluent:add-12-filled" />}
        >
          Add Shop
        </Button>
      </Stack>
      {/* <Box component={"form"} onSubmit={handleSubmit}> */}
      <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Stack>
          {/* <FloorSelectionDropsown /> */}

          <TextField
            label="Select Floor"
            size="small"
            name="floor"
            required
            value={selectfloor}
            select
            sx={{ maxWidth: "150px" }}
            onChange={(e) => setSelectFloor(e.target.value)}
          >
            <MenuItem value={"select"}>--select--</MenuItem>
            {floorValues?.map((data, i) => {
              return (
                <MenuItem key={i} value={`${data?._id}`}>
                  {data?.floor}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
        <Grid mt={1} container rowGap={2} columnGap={1}>
          {inputFields?.map((inputField, index) => (
            <Grid
              item
              xs={12}
              // md={5.75}
              position={"relative"}
              container
              key={index}
              rowGap={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              columnGap={2}
              p={1}
              // border={"1px solid black"}
            >
              <Grid item xs={12} sm={3.75}>
                <TextField
                  name="shopNo"
                  fullWidth
                  required
                  size="small"
                  label="Enter Shop No"
                  type="number"
                  value={inputField?.shopNo}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3.75}>
                <TextField
                  name="shopArea"
                  required
                  fullWidth
                  size="small"
                  label="Enter Shop Area"
                  type="number"
                  value={inputField?.shopArea}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3.75}>
                <TextField
                  label="ShopType"
                  name="shopType"
                  required
                  fullWidth
                  size="small"
                  value={inputField?.shopType}
                  select
                  onChange={(event) => handleInputChange(event, index)}
                >
                  <MenuItem value={inputField?.shopType}>--select--</MenuItem>
                  <MenuItem value={"shop"}>Shop</MenuItem>
                  <MenuItem value={"office"}>Office</MenuItem>
                </TextField>
              </Grid>
              <Box
                sx={{
                  position: "absolute",
                  top: -14,
                  right: -8,
                }}
              >
                {inputFields?.length !== 1 && (
                  <IconButton
                    onClick={() => handleRemove(index)}
                    sx={{
                      color: "#9f2936",
                      bgcolor: "rgba(233,206,198,1)",
                      height: "30px",
                      width: "30px",
                    }}
                  >
                    <Iconify icon="radix-icons:cross-2" />
                  </IconButton>
                )}
              </Box>
              {/* Shop Type */}
            </Grid>
          ))}
        </Grid>
        <Box>
          {/* <Button
          type="button"
          variant="contained"
          size="small"
          onClick={handleAddField}
          style={{ margin: "10px", minWidth: "100px" }}
          // startIcon={<Iconify icon="fluent:add-12-filled" />}
        >
          Add Shop
        </Button> */}

          <Button
            variant="contained"
            size="small"
            type="submit"
            // onClick={handleSubmit}
            style={{
              marginTop: "10px",
              // margin: "10px",
              // marginLeft: "10rem",
              size: "small",
              border: "1px solid #f99594 ",
              // minWidth: "100px",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" mt={2}>
          Total Number Of Shops
        </Typography>

        <Grid container>
          {/* <Grid
            item
            flexDirection={"row"}
            sx={{ width: "100%", margin: "10px", color: "#9f2936" }}
          > */}
          {/* <Typography variant="h4">Total Number Of Shops</Typography> */}
          {/* </Grid> */}

          <Grid
            item
            display={"flex"}
            flexDirection={"row"}
            sx={{ flexWrap: "wrap" }}
          >
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
              {floorValues?.map((data, i) => {
                return (
                  <MenuItem
                    key={i}
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
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "1rem" }}>
          <DeleteShopModal
            id={floorValues?._id}
            getFloorData={getFloorData}
            shopDetails={shopDetails}
            handleGetShop={handleGetShop}
          />
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default AddInputRow;
