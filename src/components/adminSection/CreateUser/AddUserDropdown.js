import { Box, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

import AllotedShop from "./AllotedShop";

const AddUserDropdown = (settingShopArray, formDetail, setFormDetails) => {
  const dispatch = useDispatch();
  const [floorValues, setFloorValues] = useState([""]);
  const [selectfloor, setSelectFloor] = useState("select");
  const [shopDetails, setShopDetails] = useState([]);
  const [floor, setFloor] = useState("select");
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
    console.log("Comming ID->", id);
    console.log(shopArray);
  };
  const handleShopPopArray = (id) => {
    const tempArray = shopArray;
    tempArray.pop(id);
    setShopArray(tempArray);
    // console.log("Comming ID->", id);
    // console.log(shopArray);
  };

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

  const handleGetShop = async (id) => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/building/get/allshop/data/${id}`);
      console.log("Getshop", res?.data?.floorData);
      setShopDetails([...res?.data?.floorData?.shops]);
      const chekLen = shopArray.length - 1;
      if (chekLen >= 0) {
        setFormDetails({
          ...formDetail,
          shoptId: [...formDetail.shopId, shopArray],
        });
        settingShopArray(shopArray);
      }
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
  return (
    <>
      <Grid container rowGap={1} columnGap={1} display={"flex"} justifyContent={"space-between"}>
        <Grid item xs={12}>
          <Box component={"label"} mb={1}>
            Allocate Shop
          </Box>
        </Grid>
        <Grid xs={5.75} item>
          <TextField
            label="Select Floor"
            size="small"
            name="floor"
            required
            fullWidth
            value={floor}
            select
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
        <Grid item xs={5.75}>
          <AllotedShop
            id={floorValues?._id}
            getFloorData={getFloorData}
            shopDetails={shopDetails}
            settingShopArray={handleShopPushArray}
            pullingShopId={handleShopPopArray}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddUserDropdown;
