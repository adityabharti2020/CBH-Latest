import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import JsPDF from "jspdf"
import PDF, { Text, AddPage, Line, Image, Table, Html } from "jspdf-react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { fDate } from "../../../utils/formatTime";
import { isLoading } from "../../../redux/action/defaultActions";

const CreateInvoiceForm = () => {
  const style = {
    width: "100%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 30,
    p: 4,
    borderRadius: "10px",
    alignContent: "center",
    justifyContent: "center",
  };
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const userDetails = useLocation();
  const ref = useRef();
  const getData = async () => {
    dispatch(isLoading(true));

    try {
      const res = await axios.post(
        `/api/v1/admin/create/invoice/${userDetails?.state?.idShop}/${userDetails.state.shop}`
      );
      console.log("getData", res?.data);
      dispatch(isLoading(false));
      setData(res?.data);
    } catch (error) {
      dispatch(isLoading(false));
      console.log(error?.message);
    }
  };

  // ============convert to pdf======
  const generatePDF = () => {
    //   const report = new JsPDF("portrait", "pt", "a4");
    //   report.html(document.querySelector("#report")).then(() => {
    //     report.save("report.pdf");
    //   });
  };
  // ================================
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if(userDetails){
      console.log(userDetails);
    }
  })
  console.log(ref);
  const properties = { header: "Acme" };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ReactToPrint
        trigger={() => {
          // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
          // to the root node of the returned component as it will be overwritten.
          return <a href="#">Print this out!</a>;
        }}
        content={() => ref.current}
      />

      <Grid container sx={style} rounded={1} xs={12} sm={10} md={8} ref={ref}>
        <Grid item xs={7} sm={7} md={7}>
          <img
            style={{ maxWidth: "4.5rem" }}
            src={"/assets/icons/cbh.svg"}
            alt="logo"
          />
        </Grid>
        <Grid item container xs={5} sm={4} md={5} spacing={1}>
          <Grid item style={{ display: "flex" }}>
            <Typography style={{ fontSize: "12px" }}>Mail.id:</Typography>
            <Typography style={{ fontSize: "12px" }}>
              {data?.userDetail?.email}
            </Typography>
          </Grid>
          <Grid item style={{ display: "flex" }}>
            <Typography style={{ fontSize: "12px" }}>Phone.No:</Typography>
            <Typography style={{ fontSize: "12px" }}>
              {data?.userDetail?.contactNo}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            textAlign: "center",
          }}
        >
          <Typography spacing={2} variant="h3">
            Invoice
          </Typography>
          <Typography variant="h3">Central Business Hub</Typography>
        </Grid>
        <Grid item container xs={7} sm={8} md={8} sx={{ marginTop: "1.5rem" }}>
          <Grid item xs={5} sm={3} md={3}>
            <Typography style={{ color: "black", fontWeight: 800 }}>
              Username:
            </Typography>
          </Grid>
          <Grid item xs={7} sm={9} md={9}>
            <Typography>
              {data?.userDetail?.firstName} {data?.userDetail?.lastName}
            </Typography>
          </Grid>
          <Grid item xs={5} sm={3} md={3}>
            <Typography style={{ color: "black", fontWeight: 800 }}>
              Shop-No:
            </Typography>
          </Grid>
          <Grid item xs={7} sm={9} md={9}>
            <Typography> {data?.shopMaintenanceData[0]?.shopNo}</Typography>
          </Grid>
        </Grid>

        <Grid item container xs={5} sm={4} md={4} sx={{ marginTop: "1.5rem" }}>
          <Grid item xs={5} sm={6} md={6}>
            <Typography style={{ color: "black", fontWeight: 600 }}>
              Invoice.No:
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6} md={6}>
            <Typography style={{ color: "#566468", fontWeight: 200 }}>
              {data?.invoiceNo}
            </Typography>
          </Grid>
          <Grid item xs={5} sm={7} md={6}>
            <Typography style={{ color: "black", fontWeight: 600 }}>
              Invoice.Date:
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6} md={6}>
            <Typography style={{ color: "#566468", fontWeight: 200 }}>
              &nbsp;{fDate(data?.invoiceDate)}
            </Typography>
          </Grid>
          <Grid item xs={5} sm={6} md={6}>
            <Typography style={{ color: "black", fontWeight: 600 }}>
              Due Date:
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6} md={6}>
            <Typography style={{ color: "#566468", fontWeight: 200 }}>
              {/* &nbsp;{fDate(`${data?.dueDate}`)} */}
              &nbsp;{fDate(data?.dueDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          component={Paper}
          sx={{
            alignContent: "center",
            justifyContent: "center",
            border: "1px solid grey",
            marginTop: "1rem",
          }}
        >
          <Grid
            item
            xs={8}
            sm={8}
            md={8}
            sx={{
              marginTop: "1.5rem",
              paddingLeft: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <Typography variant="h6">Particulars</Typography>
            {data?.shopMaintenanceData.map((months, index) => {
              return <Typography>{months?.month}</Typography>;
            })}

            {/* <Typography variant="h6">Total</Typography> */}
            {/* <Typography>@ GST(18%)</Typography> */}
            <Typography variant="h6">3 Months Total Payable</Typography>
          </Grid>
          <Grid item xs={4} sx={{ marginTop: "1.5rem", paddingRight: "1rem" }}>
            <Typography variant="h6">Amount</Typography>

            {data?.shopMaintenanceData.map((months, index) => {
              return <Typography>₹ &nbsp;{months?.maintenance}</Typography>;
            })}
            {/* <Typography> ₹ &nbsp;{data?.totalMaintenance}</Typography>
            <Typography> ₹ &nbsp;{data?.totalMaintenance}</Typography> */}
            <Typography variant="h6">
              ₹ &nbsp;{data?.totalMaintenance}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} spacing={2}>
          <Typography variant="h6" paddingTop={2}>
            Note:-
          </Typography>
          <Typography style={{ padding: "0.5rem" }}>
            For any query contact to the mail-id or phone-no mentioned above .
          </Typography>
        </Grid>
      </Grid>
      {/* </PDF> */}
      <Stack mt={2}>
        <Button variant="primary" onClick={generatePDF}>
          Download
        </Button>
      </Stack>

      {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText> */}
      {/* </FormControl> */}
    </Box>
  );
};
export default CreateInvoiceForm;
