import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, Stack, TextField } from "@mui/material";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import Iconify from "../iconify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  paddingX: 4,
  paddingBottom: 4,
  paddingTop: 2,
};

const ChangePassword = ({ isOpen, handleClose }) => {
  const handleSubmit = () => {};
  return (
    <div>
      <Modal
        open={isOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} justifyContent={"right"}>
            <IconButton onClick={handleClose}>
              <Iconify icon="zondicons:close-outline" />
            </IconButton>
          </Stack>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#9f2936" }}
          >
            Change Password
          </Typography>
          <Grid container spacing={1} rowGap={1} columnGap={1}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Grid item sx={{ marginTop: 2 }}>
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="Password"
                  fullWidth
                  size="small"
                  required
                  name="title"

                  // value={data?.title}
                  // onChange={handleChange}
                />
              </Grid>
              <Grid item sx={{ marginTop: 2 }}>
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="New-Password"
                  size="small"
                  required
                  fullWidth
                  name="title"

                  // value={data?.title}
                  // onChange={handleChange}
                />
              </Grid>
              <Grid item sx={{ marginTop: 2 }}>
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="New-Password-Confirm"
                  fullWidth
                  size="small"
                  required
                  name="title"

                  // value={data?.title}
                  // onChange={handleChange}
                />
              </Grid>
              <Stack sx={{ size: "small", alignItems: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "#9F2936",
                    "&.MuiButton-root:hover": { background: "#9F2936" },
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangePassword;
