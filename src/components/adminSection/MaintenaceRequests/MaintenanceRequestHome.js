import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import { useNavigate } from "react-router-dom";
import MaintenaceRequests from "./MaintenaceRequests";

const MaintenanceRequestHome = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color="#9f2936" variant="h4" component="h2">
            Maintenace Requests
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
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Pending" {...a11yProps(1)} />
                <Tab label="Accepted" {...a11yProps(1)} />
                <Tab label="Rejected" {...a11yProps(2)} />
                <Tab label="Resolved /Closed" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <div
              role="tabpanel"
              hidden={value !== 0}
              id={`simple-tabpanel-${0}`}
              aria-labelledby={`simple-tab-${0}`}
            >
              {value === 0 && (
                <Box sx={{ p: 3 }}>
                  <MaintenaceRequests
                    title={"All Requests"}
                    type={"all"}
                    getUrl={"/api/v1/admin/get/all/maintenance/requests"}
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
                <Box sx={{ p: 3 }}>
                  <MaintenaceRequests
                    title={"Pending"}
                    type={"pending"}
                    getUrl={
                      "/api/v1/Maintenance/get/requests/as/per/status/pending"
                    }
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
                  <MaintenaceRequests
                    title={"accepted"}
                    type={"accepted"}
                    getUrl={
                      "/api/v1/Maintenance/get/requests/as/per/status/accepted"
                    }
                  />
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={value !== 3}
              id={`simple-tabpanel-${3}`}
              aria-labelledby={`simple-tab-${3}`}
            >
              {value === 3 && (
                <Box sx={{ p: 3 }}>
                  <MaintenaceRequests
                    title={"rejected"}
                    type={"rejected"}
                    getUrl={
                      "/api/v1/Maintenance/get/requests/as/per/status/rejected"
                    }
                  />
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={value !== 4}
              id={`simple-tabpanel-${4}`}
              aria-labelledby={`simple-tab-${4}`}
            >
              {value === 4 && (
                <Box sx={{ p: 3 }}>
                  <MaintenaceRequests
                    title={"resolved"}
                    type={"resolved"}
                    getUrl={
                      "/api/v1/Maintenance/get/requests/as/per/status/resolved"
                    }
                  />
                </Box>
              )}
            </div>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default MaintenanceRequestHome;
