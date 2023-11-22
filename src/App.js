import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import Loader from "./reusablecomponents/isLoading/Loader";
import { closeSnackbar } from "./redux/action/defaultActions";
import Router from "./routes";
import ThemeProvider from "./theme";
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";

// ----------------------------------------------------------------------

export default function App() {
  const { snackbar, admin } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  return (
    <>
      <Loader />
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>

      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}
