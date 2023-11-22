import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import AddInputRow from "./AddInputRow";

const ShopCreate = () => {
  return (
    <Box>
      <Stack>
        <Grid container spacing={3}>
          <Grid
            item
            style={{ margin: "0.8rem", color: "#9f2936", width: "100%" }}
          >
            <Typography variant="h4" component="h2">
              Create Shop
            </Typography>

            <AddInputRow />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ShopCreate;
