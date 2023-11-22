import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddInput from "./AddInput";

const FloorCreation = () => {
  const [tableData, setTableData] = useState([]);
  const addRow = () => {
    // Creating a new row with some dummy data
    const newRow = {
      id: tableData.length + 1,
      name: `Name ${tableData.length + 1}`,
      age: Math.floor(Math.random() * 30) + 18,
    };

    // Updating the state with the new row
    setTableData([...tableData, newRow]);
  };
  return (
    <Container>
      <Stack>
        <Typography variant="h4" color={"#9f2936"} component="h2">
          Create Floor
        </Typography>
      </Stack>
      <Stack>
        <AddInput />
      </Stack>
      {/* <Stack>
        <FloorCreationTable style={{ width: "100%", overflow: "auto" }} />
      </Stack> */}
    </Container>
  );
};

export default FloorCreation;
