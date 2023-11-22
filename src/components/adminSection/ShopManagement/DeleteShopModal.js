import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useDispatch } from "react-redux";
import Iconify from "../../iconify/Iconify";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import EditShop from "./EditShop";

const DeleteShopModal = ({ id, getFloorData, shopDetails, handleGetShop }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [shopId, setShopId] = useState();
  const handleOpen = (id) => {
    // console.log("mst id a rhi h", id);
    setShopId(id);
    setOpen(!open);
  };
  // console.log("shopId", shopId);
  // console.log("shopDetails====> Delete", shopDetails);

  const handleDelete = async (id) => {
    dispatch(isLoading(true));
    // console.log("id pass kro", id);
    try {
      const res = await axios.delete(
        `/api/v1/admin/delete/shop/by/shopId/${id}`
      );
      if (res?.data?.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar(res?.data?.message, "success"));
        handleOpen();
        getFloorData();
        // handleGetShop();
      }
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(openSnackbar("Something Went Wrong", "error"));
      console.log(error.message);
    }
  };

  return (
    <Box>
      {/* <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        multiple={false}
        options={[{ shopNo: "--select--" }, ...shopDetails]}
        getOptionLabel={(option) => option?.shopNo}
        sx={{ width: 200 }}
        renderInput={(params) => {
          return <TextField {...params} label={"--select--"} />;
        }}
      /> */}

      <Grid container columnGap={1} rowGap={1}>
        {shopDetails?.map((data, index) => {
          return (
            <Grid
              item
              xs={2}
              key={index}
              flexDirection={"row"}
              sx={{
                position: "relative",
                "&:hover .MuiBox-root": {
                  transition: "all 300ms ease",
                  opacity: "1",
                },
                "&:hover .MuiButton-root": {
                  transition: "all 300ms ease",
                  opacity: "1",
                },
              }}
            >
              <Box
                width={"100%"}
                color={"white"}
                bgcolor={"#510400"}
                textAlign={"center"}
                sx={{
                  backgroundImage: "url(/assets/images/covers/cover_28.png)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Stack p={2}>
                  <Typography variant="h5" fontFamily={"monospace"}>
                    Shop-No {data?.shopNo}
                  </Typography>
                </Stack>
              </Box>

              <Box
                sx={{
                  top: 0,
                  opacity: "0",
                  display: "flex",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.8)",
                  zIndex: "1000",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <Stack direction={"row"}>
                  <EditShop data={data} shopId={data?._id} />

                  {/* <DeleteModal id={data?._id} getFloorData={getFloorData} /> */}
                  <Button onClick={() => handleOpen(data?._id)}>
                    <DeleteForeverIcon sx={{ color: "white" }} />
                  </Button>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* <Button onClick={handleOpen}>
        <DeleteForeverIcon />
      </Button> */}
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
            Delete Shop
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are You Sure to want to delete this Shop
          </Typography>
          <Button onClick={handleOpen} sx={{ mt: 2, marginRight: "1rem" }}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              //  console.log("deleteId", id)
              handleDelete(shopId)
            }
            sx={{ mt: 2 }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteShopModal;
