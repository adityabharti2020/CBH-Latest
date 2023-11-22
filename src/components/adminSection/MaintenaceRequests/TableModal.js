import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Card, CardActions, CardContent, Grid, Stack } from "@mui/material";
import Carousel from "react-multi-carousel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../redux/action/defaultActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableModal = ({ open, handleClose, userId }) => {
  // const IMG_PATH ={userId?.images?.    }
  const dispatch = useDispatch();
  const handleGetUserData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(
        `/api/v1/Maintenance/get/single/request/${userId}`
      );
      dispatch(isLoading(false));
      // console.log("responseDekho====>", res);
    } catch (error) {
      dispatch(isLoading(false));
      console.log(error?.essage);
    }
  };
  useEffect(() => {
    handleGetUserData();
  }, [open]);

  return (
    <>
      {/* <CardActionArea> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                kuch.BHI.DEKHO
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
      {/* </CardActionArea> */}
    </>
  );
};

export default TableModal;
