import React,{useState} from 'react'
import {
    Box,
    Container,
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography,
  } from "@mui/material";
import AddWellnessInput from './AddWellnessInput'

const AddWellnessBoard = () => {
    const [value, setValue] = useState(0);

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
        <Container>
          <Stack>
            <Grid container spacing={3}>
              <Grid item style={{ marginTop: "0.8rem", color: "#9f2936" }}>
                <Typography variant="h4" component="h2">
                  Wellness Board Management
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <Stack>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Create Wellness Board" {...a11yProps(0)} />
                  {/* <Tab label="Create Ammenity Slot" {...a11yProps(1)} /> */}
                </Tabs>
              </Box>
              <div
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-0`}
                aria-labelledby={`simple-tab-0`}
              >
                {value === 0 && (
                  <Box sx={{ p: 3 }}>
                    <AddWellnessInput />
                  </Box>
                )}
              </div>
              {/* <div
                role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-1`}
                aria-labelledby={`simple-tab-1`}
              >
                {value === 1 && (
                  <Box sx={{ p: 3 }}>
                    <AddAmmenitySlots />
                  </Box>
                )}
              </div> */}
            </Box>
          </Stack>
        </Container>
      );
}

export default AddWellnessBoard