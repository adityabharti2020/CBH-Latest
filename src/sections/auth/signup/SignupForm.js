import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="First Name" />
        <TextField name="name" label="Last Name" />
        <TextField name="email" label="Email address" />
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={6} sm={6} md={8}>
            <TextField name="number" label="Mobile Number" />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <TextField name="gender" label="Sex" />
          </Grid>
        </Grid>

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
        Login
      </LoadingButton>
    </>
  );
}
