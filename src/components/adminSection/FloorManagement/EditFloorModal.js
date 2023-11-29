import { React, useState, useEffect } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const EditFloorModal = ({ open, handleClose, data, getAllFloorData }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    updatedRate: null,
    gstRate: null,
  });

  const handleInputChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };
  // ============================ Handle Update Floor =============================
  const handleUpdateFloorData = async (floorId) => {
    dispatch(isLoading(true));
    try {
      const res = await axios.put(
        `/api/v1/admin/update/floor/rate/${floorId}`,
        { inputValue }
      );
      console.log("floorUPdated RESPONSE", res);
      // handleCloseEditModal();
      handleClose();
      getAllFloorData();
      dispatch(openSnackbar(res?.data?.message, "success"));
      dispatch(isLoading(false));
    } catch (error) {
      console.log("==>", error);
      dispatch(isLoading(false));
    }
  };

  useEffect(() => {
    if (data) {
      setInputValue({
        updatedRate: data?.ratePerSqFt,
        gstRate: data?.GST,
      });
    }
  }, [data]);

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          px: 4,
          borderRadius: "10px",
        }}
      >
        <Stack>
          <Typography variant="h5" color={"#9f2936"}>
            Update Floor Rates
          </Typography>
        </Stack>
        <Stack mt={2} spacing={2}>
          <TextField
            type="number"
            value={data?.floor}
            disabled
            name="floor"
            fullWidth
            label="Floor No"
            focused
            size="small"
          />
          <TextField
            type="number"
            value={inputValue?.updatedRate}
            name="updatedRate"
            label="Floor ratePerSqft"
            size="small"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
          <TextField
            type="number"
            value={inputValue?.gstRate}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            name="gstRate"
            label="Gst Rate "
            size="small"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            handleUpdateFloorData(data?._id);
          }}
          sx={{ mt: 2, marginRight: "1rem" }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ mt: 2, marginRight: "1rem" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default EditFloorModal;
