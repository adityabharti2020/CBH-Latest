import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import Carousel from "react-multi-carousel";

import { IMG_PATH } from "../../../utils/url";

import "react-multi-carousel/lib/styles.css";
import { fDateTime } from "../../../utils/formatTime";
import MaintenanceTable from "./MaintenanceTable";
// const theme = createTheme({
//   palette: {
//     pending: createColor("#E4B200FF"),
//     resolved: createColor("#FF9800FF"),
//     accepted: createColor("#5C76B7"),
//     rejected: createColor("#BC00A3"),
//     closed: createColor("#4CAF50FF"),
//   },
// });

const RequestHolderCard = ({
  cardData,
  index,
  handleOpenModal,
  handleOpenResolveModal,
  allRequests,
}) => {
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
  // console.log(
  //   "allRequests displya inside request",
  //   allRequests?.user?.userName
  // );
  // console.log("javed sir", cardData);
  // console.log(cardData?.shop?.floor?.floor);

  return (
    <>
      <Card
        sx={{
          width: "100%",
          backgroundColor: cardData?.emergency
            ? "rgba(250,241,226,1)"
            : cardData?.status === "closed"
            ? "rgba(204, 255, 204,0.5)"
            : "light",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          {cardData?.status === "pending" ? (
            <Button
              variant="outlined"
              // color="#E4B200FF"
              sx={{
                borderRadius: "15px",
                bgcolor: "#E4B200FF",
                border: "none",
                color: "white",
              }}
              size="small"
              onClick={() => handleOpenModal(cardData)}
            >
              Accept Request
            </Button>
          ) : cardData?.status === "accepted" ? (
            <Button
              variant="outlined"
              // color="#1293A5FF"
              sx={{
                borderRadius: "15px",
                bgcolor: "#1293A5FF",
                border: "none",
                color: "white",
              }}
              size="small"
              onClick={() => handleOpenResolveModal(cardData)}
            >
              Mark As Resolved
            </Button>
          ) : (
            <Chip
              label={cardData?.status}
              size="small"
              sx={{
                border: "none",
                color: "white",
                bgcolor: `${
                  cardData?.status === "rejected"
                    ? "#F44336FF"
                    : cardData?.status === "resolved"
                    ? "#FF9800FF"
                    : "#1e9c3f"
                }`,
              }}
            />
          )}
        </Box>

        <MaintenanceTable cardData={cardData} />
        {/* <CardActionArea> */}
        {/* <CardContent>
          <Stack
            // direction={"row"}

            mt={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              width={"25px"}
              height={"25px"}
              src={`
              ${IMG_PATH}
              ${cardData?.problemId?.problemIcon?.url}`}
              alt={cardData?.problemId?.problemType}
            />
            <Typography gutterBottom variant="h5" component="div">
              {cardData?.problemId?.problemType}
              <Typography
                variant="body2"
                fontFamily={"monospace"}
                fontSize={"15px"}
                fontWeight={"bold"}
                component={"span"}
                color={"error.dark"}
              >
                {cardData?.emergency ? "(urgent)" : ""}
              </Typography>
            </Typography>
          </Stack>

          <Stack>
            <Grid style={{ display: "flex" }}>
              <Typography>{cardData?.shop?.type} :</Typography>
              <Typography color={"error.dark"}>
                &nbsp; {cardData?.shop?.shopNo}
              </Typography>
            </Grid>

            <Grid style={{ display: "flex" }}>
              <Typography>Floor :</Typography>
              <Typography color={"error.dark"}>
                &nbsp; {cardData?.shop?.floor?.floor}
              </Typography>
            </Grid>

            <Grid style={{ display: "flex" }}>
              <Typography component={"blockquote"}>Name : </Typography>
              <Typography color={"primary"} style={{ fontWeight: "100px" }}>
                &nbsp;
                {`${cardData?.user?.firstName} ${cardData?.user?.lastName}`}
              </Typography>
            </Grid>

            <Grid style={{ display: "flex", alignItems: "center" }}>
              <Typography>Raised On :</Typography>
              <Typography color={"primary"}>
                &nbsp;{fDateTime(`${cardData?.createdAt}`)}
              </Typography>
            </Grid>
            <Typography>Problem Desicription :</Typography>
            <Typography variant="body2" color={"primary"}>
              {cardData?.description}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h6" my={2}>
              Images /Videos Shared By User
            </Typography>
            <Carousel
              swipeable={"false"}
              draggable={"false"}
              showDots={"true"}
              responsive={responsive}
              ssr={"true"} // means to
              infinite={"true"}
              autoPlay={responsive.deviceType !== "mobile"}
              autoPlaySpeed={1000}
              keyBoardControl={"true"}
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {cardData?.images?.map((item, i) => {
                if (
                  item?.filename?.split(".")[
                    item?.filename?.split(".").length - 1
                  ] === "mp4"
                ) {
                  return (
                    <Box
                      key={i}
                      height={{ md: "150px", xs: "350px" }}
                      width={{ md: "150px", xs: "450px" }}
                    >
                      <video
                        autoPlay
                        controls
                        loop
                        muted
                        poster="https://assets.codepen.io/6093409/river.jpg"
                        style={{
                          minWidth: "100%",
                          maxWidth: "100%",
                          margin: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        <source
                          src={`${IMG_PATH}${item?.filePath}`}
                          type="video/mp4"
                        />
                      </video>
                    </Box>
                  );
                }
                return (
                  <Box
                    key={i}
                    height={{ md: "170px", xs: "280px" }}
                    width={{ md: "170px", xs: "280px" }}
                  >
                    <img
                      srcSet={`${IMG_PATH}${item?.filePath}`}
                      src={`${item.filePath}`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        minWidth: "100%",
                        maxWidth: "100%",
                        margin: "5px",
                        borderRadius: "5px",
                      }}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Stack>

          {cardData?.adminImages?.length > 0 ? (
            <Stack>
              <Typography variant="h6" my={2}>
                Images /Videos Shared By Admin
              </Typography>
              <Carousel
                swipeable={"true"}
                draggable={"true"}
                showDots={"true"}
                responsive={responsive}
                ssr={"true"} // means to
                infinite={"true"}
                autoPlay={responsive.deviceType !== "mobile"}
                autoPlaySpeed={1000}
                keyBoardControl={"true"}
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {cardData?.adminImages?.map((item, i) => {
                  if (
                    item?.filename?.split(".")[
                      item?.filename?.split(".").length - 1
                    ] === "mp4"
                  ) {
                    return (
                      <Box
                        key={i}
                        height={{ md: "150px", xs: "250px" }}
                        width={{ md: "150px", xs: "250px" }}
                      >
                        <video
                          autoPlay
                          controls
                          loop
                          muted
                          poster="https://assets.codepen.io/6093409/river.jpg"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <source
                            src={`${IMG_PATH}${item?.filePath}`}
                            type="video/mp4"
                          />
                        </video>
                      </Box>
                    );
                  }
                  return (
                    <Box
                      key={i}
                      height={{ md: "150px", xs: "250px" }}
                      width={{ md: "150px", xs: "250px" }}
                    >
                      <img
                        srcSet={`${IMG_PATH}${item?.filePath}`}
                        src={`${item.filePath}`}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  );
                })}
              </Carousel>
            </Stack>
          ) : (
            ""
          )}
        </CardContent> */}
        {/* </CardActionArea> */}
      </Card>
    </>
  );
};

export default RequestHolderCard;
