import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { IMG_PATH } from "../../../utils/url";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

import Iconify from "../../iconify/Iconify";

const ResolveRequest = ({
  open,
  handleClose,
  handleAction,
  data,
  reloadData,
  selectedFilesUrl,
  setSelectedFilesUrl,
  handleChange,
  adminMsg, setAdminMsg
}) => {
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


  const handleUpdate = async () => {
    try {
      handleAction();
    } catch (error) {
      console.log("something went wrong");
    }
  };

 

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            // fontFamily={"monospace"}
            color={"primary"}
          >
            Resolve Request
          </Typography>
          <IconButton
            sx={{
              bgcolor: "#7D1212",
              height: "30px",
              width: "30px",
              color: "white",
              "&:hover": {
                bgcolor: "#430A0A",
              },
            }}
            onClick={handleClose}
          >
            <Iconify icon="ep:close-bold" />
          </IconButton>
        </Stack>

        <Stack
          // direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            width={"25px"}
            height={"25px"}
            src={`${IMG_PATH}${data?.problemId?.problemIcon?.url}`}
            alt={data?.problemId?.problemType}
          />
          <Typography gutterBottom variant="h5" component="div">
            {data?.problemId?.problemType}
            <Typography
              variant="body2"
              fontFamily={"monospace"}
              fontSize={"15px"}
              fontWeight={"bold"}
              component={"span"}
              color={"error.dark"}
            >
              {data?.emergency ? "(urgent)" : ""}
            </Typography>
          </Typography>
        </Stack>
        <Stack>
          <Typography color={"error.dark"}>
            Request Raised From {data?.shop?.type} : {data?.shop?.shopNo} on
            Floor : {data?.shop?.floor?.floor}
          </Typography>
          {/* <Typography variant="h6">Problem Desicription</Typography> */}
          <Typography variant="body2" color="text.dark" component={"p"}>
            {data?.description}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <ImageList
            sx={{ width: "100%", maxHeight: 450 }}
            cols={3}
            rowHeight={164}
          >
            {selectedFilesUrl?.length > 0 &&
              selectedFilesUrl?.map((url, index) => {
                return (
                  // <Box key={index}>
                  //   <img
                  //     src={url}
                  //     alt={`pic${index + 1}`}
                  //     width={"100%"}
                  //     height={"150px"}
                  //   />
                  // </Box>

                  <ImageListItem key={index}>
                    <img
                      srcSet={url}
                      src={url}
                      alt={`pic${index + 1}`}
                      loading="lazy"
                      width={"100px"}
                    />
                  </ImageListItem>
                );
              })}
          </ImageList>
        </Stack>

        <Stack spacing={2} mt={2}>
          <TextField
            name="message"
            multiline
            rows={3}
            placeholder="Type a message here !"
            label="Message"
            value={adminMsg}
            focused
            onChange={(e)=>setAdminMsg(e.target.value)}
          />
          <Box
            component={"input"}
            type="file"
            accept=".png, .jpg, .jpeg , .mp4"
            multiple
            onChange={(e) => handleChange(e)}
          />
          <Button variant="contained" onClick={handleUpdate}>
            Resolve and Post Images
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ResolveRequest;
