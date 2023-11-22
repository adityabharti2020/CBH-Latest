import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useDispatch } from "react-redux";
import Iconify from "../../../components/iconify";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
// components

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleNav = () => {
    navigate("/forget");
  };

  const handleClick = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.post(`/api/v1/admin/sign/in`, data);

      if (res.data.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar("logged in Successfully", "success"));
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
      console.log("galat hai credentials");
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        {/* <TextField
          name="password"
          label="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        /> */}
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" onClick={handleNav}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: "#9f2936",
          "&:hover": {
            backgroundColor: "#f99594 !important",
          },
        }}
      >
        Login
      </LoadingButton>
    </>
  );
}
