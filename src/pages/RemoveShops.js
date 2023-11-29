import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { isLoading, openSnackbar } from "../redux/action/defaultActions";

const RemoveShops = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [shop, shopdata] = useState([]);
  const [res, setres] = useState(null);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(userId)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid",
    borderColor: "info.dark",
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };
  const userShops = async () => {
    dispatch(isLoading(true));
    // console.log("in")
    try {
      setres(
        await axios.get(`/api/v1/user/get/user/assigned/shops/data/${userId}`)
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  useEffect(() => {
    userShops();
  }, []);
  // console.log(res);

  const handleDelete = async (Id) => {
    // console.log("shop Id => ", Id);
    dispatch(isLoading(true));
    try {
      const response = await axios.put(
        `/api/v1/admin/delete/user/alloted/shop/${userId}/${Id}`
      );
      // console.log(response);
      // console.log(response?.data?.success);
      if(response?.data?.success === true){
          userShops();
        handleClose()
      }
      dispatch(openSnackbar("Shop removed successfully", "success"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  return (
    <>
      <div>
        <Button
          sx={{ fontSize: "12px", color: "white", p: 0 }}
          onClick={handleOpen}
        >
          Remove Shop
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {res?.data?.shopsAllotted?.length === 0 && (
              <Typography variant="h4" color={"primary"}>
                No shops Alloted!
              </Typography>
            )}
            {res?.data?.shopsAllotted?.map((shops, id) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4" color={"primary"}>
                  {shops?.shopNo === ""
                    ? "No Shop Alloted"
                    : `Shop No: ${shops?.shopNo}`}
                </Typography>
                <Typography onClick={() => handleDelete(shops?._id)}>
                  {<CancelIcon />}
                </Typography>
              </Box>
            ))}
            {/* {res?.data?.shopsAllotted.map((shops, id) => {
              return shops?.shopNo === 0 ? 
                <Typography variant="h4" color={"primary"}>
                  No shops Alloted !
                </Typography>
               : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h4" color={"primary"}>
                    Shop No: {shops?.shopNo}
                  </Typography>
                  <Typography onClick={() => handleDelete(shops?._id)}>
                    {<CancelIcon />}
                  </Typography>
                </Box>
              );
            })} */}

            <Stack
              direction={"row"}
              mt={3}
              spacing={1.5}
              alignItems={"center"}
              justifyContent={"start"}
            >
              <Button variant="outlined" color="inherit" onClick={handleClose}>
                close
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default RemoveShops;
