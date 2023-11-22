import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import DeleteShopModal from "./DeleteShopModal";

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
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value,
    };
    setInputFields([...values]);
  };
  // Handle dropdown selection

  // ********************** Handle Submit  Floor Api section  ***********************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    // console.log("rowww====>", inputFields, selectfloor);
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
    <Box component={"form"} onSubmit={handleSubmit}>
      <Stack style={{ margin: "10px" }}>
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
          {floorValues?.map((data) => {
            return <MenuItem value={`${data?._id}`}>{data?.floor}</MenuItem>;
          })}
        </TextField>
      </Stack>
      {inputFields?.map((inputField, index) => (
        <Box key={index} style={{ margin: "10px" }}>
          <TextField
            className="textfield"
            name="shopNo"
            required
            label="Enter Shop No"
            type="number"
            value={inputField?.shopNo}
            onChange={(event) => handleInputChange(event, index)}
          />
          <TextField
            className="textfield"
            name="shopArea"
            required
            label="Enter Shop Area"
            type="number"
            value={inputField?.shopArea}
            onChange={(event) => handleInputChange(event, index)}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
          />

          <TextField
            label="ShopType"
            className="textfield"
            size="medium"
            name="shopType"
            required
            value={inputField?.shopType}
            select
            sx={{ maxWidth: "150px" }}
            onChange={(event) => handleInputChange(event, index)}
            style={{ minWidth: "8rem" }}
          >
            <MenuItem value={inputField?.shopType}>--select--</MenuItem>
            <MenuItem value={"shop"}>Shop</MenuItem>
            <MenuItem value={"office"}>Office</MenuItem>
          </TextField>
        </Box>
      ))}
      <Box>
        <Button
          type="button"
          onClick={handleAddField}
          style={{ margin: "10px", minWidth: "150px" }}
        >
          Add Shop
        </Button>
        <Button
          type="submit"
          // onClick={handleSubmit}
          style={{
            margin: "10px",
            marginLeft: "10rem",
            border: "1px solid #f99594 ",
            minWidth: "150px",
          }}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Grid container>
          <Grid
            item
            flexDirection={"row"}
            style={{ width: "100%", margin: "10px", color: "#9f2936" }}
          >
            <Typography variant="h4">Total Number Of Shops</Typography>
          </Grid>

          <Grid item flexDirection={"row"} display={"flex"}>
            <TextField
              label="Select Floor"
              size="small"
              name="floor"
              required
              value={floor}
              select
              sx={{ width: "150px", marginRight: "1rem", marginTop: "0.5rem" }}
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
    </Box>
  );
};

export default AddInputRow;
