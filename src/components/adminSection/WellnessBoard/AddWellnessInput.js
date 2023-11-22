import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconify from "../../iconify/Iconify";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import EditWellnessBoardModal from "./EditWellnessBoardModal";
import ConfirmationModal from "./ConfirmationModal";

const AddWellnessInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [wellnessdata, setwellnessData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const [activeId, setactiveId] = useState(null);
  const [openConfirmationModal, setopenConfirmationModal] = useState(false);

  const toggleEditModal = () => setOpenEditModal(!openEditModal);

  const [wellnessField, setwellnessField] = useState({
    cardHeading: "",
    percent: "",
  });
  const [updateData, setupdateData] = useState({
    cardHeading: "",
    percent: "",
  });
  const [updateImage, setupdateImage] = useState(null);
  console.log(updateData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const newValue = type === 'file' ? files[0] : value;
    setwellnessField({
      ...wellnessField,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));

    const formdata = new FormData();
    formdata.append("cardHeading", wellnessField.cardHeading);
    formdata.append("percent", wellnessField.percent);
    formdata.append("boardPicture", image);

    // for (const value of formData.values()) {
    //     console.log(value);
    //   }

    try {
      const res = await axios.post(
        `/api/v1/admin/create/wellness/board/data`,
        formdata
      );

      
      console.log("create Wellness Board", res.data);
      if (res?.data.success === true) {
        setwellnessField({
          cardHeading: "",
          percent: "",
        });
        setImage("");
        dispatch(isLoading(false));
        dispatch(openSnackbar("Wellness Added Successfully", "success"));
       
        wellnessData();
        
      }
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };

  const wellnessData = async () => {
    try {
      const response = await axios.get("/api/v1/admin/get/wellness/board/data");
      setwellnessData(response?.data.wellnessBoardData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    wellnessData();
  }, []);
  useEffect(() => {
    if (wellnessdata) {
      console.log(wellnessdata);
    }
  }, []);
  const handleOpenEditModal = (data) => {
    // console.log(data)

    setActiveData(data);
    toggleEditModal();
  };
  const handleCloseEditModal = () => {
    setActiveData(null);
    toggleEditModal();
  };
  // console.log(activeData)
  const handleUpdateWellnessData = async (formdata) => {
    dispatch(isLoading(true));
    // console.log(activeData)
    try {
      const response = await axios.put(
        `/api/v1/admin/update/wellness/board/data/${activeData._id}`,
        formdata
      );
      console.log(response);
      if (response?.data.success === true) {
        wellnessData();
      }
      handleCloseEditModal();
      dispatch(openSnackbar("updated", "success"));
      dispatch(isLoading(false));
    } catch (error) {
      console.log("==>", error);
      dispatch(isLoading(false));
    }
  };
  const handleOpenConfirmationModal = (id) => {
    setactiveId(id);
    // setConfirmationMsg(actionType ? "block" : "unblock");
    setopenConfirmationModal(true);
  };
  const handleCloseConfirmationModal = () => {
    setactiveId(null);
    setopenConfirmationModal(false);
  };

  const handleClose = () => handleCloseConfirmationModal();
  const handleDelete = async () => {
    setopenConfirmationModal(false);
    dispatch(isLoading(true));
    try {
      const response = await axios.delete(
        `/api/v1/admin/delete/wellness/board/data/${activeId}`
      );
      dispatch(openSnackbar("Wellness data deleted successfully", "success"));
      dispatch(isLoading(false));
      wellnessData();
    } catch (error) {
      console.log(error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container rowGap={1} columnGap={1}>
          <Grid
            // key={`${inputField}-${index}`}
            item
            container
            rowGap={1}
            columnGap={1}
            xs={12}
            sx={{ position: "relative" }}
            md={5.75}
            justifyContent={"start"}
            p={1}
            border={"1px solid black"}
            alignItems={"center"}
            mt={1.5}
            direction={"row"}
          >
            <Grid item xs={12} sm={4.75}>
              <TextField
                name="cardHeading"
                required
                fullWidth
                size="small"
                type="string"
                label="Card Heading"
                value={wellnessField?.cardHeading}
                onChange={(event) => handleInputChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={2.75}>
              <TextField
                // sx={{ marginLeft: "1rem" }}
                className="textfield"
                name="percent"
                size="small"
                fullWidth
                required
                type="string"
                label="Percentage %"
                value={wellnessField?.percent}
                onChange={(event) => handleInputChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                // sx={{ marginLeft: "1rem" }}
                id="outlined-adornment-amount"
                className="textfield"
                name="boardPicture"
                size="small"
                fullWidth
                required
                type="file"
                // value={image}
                // label="Board Picture"
                onChange={(event) => handleImageChange(event)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          style={{ margin: "10px", border: "1px solid #9f2936" }}
        >
          Submit
        </Button>
      </form>
      <Box>
        <Stack mt={4}>
          <Typography variant="h4" sx={{ color: "#9f2936" }}>
            Wellness Board
          </Typography>

          <Grid container rowGap={2} columnGap={2}>
            {wellnessdata?.map((data, index) => {
              return (
                <>
                  <Grid
                    item
                    key={data?._id}
                    xs={12}
                    component={Paper}
                    border={"1px solid #9f2936"}
                    sm={5}
                    md={5}
                  >
                    <Grid item xs={12} spacing={1} p={1} key={data?._id}>
                      <Stack
                        direction={"row"}
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          borderBottom: "1px solid #9f2936",
                        }}
                      >
                        <Box
                          sx={
                            {
                              // borderBottom: "1px solid #9f2936",
                            }
                          }
                        >
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
                      </Stack>
                      <Stack direction={"row"} sx={{ marginY: "10px" }}>
                        <Box flex={1} sx={{ flexDirection: "column" }}>
                          <Typography
                            flex={1}
                            sx={{
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            {data?.heading}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={data?.percent}
                            sx={{
                              height: "12px",
                              borderRadius: "15px",
                              marginY: "8px",
                              width: "90%",
                              mt: "18px",
                            }}
                          />
                          <Typography
                            sx={{ textAlign: "end", mr: "30px", mt: "18px" }}
                          >
                            {data?.percent}%
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100px",
                            height: "100px",
                            bgcolor: "lightcyan",
                            display: "flex",
                          }}
                        >
                          <img
                            alt="wellness pic"
                            style={{ width: "100%" }}
                            src={data?.boardPicture}
                          />
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Stack>
      </Box>
      <EditWellnessBoardModal
        open={openEditModal}
        data={activeData}
        setupdateData={setupdateData}
        setupdateImage={setupdateImage}
        updateData={updateData}
        updateImage={updateImage}
        handleClose={handleCloseEditModal}
        handleAction={handleUpdateWellnessData}
      />
      <ConfirmationModal
        open={openConfirmationModal}
        handleClose={handleClose}
        handleAction={handleDelete}
        warningMsg={"delete this"}
        modalFor="Wellness Data"
      />
    </>
  );
};

export default AddWellnessInput;
