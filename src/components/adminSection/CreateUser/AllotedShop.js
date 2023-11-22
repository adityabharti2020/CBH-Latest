import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState } from "react";

const AllotedShop = ({ shopDetails, settingShopArray, pullingShopId }) => {
  const fixedOptions = [shopDetails];
  const [value, setValue] = useState([]);

  return (
    <Autocomplete
      multiple
      size="small"
      // id="fixed-tags-demo"
      value={value}
      options={shopDetails}
      onChange={(event, newValue) => {
        const chekLen = newValue.length - 1;
        if (chekLen > 0) settingShopArray(newValue[chekLen]._id);
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }}
     
      getOptionLabel={(option) => `${option?.shopNo}`}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          console.log("==>", option);
          if (index) {
            return (
              <Chip
                key={index}
                label={option?.shopNo}
                {...getTagProps({ index })}
                disabled={fixedOptions.indexOf(option) !== -1}
              />
            );
          }
          return null;
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="shop No"
          size="small"
          // required
          placeholder="select shop"
          
        />
      )}
    />
  );
};

export default AllotedShop;
