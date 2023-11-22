import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Box, Button } from "@mui/material";
import DropDown from "./DropDown";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#892931",
    // color: theme.palette.common.white,
    color: "#F2F2F2",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ShowUserDetails = ({ data }) => {
  const [userData, setUserData] = React.useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://192.168.29.32:5001/api/v1/admin/get/all/users"
      );
      console.log("User Data=============>", res?.data);
      setUserData(res?.data?.allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2
        style={{ display: "flex", justifyContent: "start", color: "#691F25" }}
      >
        User Details
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ height: "30px" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell align="left">Profile</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Contact-NO</StyledTableCell>
              <StyledTableCell align="left">Shops-Alloted</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((data, index) => (
              <StyledTableRow key={index + 1}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  <Stack
                    direction="row"
                    spacing={2}
                    align="right"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: 20,
                      height: 20,
                    }}
                  >
                    <Avatar alt="images" src={data?.profilePicture} />
                  </Stack>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row" align="left">
                  {data?.firstName + " " + data?.lastName}
                </StyledTableCell>
                <StyledTableCell align="left">{data?.email}</StyledTableCell>
                <StyledTableCell align="left">
                  {data?.contactNo}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <DropDown data={data} />
                </StyledTableCell>
                {/* <Box></Box> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#9F2936" }}
          onClick={() => alert("Maintenance Requests")}
        >
          Maintenance Requests
        </Button>

        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#9F2936" }}
          onClick={() => alert("Booking Requests")}
        >
          Booking Requests
        </Button>
      </Box>
    </>
  );
};

export default ShowUserDetails;
