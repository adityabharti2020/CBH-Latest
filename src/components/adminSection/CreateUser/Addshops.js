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
// import SelectShopModal from './SelectShopModal'

const Addshops = ({shopDetails,setShopDetails}) => {
  const dispatch = useDispatch();
  const [floorValues, setFloorValues] = useState([""]);
  const [selectfloor, setSelectFloor] = useState("select");
  const [floor, setFloor] = useState("");
  const [openShopModal, setOpenShopModal] = useState(false);


  const toggleShopModal = () => setOpenShopModal(!openShopModal);
  const CloseShopModal = () => {
    toggleShopModal();
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
    console.log("allFloors", id);
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/allshop/data/${id}`);
      console.log("Getshop", res);
      setShopDetails([...res?.data?.shopData?.shops]);
      if(res?.data?.success === true){
        toggleShopModal();
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
    <Box>
      <Box>
        <Grid container>
          <Grid item flexDirection={"row"} display={"flex"} xs={12} sm={12}>
            <TextField
              label="Select Floor"
              fullWidth
              size="small"
              name="floor"
              required
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
                    {`Floor ${data?.floor}`}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "1rem" }}>
            {/* <SelectShopModal
            open={openShopModal}
            data={shopDetails}
            setFormDetails={setFormDetails}
            formDetail={formDetail}
            handleClose={CloseShopModal}
            shops={shops}
            setShops={setShops}
            openShopModal={openShopModal}
            /> */}
          {/* <DeleteShopModal
                id={floorValues?._id}
                getFloorData={getFloorData}
                shopDetails={shopDetails}
                handleGetShop={handleGetShop}
              /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Addshops;
