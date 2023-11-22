import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function Loader() {
  const { loading } = useSelector((state) => state);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#510400",
          // bgcolor:"rgba(0,0,0,0.5)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
