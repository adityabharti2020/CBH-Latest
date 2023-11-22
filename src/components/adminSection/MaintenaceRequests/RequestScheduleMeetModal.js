import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import Iconify from "../../iconify/Iconify";
import { IMG_PATH } from "../../../utils/url";

const RequestScheduleMeetModal = ({
  open,
  handleClose,
  handleAction,
  data,
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
  console.log("===>", data);

  const dispatch = useDispatch();

  const [requestValues, setRequestValues] = useState({});

  // handler for state values chages
  const handleChangeRequestValues = (e) => {
    setRequestValues({ ...requestValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    dispatch(isLoading(true));

    try {
      // /api/v1/admin/send/notification
      const res = await axios.post(`/api/v1/admin/send/notification`, {
        time: new Date(`${requestValues?.meetingDate}T${requestValues?.time}`),
        meetingDate: new Date(requestValues?.meetingDate),
        venue: requestValues?.venue,
        requestId: data?._id,
      });
      dispatch(openSnackbar("meeting schedules successfully", "success"));
      setRequestValues({});
      dispatch(isLoading(false));
      console.log("submmitted==>", res);
    } catch (error) {
      console.log("error");
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
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
            Nofity User
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
          <Typography variant="body2" color="text.dark" component={"address"}>
            {data?.description}
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <Stack spacing={2}>
            <TextField
              label="select date"
              name="meetingDate"
              type="date"
              focused
              placeholder="select date for meet"
              fullWidth
              required
              size="small"
              value={
                requestValues?.meetingDate ? requestValues?.meetingDate : ""
              }
              onChange={handleChangeRequestValues}
            />
            <TextField
              label="select time"
              name="time"
              type="time"
              focused
              placeholder="select date for meet"
              fullWidth
              required
              size="small"
              value={requestValues?.time ? requestValues?.time : ""}
              onChange={handleChangeRequestValues}
            />
            <TextField
              label="provide venue name"
              name="venue"
              focused
              type="text"
              multiline
              rows={4}
              placeholder="select date for meet"
              required
              value={requestValues?.venue ? requestValues?.venue : ""}
              onChange={handleChangeRequestValues}
            />
            <Button variant="contained" type="submit">
              Schedule
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default RequestScheduleMeetModal;
