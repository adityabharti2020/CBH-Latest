import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import PieChart from "./PieChart";
import ChildCarousel from "./ChildCarousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
  },
};

const CarouselSlider = () => {
  const [floorsData, setFloorsData] = React.useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://192.168.29.32:5001/api/v1/admin/get/all/floors"
      );
      // console.log("data", res?.data);
      setFloorsData(res?.data?.allFloors);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "start",
          color: "#691F25",
        }}
      >
        All Floors
      </h1>
      {/* background: "#9F2936" */}
      <Box
        sx={{
          background: "#9F2935",
          borderRadius: "20px",
          width: "100%",
          paddingX: "1.7rem",

          // paddingLeft: "2.8rem",
          // paddingY: "0.8rem",
          // paddingTop: "1.5rem",
          // overflow: "hidden",
        }}
      >
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows={false}
          reverse={false}
          // autoPlay
          // autoPlaySpeed={1}
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
          // sx={{ height: "100%", width: "100%" }}
        >
          {floorsData?.map((data, index) => {
            return (
              <Card
                key={index}
                sx={{
                  background: "#F2F2F2",
                  m: 2,
                  // height: "85%",
                  width: "80%",
                  justifyContent: "center",
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
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      fontSize={"15px"}
                      sx={{
                        fontWeight: "bold",
                        textAlign: { xs: "center", sm: "center", md: "start" },
                      }}
                    >
                      Floor:{data?.floor}
                    </Typography>

                    <Stack
                    // gutterBottom
                    // variant="h6"
                    // component="div"
                    // sx={{
                    //   textAlign: {
                    //     xs: "center",
                    //     sm: "center",
                    //     md: "start",
                    //   },
                    //   bgcolor: "#9F2936",
                    //   color: "white",
                    //   p: 1,
                    //   borderRadius: "15px",
                    //   cursor: "pointer",
                    //   fontSize: "15px",
                    // }}
                    // onClick={openChildCarousel}
                    >
                      {data?.totalShops ? (
                        <ChildCarousel
                          totalShop={data?.totalShops}
                          data={data}
                          floor={data?.floor}
                        />
                      ) : (
                        <Chip
                          sx={{ color: "white", bgcolor: "#9F2936" }}
                          label="No Shops Available"
                        />
                      )}
                      {/* {showChildCarousel && (
                        <ChildCarousel
                          totalShop={data?.totalShops}
                          data={data}
                        />
                      )} */}
                      {/* Total-Shops:{data?.totalShops} */}
                    </Stack>
                  </Box>

                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                    fontSize="14px"
                  >
                    Paid-Maintenance:{data?.paidfloorMaintenance}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                    fontSize="14px"
                    // sx={{
                    //   fontSize: {
                    //     xs: "10",
                    //     sm: "12",
                    //     md: "13",
                    //   },
                    // }}
                  >
                    Pending-Maintenance:{data?.pendingfloorMaintenance}
                  </Typography>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    justifyContent={"center"}
                  >
                    <PieChart data={data} />
                    {/* {data?.paidMaintenancePercentage &&
                    data?.pendingMaintenancePercentage ? (
                      <PieChart data={data} />
                    ) : (
                      <Box sx={{ minHeight: "100px" }}>
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
    </>
  );
};

export default CarouselSlider;
