import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconify from "../../iconify/Iconify";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const DeleteModal = ({ id, getFloorData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // console.log("floor", id);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = async (id) => {
    dispatch(isLoading(true));
    // console.log("id pass kro", id);
    try {
      const res = await axios.delete(
        `/api/v1/admin/delete/floor/by/floorId/${id}`
      );
      // console.log("responseDekho", res);
      if (res?.data?.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar(res?.data?.message, "success"));
        handleOpen();
        getFloorData();
        // navigate("/dashboard/floorCreation", { replace: true });
        // window.location.reload()
        // navigate("/dashboard/floorCreation");
      }
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(openSnackbar("Something Went Wrong", "error"));
      console.log(error.message);
    }
  };
  return (
    <>
      {/* <Button onClick={handleOpen}>
        <DeleteForeverIcon sx={{ color: "white" }} />
      </Button> */}
      <IconButton onClick={handleOpen} sx={{ color: "white" }}>
        <Iconify icon="fluent:delete-20-filled" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleOpen}
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
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Floor Delete Modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are You Sure to want to delete this floor
          </Typography>
          <Button onClick={handleOpen} sx={{ mt: 2, marginRight: "1rem" }}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(id)} sx={{ mt: 2 }}>
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
