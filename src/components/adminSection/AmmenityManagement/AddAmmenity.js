import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AddAmmenityInput from "./AddAmmenityInput";
// import AddAmmenitySlots from "./AddInputSlots ";

const AddAmmenity = () => {
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
    <Container>
      <Box>
        <AddAmmenityInput />
      </Box>
    </Container>
  );
};

export default AddAmmenity;
