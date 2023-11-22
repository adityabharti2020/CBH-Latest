import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useDispatch } from "react-redux";
import Iconify from "../../../components/iconify";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

// ----------------------------------------------------------------------

export default function ResetForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [confPass, setConfPass] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  console.log("token", token);
  const handleClick = async () => {
    console.log("dono password dekho", password, confPass);
    if (password === confPass) {
      try {
        dispatch(isLoading(true));
        console.log("api ke andr", password);
        const res = await axios.put(`/api/v1/admin/reset/password/${token}`, {
          password,
        });

        if (res.data.success === true) {
          dispatch(isLoading(false));
          navigate("/login", { replace: true });
          dispatch(openSnackbar("Password Reset Successfully", "success"));
        }
      } catch (error) {
        dispatch(isLoading(false));
        dispatch(openSnackbar(error?.message, "error"));
      }
    } else {
      console.log("glt hai password");
      dispatch(openSnackbar("Password dosen't match", "error"));
    }
  };
  return (
    <>
      <Stack spacing={3}>
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="password"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="start"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setConfPass(e.target.value)}
        />
      </Stack>

      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

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
    </>
  );
}
