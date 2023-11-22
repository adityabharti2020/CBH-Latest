import {
  Box,
  Button,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Carousel } from "reactstrap";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import Iconify from "../../iconify/Iconify";
import { IMG_PATH } from "../../../utils/url";

const RequestAcceptModal = ({
  open,
  handleClose,
  cardData,
  handleOpen,
  // handleAction,
  // cardData,
  // reloadcardData,
  // handleClose,
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

  const dispatch = useDispatch();

  const [requestValues, setRequestValues] = useState({});

  // handler for state values chages
  // const CardData = ({ ...cardData }, cardData);
  const handleChangeRequestValues = (e) => {
    setRequestValues({ ...requestValues, [e.target.name]: e.target.value });
  };

  // http://localhost:5001/api/v1/admin/update/maintenance/request/statu
  const handleUpdateRequestStatus = async (status) => {
    handleClose();
    dispatch(isLoading(true));
    try {
      const res = await axios.put(
        `/api/v1/admin/update/maintenance/request/status`,
        {
          requestId: cardData?._id,
          updatedStatus: status,
        }
      );
      dispatch(
        openSnackbar(`request has been ${status} successfully`, "success")
      );
      // reloadcardData();
      dispatch(isLoading(false));
    } catch (error) {
      console.log("error");
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  console.log("newData", cardData);
  // console.log(
  //   "modalData====>",
  //   cardData ? cardData[0]?.problemId?.problemType : []
  // );
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    dispatch(isLoading(true));
    try {
      const res = await axios.post(`/api/v1/admin/send/notification`, {
        time: new Date(`${requestValues?.meetingDate}T${requestValues?.time}`),
        meetingDate: new Date(requestValues?.meetingDate),
        venue: requestValues?.venue,
        requestId: cardData?._id,
      });
      dispatch(openSnackbar("meeting schedules successfully", "success"));
      setRequestValues({});
      dispatch(isLoading(false));
      // console.log("submmitted==>", res);
    } catch (error) {
      console.log("error");
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };

  return (
    <>
      {cardData ? (
        <Modal
          open={open}
          onClose={handleClose}
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
                Accept Request
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
                src={`${IMG_PATH}${cardData?.images?.pfilePath}`}
                alt={cardData[0]?.problemId?.problemType}
              />
              <Typography gutterBottom variant="h5" component="div">
                {cardData[0]?.problemId?.problemType}
                <Typography
                  variant="body2"
                  fontFamily={"monospace"}
                  fontSize={"15px"}
                  fontWeight={"bold"}
                  component={"span"}
                  color={"error.dark"}
                >
                  {cardData[0]?.emergency ? "(urgent)" : ""}
                </Typography>
              </Typography>
            </Stack>
            <Stack>
              <Typography color={"error.dark"}>
                Request Raised From {cardData[0]?.shop?.type} :{" "}
                {cardData?.shop?.shopNo} on Floor :{" "}
                {cardData?.shop?.floor?.floor}
              </Typography>
              {/* <Typography variant="h6">Problem Desicription</Typography> */}
              <Typography
                variant="body2"
                color="text.dark"
                component={"address"}
              >
                {cardData?.description}
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
                  label="Discription"
                  name="discription"
                  focused
                  type="text"
                  multiline
                  rows={4}
                  placeholder="Enter text here"
                  required
                  value={requestValues?.venue ? requestValues?.venue : ""}
                  onChange={handleChangeRequestValues}
                />
                {/* <Button variant="contained" type="submit">
            Schedule
          </Button> */}
              </Stack>
            </form>
            <Stack spacing={1} py={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateRequestStatus("accepted")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleUpdateRequestStatus("rejected")}
              >
                Reject
              </Button>
              {/* <Button variant="contained" color="warning" onClick={handleClose}>
          Close
        </Button> */}
            </Stack>
          </Box>
        </Modal>
      ) : (
        // <Modal
        //   open={open}
        //   onClose={handleClose}
        //   aria-labelledby="modal-modal-title"
        //   aria-describedby="modal-modal-description"
        // >
        //   <Stack
        //     // direction={"row"}

        //     mt={2}
        //     alignItems={"center"}
        //     justifyContent={"center"}
        //   >
        //     <img
        //       width={"25px"}
        //       height={"25px"}
        //       src={`
        //       ${IMG_PATH}
        //       ${cardData?.problemId?.problemIcon?.url}`}
        //       alt={cardData?.problemId?.problemType}
        //     />
        //     <Typography gutterBottom variant="h5" component="div">
        //       {cardData?.problemId?.problemType}
        //       <Typography
        //         variant="body2"
        //         fontFamily={"monospace"}
        //         fontSize={"15px"}
        //         fontWeight={"bold"}
        //         component={"span"}
        //         color={"error.dark"}
        //       >
        //         {cardData?.emergency ? "(urgent)" : ""}
        //       </Typography>
        //     </Typography>
        //   </Stack>

        //   <Stack>
        //     <Grid style={{ display: "flex" }}>
        //       <Typography>{cardData?.shop?.type} :</Typography>
        //       <Typography color={"error.dark"}>
        //         &nbsp; {cardData?.shop?.shopNo}
        //       </Typography>
        //     </Grid>

        //     <Grid style={{ display: "flex" }}>
        //       <Typography>Floor :</Typography>
        //       <Typography color={"error.dark"}>
        //         &nbsp; {cardData?.shop?.floor?.floor}
        //       </Typography>
        //     </Grid>

        //     <Grid style={{ display: "flex" }}>
        //       <Typography component={"blockquote"}>Name : </Typography>
        //       <Typography color={"primary"} style={{ fontWeight: "100px" }}>
        //         &nbsp;
        //         {`${cardData?.user?.firstName} ${cardData?.user?.lastName}`}
        //       </Typography>
        //     </Grid>

        //     <Grid style={{ display: "flex", alignItems: "center" }}>
        //       <Typography>Raised On :</Typography>
        //       <Typography color={"primary"}>
        //         {/* &nbsp;{fDateTime(`${cardData?.createdAt}`)} */}
        //         20/0623
        //       </Typography>
        //     </Grid>
        //     <Typography>Problem Desicription :</Typography>
        //     <Typography variant="body2" color={"primary"}>
        //       {cardData?.description}
        //     </Typography>
        //   </Stack>
        //   <Stack>
        //     <Typography variant="h6" my={2}>
        //       Images /Videos Shared By User
        //     </Typography>
        //     <Carousel
        //       swipeable={"false"}
        //       draggable={"false"}
        //       showDots={"true"}
        //       // responsive={responsive}
        //       ssr={"true"} // means to
        //       infinite={"true"}
        //       // autoPlay={responsive.deviceType !== "mobile"}
        //       autoPlaySpeed={1000}
        //       keyBoardControl={"true"}
        //       transitionDuration={1000}
        //       containerClass="carousel-container"
        //       removeArrowOnDeviceType={["tablet", "mobile"]}
        //     >
        //       {cardData?.images?.map((item, i) => {
        //         if (
        //           item?.filename?.split(".")[
        //             item?.filename?.split(".").length - 1
        //           ] === "mp4"
        //         ) {
        //           return (
        //             <Box
        //               key={i}
        //               height={{ md: "150px", xs: "350px" }}
        //               width={{ md: "150px", xs: "450px" }}
        //             >
        //               <video
        //                 autoPlay
        //                 controls
        //                 loop
        //                 muted
        //                 poster="https://assets.codepen.io/6093409/river.jpg"
        //                 style={{
        //                   minWidth: "100%",
        //                   maxWidth: "100%",
        //                   margin: "5px",
        //                   borderRadius: "5px",
        //                 }}
        //               >
        //                 <source
        //                   src={`${IMG_PATH}${item?.filePath}`}
        //                   type="video/mp4"
        //                 />
        //               </video>
        //             </Box>
        //           );
        //         }
        //         return (
        //           <Box
        //             key={i}
        //             height={{ md: "170px", xs: "280px" }}
        //             width={{ md: "170px", xs: "280px" }}
        //           >
        //             <img
        //               srcSet={`${IMG_PATH}${item?.filePath}`}
        //               src={`${item.filePath}`}
        //               alt={item.title}
        //               loading="lazy"
        //               style={{
        //                 minWidth: "100%",
        //                 maxWidth: "100%",
        //                 margin: "5px",
        //                 borderRadius: "5px",
        //               }}
        //             />
        //           </Box>
        //         );
        //       })}
        //     </Carousel>
        //   </Stack>

        //   {/* {cardData?.adminImages?.length > 0 ? (
        //     <Stack>
        //       <Typography variant="h6" my={2}>
        //         Images /Videos Shared By Admin
        //       </Typography>
        //       <Carousel
        //         swipeable={"true"}
        //         draggable={"true"}
        //         showDots={"true"}
        //         // responsive={responsive}
        //         ssr={"true"} // means to
        //         infinite={"true"}
        //         // autoPlay={responsive.deviceType !== "mobile"}
        //         autoPlaySpeed={1000}
        //         keyBoardControl={"true"}
        //         transitionDuration={1000}
        //         containerClass="carousel-container"
        //         removeArrowOnDeviceType={["tablet", "mobile"]}
        //       >
        //         {cardData?.adminImages?.map((item, i) => {
        //           if (
        //             item?.filename?.split(".")[
        //               item?.filename?.split(".").length - 1
        //             ] === "mp4"
        //           ) {
        //             return (
        //               <Box
        //                 key={i}
        //                 height={{ md: "150px", xs: "250px" }}
        //                 width={{ md: "150px", xs: "250px" }}
        //               >
        //                 <video
        //                   autoPlay
        //                   controls
        //                   loop
        //                   muted
        //                   poster="https://assets.codepen.io/6093409/river.jpg"
        //                   style={{ width: "100%", height: "100%" }}
        //                 >
        //                   <source
        //                     src={`${IMG_PATH}${item?.filePath}`}
        //                     type="video/mp4"
        //                   />
        //                 </video>
        //               </Box>
        //             );
        //           }
        //           return (
        //             <Box
        //               key={i}
        //               height={{ md: "150px", xs: "250px" }}
        //               width={{ md: "150px", xs: "250px" }}
        //             >
        //               <img
        //                 srcSet={`${IMG_PATH}${item?.filePath}`}
        //                 src={`${item.filePath}`}
        //                 alt={item.title}
        //                 loading="lazy"
        //                 style={{ width: "100%", height: "100%" }}
        //               />
        //             </Box>
        //           );
        //         })}
        //       </Carousel>
        //     </Stack>
        //   ) : (
        //     ""
        //   )} */}
        // </Modal>
        ""
      )}
    </>
  );
};

export default RequestAcceptModal;
