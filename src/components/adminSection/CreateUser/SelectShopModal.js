import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Modal,
  Chip,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../../App.css";
import { useDispatch } from "react-redux";
// import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const SelectShopModal = ({
  open,
  data,
  handleClose,
  formDetail,
  setFormDetails,
  setShops,
  shops,
  openShopModal
}) => {
  console.log(data?.length);
  console.log(openShopModal);
  const [status , setStatus] = useState(false);
  const SelectShopHandler = (data) => {
    setStatus(true);
    if (formDetail.shopId.length === 0) {
      setFormDetails({
        ...formDetail,
        shopId: [data._id],
      });
    }
    setFormDetails({
      ...formDetail,
      shopId: [...formDetail.shopId, data._id],
    });
    setShops(...shops,[data?.shopNo])
    console.log("selected shop", data._id);
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        xs={12}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 280,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          px: 4,
          borderRadius: "10px",
        }}
      >
        <Grid item xs={12}>
          <Box>
            <Typography sx={{ textAlign: "center", color: "#9F2936" }}>
              Select Shops
            </Typography>
            {data?.length === 0 && (
              <Typography variant="h4" color={"primary"}>
                No shops Alloted!
              </Typography>
            )}
            {data?.map((shops, id) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => SelectShopHandler(shops)}
              >
                <Chip
                  sx={{
                    mt: 1,
                    fontSize: 18,
                    bgcolor: status === true ? "#9F2936" : "white",
                    color:status === true ? "white" : "black",
                    width: "140px",
                  }}
                  label={`Shop No.${shops?.shopNo}`}
                />
              </Box>
            ))}
            <Stack
              direction={"row"}
              mt={3}
              spacing={1.5}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "#9F2936",
                  color: "white",
                  "&:hover": {
                    backgroundColor: " #9F2936",
                    color: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={handleClose}
              >
                close
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SelectShopModal;
