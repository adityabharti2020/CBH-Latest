import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useDispatch } from "react-redux";
import axios from "axios";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const Tags = ({ formDetail, setFormDetails }) => {
  const [shop, setShop] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [activeFloor, setactiveFloor] = useState([]);

  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  // console.log(selectedValues)
  const shopDetails = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get("/api/v1/admin/get/all/shops");
      console.log(response?.data?.allAvailableShops)
      setShop(response?.data?.allAvailableShops);
      // console.log(response?.data.allAvailableShops)
      //   response?.data.allAvailableShops.map((shops) => {
      //     return setShop(shops)
      //   })
      dispatch(isLoading(false));
    } catch (error) {
      // console.log("error");
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  useEffect(() => {
    shopDetails();
  }, []);
  useEffect(() => {
    if (shop) {
      // console.log(shop);
    }
  });
  // console.log(selectedIds)
  const handleAutocompleteChange = (event, newValues) => {
    const newid = newValues.map((value) => value.id);
    setFormDetails({ ...formDetail, shopId: newid });
    // console.log(newid);
    const newlabel = newValues.map((value) => value.label);
    // setSelectedValues([...newlabel])
    console.log(newlabel);
    const selectedShops = shop?.map((data) => {
      return data?.floor?.floor;
    });
    const filterdShopToSelect = selectedShops.filter(
      (label) => label !== undefined && label !== null
    );
    console.log(filterdShopToSelect);
  };
  // Shop options && filteredShop option && filteredShopOptionId
  const shopOptions = shop?.map((option) => ({
    id: option._id,
    label: `${option?.floor?.floor}`,
  }));
  console.log(shopOptions?.id);
  const filterShopOptions = shopOptions.filter(
    (label) => label?.label !== 'undefined' && label?.label !== null
  );
  console.log(filterShopOptions);
  const filteredShopOptionId = shopOptions.filter(
    (item) => !formDetail?.shopId.includes(item.id)
  );
  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={filteredShopOptionId}
        onChange={handleAutocompleteChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.label}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Floors"
            size="small"
            placeholder="Floors"
          />
        )}
      />
    </Stack>
  );
};
export default Tags;
