import { Link, useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import { login } from "../../../redux/action/adminActions";

// components

// ----------------------------------------------------------------------
export default function ForgetForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const handleClick = async () => {
    try {
      dispatch(isLoading(true));
      console.log("api ke andr", data);
      const res = await axios.post(`/api/v1/admin/forget/password`, data);
      if (res.data.success === true) {
        dispatch(login({ email: data?.email }));
        console.log(data);
        dispatch(
          openSnackbar("Mail Send Successfully To Your MAIL-ID", "success")
        );
        dispatch(isLoading(false));
        navigate("/login", { replace: true });
      }
    } catch (error) {
      openSnackbar(error.message, "danger");
      dispatch(isLoading(false));
      console.log("galat hai credentials");
    }
  };
  // const handleNav = () => {
  //   navigate("/login");
  // };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{
          marginTop: "1rem",
          backgroundColor: "#9f2936",
          "&:hover": {
            backgroundColor: "#f99594 !important",
          },
        }}
      >
        Submit
      </LoadingButton>
      <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
        Move to &nbsp;
        <Link to="/login" variant="subtitle2" underline="hover">
          Login
        </Link>
      </Stack>
    </>
  );
}
