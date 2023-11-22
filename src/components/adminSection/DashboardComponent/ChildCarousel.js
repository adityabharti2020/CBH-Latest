import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { Card, CardContent, Chip, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ChildPieChart from "./ChildPieChart";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Set a percentage width for responsiveness
  maxWidth: 1000, // Set a maximum width if needed
  bgcolor: "transparent",
  boxShadow: "None",
  p: 4,
};
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 1000,
//   // bgcolor: "background.paper",
//   bgcolor: "transparent",
//   // border: "2px solid #000",
//   // boxShadow: 24,
//   boxShadow: "None",
//   p: 4,
// };
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    modalStyle: {
      width: "90%",
      maxWidth: 400,
    },
  },
};
// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

const ChildCarousel = ({ totalShop, data, floor }) => {
  const [open, setOpen] = React.useState(false);
  const [shopData, setShopData] = React.useState([]);

  const handleClose = () => setOpen(false);

  const handleOpen = async (floorId) => {
    try {
      const res = await axios.get(
        `http://192.168.29.32:5001/api/v1/admin/get/allshops/${floorId}`
      );
      console.log("shop Data", res?.data);
      setShopData(res?.data?.allShopsData);
      setOpen(true);
    } catch (error) {
      console.log();
    }
  };

  React.useEffect(() => {
    handleOpen();
  }, []);

  console.log(data?._id);
  return (
    <div>
      <Chip
        sx={{
          color: "white",
          bgcolor: "#9F2936",
          "&:hover": {
            bgcolor: "rgba(159, 41, 54, 0.8)",
          },
        }}
        onClick={() => handleOpen(data?._id)}
        label={`Total-Shops ${totalShop}`}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                align="center"
              >
                {/* Shop of Floor No:{`${floor}`} */}
              </Typography>
              <Typography>
                {
                  <CancelIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleClose}
                  />
                }
              </Typography>
            </Box>
            {/* <Box sx={{ mt: 2 }}> */}

            <Box
              sx={{
                bgcolor: "#9F2936",
                borderRadius: "15px",
                // width: "100%",
                paddingX: "2.2rem",
              }}
            >
              <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows={false}
                reverse={false}
                autoPlay
                autoPlaySpeed={1}
                centerMode={false}
                // className=""
                containerClass="container-with-dots"
                customTransition="all 1s linear"
                // dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                // itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                // showDots={false}
                // sliderClass=""
                slidesToSlide={2}
                swipeable
                transitionDuration={4000}
                sx={{ height: "100%", width: "100%" }}
              >
                {shopData?.map((data, index) => {
                  return (
                    <Card
                      key={index}
                      sx={{
                        bgcolor: "#F2F2F2",
                        m: 2,
                        height: "90%",
                        width: "85%",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            flexDirection: {
                              xs: "column",
                              sm: "column",
                              md: "row",
                            },
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            align="start"
                            fontSize={"15px"}
                            sx={{
                              fontWeight: "bold",
                              textAlign: {
                                xs: "center",
                                sm: "center",
                                md: "start",
                              },
                            }}
                          >
                            Shop-NO:{data?.shopNo}
                          </Typography>

                          {/* <Typography gutterBottom variant="h6" component="div">
                            Alloted-To:{data?.allotedTo?.firstName}
                          </Typography> */}
                        </Box>

                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          align="left"
                          fontSize={"12px"}
                          // sx={{
                          //   fontSize: {
                          //     xs: "4",
                          //     sm: "6",
                          //     md: "7",
                          //   },
                          // }}
                        >
                          Paid-Maintenance:{data?.paidMaintenance}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          align="left"
                          fontSize={"12px"}
                          // sx={{
                          //   fontSize: {
                          //     xs: "6",
                          //     sm: "8",
                          //     md: "9",
                          //   },
                          // }}
                        >
                          Pending-Maintenance:{data?.pendingMaintenance}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          Alloted-To:
                          {data?.allotedTo?.firstName
                            ? data?.allotedTo?.firstName +
                              " " +
                              data?.allotedTo?.lastName
                            : ""}
                        </Typography>

                        <Stack
                          direction={"row"}
                          spacing={1}
                          justifyContent={"center"}
                        >
                          <ChildPieChart data={data} />
                          {/* {data?.paidMaintenancePercentage &&
                          data?.pendingMaintenancePercentage ? (
                            <ChildPieChart data={data} />
                          ) : (
                            <Box
                              sx={{
                                minHeight: "100px",
                              }}
                            >
                              <h4
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                Data Not Found
                              </h4>
                            </Box>
                          )} */}
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Carousel>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChildCarousel;
