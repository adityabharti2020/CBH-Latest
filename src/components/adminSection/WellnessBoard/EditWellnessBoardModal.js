import React, { useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const EditWellnessBoardModal = ({
  open,
  handleClose,
  data,
  updateData,
  handleAction,
  setupdateData,
  setupdateImage,
  updateImage,
}) => {
  console.log(open);
  const updateSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("heading", updateData.cardHeading);
    formdata.append("percent", updateData.percent);
    formdata.append("boardPicture", updateImage);
    handleAction(formdata);
  };

  //   const updateInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setupdateData((updateData) => ({
  //       ...updateData,
  //       [name]: value,
  //     }));
  //   };
  const handleImageChange = (e) => {
    setupdateImage(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const newValue = type === 'file' ? files[0] : value;
    setupdateData({
      ...updateData,
      [name]: value,
    });
  };
  useEffect(() => {
    setupdateData({
      cardHeading: data?.heading,
      percent: data?.percent,
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
            Update Wellness Board
          </Typography>
        </Stack>
        <form onSubmit={updateSubmitHandler}>
          <Stack mt={2} spacing={2}>
            <TextField
              id="outlined-required"
              label="Card Heading"
              defaultValue={data?.heading}
              value={updateData.cardHeading}
              type="string"
              name="cardHeading"
              fullWidth
              size="small"
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="outlined-required"
              defaultValue={data?.percent}
              value={updateData.percent}
              name="percent"
              size="small"
              fullWidth
              type="string"
              label="Percentage %"
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              type="file"
              // value={data?.boardPicture}
              // defaultValue={data?.boardPicture}
              name="boardPicture"
              size="small"
              fullWidth
              onChange={(e) => handleImageChange(e)}
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

export default EditWellnessBoardModal;
