import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

const DeleteConfirmationModal = ({open,
    handleClose,
    handleAction,
  
    warningMsg,
    modalFor}) => {
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
            p: 4,
            borderRadius:"5px"
          };
          const handlePerformAction = async () => {
            handleClose();
            await handleAction();
          };
          return (
            <>
              <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography variant="h4" color={"primary"}>
                    Are you sure you want to {warningMsg} the {modalFor} ?
                  </Typography>
                  {/* <Stack>
                    <Typography>Are You sure ?</Typography>
                  </Stack> */}
                  <Stack
                    direction={"row"}
                    mt={2}
                    spacing={1.5}
                    alignItems={"center"}
                    justifyContent={"start"}
                  >
                    <Button variant="outlined"  sx={{color:"white",bgcolor:"#9F2936", "&:hover": {
                        backgroundColor: " #9F2936",
                        color: "white",
                        boxShadow: "none",
                      },}} onClick={handleClose}>
                      close
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{color:"white",bgcolor:"#9F2936", "&:hover": {
                        backgroundColor: " #9F2936",
                        color: "white",
                        boxShadow: "none",
                      },}}
                      onClick={handlePerformAction}
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </>
          );
}

export default DeleteConfirmationModal