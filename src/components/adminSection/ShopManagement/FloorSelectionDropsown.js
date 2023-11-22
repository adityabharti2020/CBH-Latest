import { Box, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const FloorSelectionDropsown = () => {
  const dispatch = useDispatch();
  const [floorValues, setFloorValues] = useState([""]);
  const [selectfloor, setSelectFloor] = useState("select");

  const getFloorData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/all/floors`);
      console.log("createFloor", res?.data?.allFloors);
      setFloorValues(res?.data?.allFloors);
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
     
        <form>
          <TextField
            label="Select Floor"
            size="small"
            name="floor"
            value={selectfloor}
            select
            sx={{ minWidth: "150px" }}
            onChange={(e) => setSelectFloor(e.target.value)}
          >
            <MenuItem value={"select"}>--select--</MenuItem>
            {floorValues?.map((data) => {
              return (
                <MenuItem value={`${data?.floor}`}>{data?.floor}</MenuItem>
              );
            })}
          </TextField>
        </form>
      
    </>
  );
};

export default FloorSelectionDropsown;
