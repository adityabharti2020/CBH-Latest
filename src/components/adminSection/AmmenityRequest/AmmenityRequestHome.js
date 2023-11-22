import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useNavigate } from "react-router-dom";
import ConfirmRequested from "./ConfirmRequested";
import RejectRequest from "./RejectRequest";
import ResolvedRequest from "./ResolvedRequest";
import BookingRequestHome from "./BookingRequestHome";

const AmmenityRequestHome = () => {
  const navigate = useNavigate();

  const [filterVal, setFilterVal] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [cardData, setCardData] = useState();
  const [searchValue, setSearchValue] = useState("");

  // ********************* Filter Section Function Call  ******************************

  const handleChangeFilter = (event) => {
    setFilterVal(event.target.value);
    switch (event.target.value) {
      case "A":
        sortAtoZ();
        break;
      case "Z":
        sortZtoA();
        break;
      case "Date":
        sortByDate();
        break;
      default:
        // setSearchValue(event.target.value);
        break;
    }
  };
  // ************************************************************************************

  // **************************Sorting Function cAll   A TO Z*****************************

  const sortAtoZ = () => {
    cardData.sort((a, b) => {
      const problemTypeA =
        a?.user?.firstName.toUpperCase() || a?.user?.lastName.toUpperCase(); // Ignore case while sorting
      const problemTypeB =
        b?.user?.firstName.toUpperCase() || b?.user?.lastName.toUpperCase();
      if (problemTypeA < problemTypeB) {
        return -1;
      }

      if (problemTypeA > problemTypeB) {
        return 1;
      }
      return 0; // Problem types are equal);
    });
  };
  // ****************************************************************************

  // **************************Sorting Function cAll  Z TO A*****************************
  const sortZtoA = () => {
    cardData.sort((a, b) => {
      const problemTypeA =
        a?.user?.firstName.toUpperCase() || a?.user?.lastName.toUpperCase(); // Ignore case while sorting
      const problemTypeB =
        b?.user?.firstName.toUpperCase() || b?.user?.lastName.toUpperCase();
      if (problemTypeA > problemTypeB) {
        return -1;
      }
      if (problemTypeA < problemTypeB) {
        return 1;
      }
      return 0; // Problem types are equal);
    });
  };
  // ****************************************************************************

  // **************************Sorting Function cAll by DATE*****************************

  const sortByDate = () => {
    cardData.sort((a, b) => {
      const problemTypeA = new Date(a.createdAt).getTime(); // Ignore case while sorting
      const problemTypeB = new Date(b.createdAt).getTime();
      if (problemTypeA > problemTypeB) {
        return -1;
      }
      if (problemTypeA < problemTypeB) {
        return 1;
      }
      return 0; // Problem types are equal);
    });
  };
  // ****************************************************************************

  // ***************************Seacrch Function Call****************************

  const filteredData = searchValue
    ? cardData?.filter((data) => {
        return (
          data?.user?.firstName?.toLowerCase().includes(searchValue) ||
          data?.user?.lastName?.toLowerCase().includes(searchValue) ||
          data.Amenity?.amenityName?.toLowerCase().includes(searchValue)
        );
      })
    : cardData;

  // ***************************************************************************

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  console.log("mstPAarent=====>", value, cardData);

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography color="#9f2936" variant="h4" component="h2">
          Booking Requests
        </Typography>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ cursor: "pointer", "&>hover": { color: "red" } }}
          mb={1}
          onClick={() => navigate(-1)}
        >
          <KeyboardBackspaceIcon />{" "}
          <Typography variant="body2" component={"span"}>
            Back
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Accepted" {...a11yProps(1)} />
              <Tab label="Rejected" {...a11yProps(2)} />
              <Tab label="Past Bookings" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <Stack>
            <Grid
              TableContainer
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid style={{ minWidth: "20%", padding: "0.5rem" }}>
                <FormControl size="small" fullWidth p={1}>
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterVal}
                    label="Filter"
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value={"A"}>A to Z</MenuItem>
                    {/* <MenuItem value={"electrical"}>Electrical</MenuItem> */}
                    <MenuItem value={"Z"}>Z to A</MenuItem>
                    <MenuItem value={"Date"}>By Date</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid style={{ width: "60%", padding: "0.5rem" }}>
                <TextField
                  fullWidth
                  size={"small"}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Stack>

          <div
            role="tabpanel"
            hidden={value !== 0}
            id={`simple-tabpanel-${0}`}
            aria-labelledby={`simple-tab-${0}`}
          >
            {value === 0 && (
              <Box sx={{ p: 2, pt: 3 }}>
                {/* /api/v1/admin/get/all/maintenance/requests */}
                <BookingRequestHome
                  title={"Pending Requests"}
                  type={"new"}
                  setCardData={setCardData}
                />
              </Box>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={value !== 1}
            id={`simple-tabpanel-${1}`}
            aria-labelledby={`simple-tab-${1}`}
          >
            {value === 1 && (
              <Box sx={{ p: 2 }}>
                <ConfirmRequested
                  title={"Confirm Requests"}
                  type={"new"}
                  setCardData={setCardData}
                />
              </Box>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={value !== 2}
            id={`simple-tabpanel-${2}`}
            aria-labelledby={`simple-tab-${2}`}
          >
            {value === 2 && (
              <Box sx={{ p: 3 }}>
                <RejectRequest
                  title={"Reject Requests"}
                  type={"new"}
                  setCardData={setCardData}
                />
              </Box>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={value !== 3}
            id={`simple-tabpanel-${2}`}
            aria-labelledby={`simple-tab-${2}`}
          >
            {value === 3 && (
              <Box sx={{ p: 3 }}>
                <ResolvedRequest
                  title={"Reject Requests"}
                  type={"new"}
                  setCardData={setCardData}
                />
              </Box>
            )}
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default AmmenityRequestHome;
