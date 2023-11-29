import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useEffect, useState } from "react";
// import React from 'react'
// import {  } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

import Iconify from "../../iconify/Iconify";
import ConfirmationModal from "../../modal/ConfirmationModal";
import EditAmmenityModal from "./EditAmmenityModal";

const AddAmmenityInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirmationModal, setopenConfirmationModal] = useState(false);
  const [inputFields, setInputFields] = useState([
    { amenityName: "", basePrice: null, GST: null },
  ]);
  const [ammenityData, setAmmenityData] = useState();
  const [updateData, setupdateData] = useState({
    newBasePrice: null,
    newGST: null,
  });

  const [activeId, setactiveId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [activeData, setActiveData] = useState(null);
  const toggleEditModal = () => setOpenEditModal(!openEditModal);
  // console.log(updateData)
  const handleCloseEditModal = () => {
    setActiveData(null);
    toggleEditModal();
  };

  const handleOpenEditModal = (data) => {
    // console.log(data)

    setActiveData(data);
    toggleEditModal();
  };
  const handleUpdateAmmenityData = async () => {
    dispatch(isLoading(true));
    // console.log(activeData)
    try {
      const response = await axios.put(
        `/api/v1/admin/update/ammenity/data/${activeData._id}`,
        {
          newBasePrice: updateData.newBasePrice,
          newGST: updateData.newGST,
        }
      );
      // console.log(response);
      if (response?.data.success === true) {
        getAmmenityData();
      }
      handleCloseEditModal();
      dispatch(openSnackbar("updated", "success"));
      dispatch(isLoading(false));
    } catch (error) {
      console.log("==>", error);
      dispatch(isLoading(false));
    }
  };
  const handleCloseConfirmationModal = () => {
    setactiveId(null);
    setopenConfirmationModal(false);
  };

  const handleClose = () => handleCloseConfirmationModal();
  const handleOpenConfirmationModal = (id) => {
    setactiveId(id);
    // setConfirmationMsg(actionType ? "block" : "unblock");
    setopenConfirmationModal(true);
  };

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      { amenityName: "", basePrice: null, GST: null },
    ]);
  };

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value,
    };
    setInputFields([...values]);
  };

  // const handlecheck = (event, index) => {
  //   const values = [...inputFields];
  //   values[index] = {
  //     ...values[index],
  //     hasSlots: event.target.checked,
  //   };
  //   setInputFields([...values]);
  // };
  const handleDelete = async () => {
    setopenConfirmationModal(false);
    dispatch(isLoading(true));
    try {
      const response = await axios.delete(
        `/api/v1/admin/delete/amenity/${activeId}`
      );
      dispatch(openSnackbar("amenity deleted successfully", "success"));
      dispatch(isLoading(false));
      getAmmenityData();
    } catch (error) {
      console.log(error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    console.log("ammenityFields:", inputFields);
    try {
      const res = await axios.post(`/api/v1/building/create/Amenities`, {
        allAmenities: [...inputFields],
      });
      // console.log("createFloor", res?.data?.message);
      if (res.data.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar("Ammenity Added Successfully", "success"));
        getAmmenityData();
        const d = [{ amenityName: "", basePrice: "", GST: "" }];
        setInputFields([...d]);
      }
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  const getAmmenityData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/amenities/data`);
      // console.log("getAmmenity", res);
      setAmmenityData(res?.data?.allAmenities);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  useEffect(() => {
    getAmmenityData();
  }, []);
  const inputFieldDelete = (id) => {
    const updatedItems = [...inputFields];
    const indexToDelete = updatedItems.findIndex((item) => item.id === id);
    updatedItems.splice(indexToDelete, 1);
    setInputFields(updatedItems);
  };
  return (
    <>
      {/* <Grid item style={{ marginTop: "0.8rem", color: "#9f2936" }}></Grid> */}
      <Stack
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" component="h2" sx={{ color: "#9f2936" }}>
          Create Amenities
        </Typography>
        <Button
          variant="contained"
          type="button"
          onClick={handleAddField}
          // style={{ margin: "10px" }}
          startIcon={<Iconify icon="fluent:add-12-filled" />}
        >
          Add Amenity
        </Button>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Grid container rowGap={1} columnGap={1}>
          {inputFields?.map((inputField, index) => (
            <Grid
              key={`${inputField}-${index}`}
              // key={index}
              item
              container
              rowGap={1}
              columnGap={1}
              // xs={12}
              sx={{ position: "relative" }}
              // md={5.75}
              justifyContent={"space-between"}
              p={1}
              // border={"1px solid black"}
              alignItems={"center"}
              mt={1.5}
              direction={"row"}
            >
              <Grid item xs={12} sm={3.75} key={index}>
                <TextField
                  name="amenityName"
                  required
                  fullWidth
                  size="small"
                  type="string"
                  label="Amenity Name"
                  value={inputField?.amenityName}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3.75} key={index}>
                <TextField
                  // sx={{ marginLeft: "1rem" }}

                  name="basePrice"
                  size="small"
                  fullWidth
                  required
                  type="number"
                  label="Base Price"
                  value={inputField?.basePrice}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={3.75} key={index}>
                <TextField
                  // sx={{ marginLeft: "1rem" }}
                  id="outlined-adornment-amount"
                  name="GST"
                  size="small"
                  fullWidth
                  required
                  type="number"
                  label="GST"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  value={inputField?.GST}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Box
                sx={{ position: "absolute", top: -18, right: -17 }}
                key={index}
              >
                {inputFields?.length !== 1 && (
                  <IconButton
                    // sx={{ color: "#9f2936", fontSize: "18px" }}
                    sx={{
                      color: "#9f2936",
                      bgcolor: "rgba(233,206,198,1)",
                      height: "30px",
                      width: "30px",
                    }}
                    onClick={() => inputFieldDelete(index)}
                  >
                    <Iconify icon={"radix-icons:cross-2"} />
                  </IconButton>
                )}
              </Box>

              {/* <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputField?.hasSlots}
                      onChange={(e) => handlecheck(e, index)}
                    />
                  }
                  label="slots"
                />
              </Grid> */}
              {/* <Button onClick={() => deleteInput(id)}>Delete</Button> */}
            </Grid>
          ))}
        </Grid>
        {/* <Button
          variant="contained"
          type="button"
          onClick={handleAddField}
          style={{ margin: "10px" }}
          startIcon={<Iconify icon="fluent:add-12-filled" />}
        >
          Add Amenity
        </Button> */}
        <Button
          variant="contained"
          type="submit"
          size="small"
          style={{ margin: "10px" }}
        >
          Submit
        </Button>
      </form>
      <Box>
        <Stack mt={4}>
          <Typography variant="h4" sx={{ color: "#9f2936" }}>
            Amenities
          </Typography>
          <Grid container rowGap={2} columnGap={2}>
            {ammenityData?.map((data, index) => {
              return (
                <>
                  <Grid
                    item
                    key={index}
                    xs={12}
                    component={Paper}
                    bgcolor={data?.hasSlots ? "rgba(255,193,203,1)" : ""}
                    border={"1px solid #9f2936"}
                    sm={5}
                    md={3}
                    sx={{
                      position: "relative",
                      cursor: data?.hasSlots ? "pointer" : "",
                      "&:hover": {
                        scale: data?.hasSlots ? 1.075 : "",
                      },
                    }}
                    // onClick={
                    //   data?.hasSlots
                    //     ? () => {
                    //         navigate(
                    //           `/dashboard/createAmmenitySlots/${data?._id}`
                    //         );
                    //       }
                    //     : () => {}
                    // }
                  >
                    <Grid item xs={12} spacing={1} p={0.5}>
                      <Typography
                        // fontFamily={"monospace"}
                        sx={{
                          borderBottom: "1px solid #9f2936",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {data?.amenityName}
                      </Typography>
                      <Typography>Base Price : {data?.basePrice}</Typography>
                      <Typography>GST : {data?.GST} %</Typography>
                      <Box sx={{ position: "absolute", top: 3, right: 3 }}>
                        <Iconify
                          icon="mingcute:edit-line"
                          sx={{
                            color: "#9f2936",
                            fontSize: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpenEditModal(data)}
                        />
                        {
                          <DeleteIcon
                            sx={{
                              color: "#9f2936",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleOpenConfirmationModal(data?._id)
                            }
                          />
                        }
                      </Box>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Stack>
      </Box>

      <ConfirmationModal
        open={openConfirmationModal}
        handleClose={handleClose}
        handleAction={handleDelete}
        warningMsg={"delete this"}
        modalFor="amenitiy"
      />
      <EditAmmenityModal
        open={openEditModal}
        data={activeData}
        setupdateData={setupdateData}
        updateData={updateData}
        handleClose={handleCloseEditModal}
        handleAction={handleUpdateAmmenityData}
      />
    </>
  );
};

export default AddAmmenityInput;
