import * as React from "react";
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({ data }) => {
  const [shop, setShop] = React.useState("");

  const handleChange = (event) => {
    setShop(event.target.value);
  };

  return (
    <Box width={"100%"}>
      <FormControl sx={{ minWidth: "120px", width: "100%" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          value={shop}
          onChange={handleChange}
          fullWidth
        >
          {/* <MenuItem value="--">--select--</MenuItem> */}
          {data?.shopsAlloted.map((item, i) => {
            return (
              <MenuItem key={i} value={item}>
                Floor:{item?.floor?.floor} Shop-No:{item?.shopNo}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
