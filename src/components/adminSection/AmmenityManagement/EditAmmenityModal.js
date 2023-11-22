import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";

const EditAmmenityModal = ({
  open,
  handleClose,
  data,
  updateData,
  setupdateData,
  handleAction,
}) => {
  // console.log(data);
  const updateSubmitHandler = (e) => {
    e.preventDefault();
    //  console.log("in")
  };
  const updateInputChange = (e) => {
    const { name, value } = e.target;
    setupdateData((updateData) => ({
      ...updateData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setupdateData({
      newBasePrice: data?.basePrice,
      newGST: data?.GST,
    });
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
            Update Amenities
          </Typography>
        </Stack>
        <form onSubmit={updateSubmitHandler}>
          <Stack mt={2} spacing={2}>
            <TextField
              required
              id="outlined-required"
              label="Amenity Name"
              defaultValue={data?.amenityName}
              type="string"
              disabled
              focused
              name="amenityName"
              fullWidth
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              type="number"
              defaultValue={data?.basePrice}
              value={updateData.newBasePrice}
              name="newBasePrice"
              label="Base Price"
              size="small"
              onChange={(e) => updateInputChange(e)}
            />
            <TextField
              id="outlined-adornment-amount"
              type="number"
              defaultValue={data?.GST}
              value={updateData.newGST}
              name="newGST"
              label="GST"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onChange={(e) => updateInputChange(e)}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            onClick={handleAction}
            sx={{ mt: 2, marginRight: "1rem" }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClose}
            sx={{ mt: 2, marginRight: "1rem" }}
          >
            Close
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAmmenityModal;
