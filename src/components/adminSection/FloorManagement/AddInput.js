import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Iconify from "../../iconify/Iconify";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import DeleteModal from "../ShopManagement/DeleteModal";
import EditFloorModal from "./EditFloorModal";

const AddInput = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  const [activeData, setActiveData] = useState(null);

  const [floorData, setFloorData] = useState();

  const [inputFields, setInputFields] = useState([
    { floorNo: null, ratePerSqFt: null, gstRate: null },
  ]);

  const toggleEditModal = () => setOpenEditModal(!openEditModal);

  const handleCloseEditModal = () => {
    setActiveData(null);
    toggleEditModal();
  };

  const handleOpenEditModal = (data) => {
    setActiveData(data);
    toggleEditModal();
  };

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      { floorNo: null, ratePerSqFt: null, gstRate: null },
    ]);
  };

  const handleRemove = (index) => {
    const temp = [...inputFields];
    temp.splice(index, 1);
    setInputFields([...temp]);
  };

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value,
    };
    setInputFields([...values]);
  };

  // ********************** Handle Submit Api section  ***********************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    // console.log("floorsFields:", inputFields);
    try {
      const res = await axios.post(`/api/v1/building/create/building/floor`, {
        floors: [...inputFields],
      });
      // console.log("createFloor", res?.data?.message);
      if (res.data.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar("Floor Added Successfully", "success"));
        getFloorData();
        const d = [{ floorNo: "", ratePerSqFt: "", gstRate: null }];
        setInputFields([...d]);
      }
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };

  // ===============================GetAll floors =======================================
  const getFloorData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/all/floors`);
      // console.log("GetAllFloor", res);
      setFloorData(res?.data?.allFloors);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  // ============================================
  useEffect(() => {
    getFloorData();
  }, []);
  // ==============================================
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          rowGap={2}
          columnGap={1}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {inputFields?.map((inputField, index) => (
            <Grid
              xs={12}
              p={1}
              container
              key={index}
              columnGap={1}
              display={"flex"}
              justifyContent={"space-between"}
              border={"1px solid"}
              sm={5.75}
              position={"relative"}
            >
              <Grid xs={12} sm={5.75}>
                <TextField
                  name="floorNo"
                  size="small"
                  required
                  fullWidth
                  type="number"
                  label="Enter Floor No"
                  placeholder="Enter Floor No"
                  value={inputField?.floorNo}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Grid xs={12} sm={5.75}>
                <TextField
                  style={{ marginTop: "0.5rem" }}
                  className="textfield"
                  name="ratePerSqFt"
                  size="small"
                  fullWidth
                  required
                  type="number"
                  label="Enter Floor ratePerSqFt"
                  placeholder="Enter Floor ratePerSqft"
                  value={inputField?.ratePerSqFt}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Grid xs={12} sm={5.75}>
                <TextField
                  className="textfield"
                  name="gstRate"
                  size="small"
                  fullWidth
                  required
                  type="number"
                  label="Enter GstRate%"
                  placeholder="Enter gstRate %"
                  value={inputField?.gstRate}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </Grid>
              <Box sx={{ position: "absolute", top: -14, right: -8 }}>
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
              </Box>
            </Grid>
          ))}
        </Grid>
        <Stack mt={2} direction={"row"}>
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleAddField}
            startIcon={<Iconify icon="fluent:add-12-filled" />}
          >
            add more
          </Button>
        </Stack>
        <Stack mt={2} direction={"row"}>
          <Button
            type="submit"
            size="small"
            variant="contained"
            // onClick={handleSubmit}
            // style={{ margin: "10px", border: "1px solid blue" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
      <Box>
        <Stack mt={2}>
          <Typography variant="h4">All Floors</Typography>
        </Stack>
        <Grid container columnGap={1} rowGap={1}>
          {floorData?.map((data, index) => {
            return (
              <Grid
                item
                xs={2}
                key={index}
                flexDirection={"row"}
                sx={{
                  position: "relative",
                  "&:hover .MuiBox-root": {
                    transition: "all 300ms ease",
                    opacity: "1",
                  },
                  "&:hover .MuiButton-root": {
                    transition: "all 300ms ease",
                    opacity: "1",
                  },
                }}
              >
                {/* <TextField
                  disabled
                  label="Floor No "
                  size="small"
                  value={data?.floor}
                  style={{
                    margin: "10px",
                    maxWidth: "70px",
                    cursor: "pointer",
                  }}
                /> */}
                <Box
                  width={"100%"}
                  color={"white"}
                  bgcolor={"#510400"}
                  textAlign={"center"}
                  sx={{
                    backgroundImage: "url(/assets/images/covers/cover_25.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Stack p={2}>
                    {/* <DeleteModal id={data?._id} getFloorData={getFloorData} /> */}
                    <Typography variant="h5" fontFamily={"monospace"}>
                      {data?.floor === 0 ? "G-Floor" : `Floor ${data?.floor}`}
                    </Typography>
                  </Stack>
                </Box>
                {/* <DeleteModal id={data?._id} getFloorData={getFloorData} /> */}
                <Box
                  sx={{
                    top: 0,
                    opacity: "0",
                    display: "flex",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.8)",
                    zIndex: "1000",
                    justifyContent: "center",
                    alignItems: "start",
                  }}
                >
                  <Stack direction={"row"}>
                    <IconButton
                      sx={{ color: "white" }}
                      onClick={() => handleOpenEditModal(data)}
                    >
                      <Iconify icon="mingcute:edit-line" />
                    </IconButton>

                    <DeleteModal id={data?._id} getFloorData={getFloorData} />
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <EditFloorModal
        open={openEditModal}
        data={activeData}
        handleClose={handleCloseEditModal}
        // handleAction={handleUpdateFloorData}
        getAllFloorData={getFloorData}
      />
    </>
  );
};

export default AddInput;
