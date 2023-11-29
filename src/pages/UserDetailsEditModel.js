import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import axios from "axios";
import { isLoading, openSnackbar } from "../redux/action/defaultActions";
import RemoveShops from "./RemoveShops";
import AddUpdateshops from "./AddUpdateshops";

const UserDetailsEditModel = ({
  open,
  handleClose,
  data,
  updatedata,
  handleAction,
  setUpdatedData,
  userId,
  getAllusers,
}) => {
  // console.log(data);
  // console.log(data?.shopsAlloted);
  const [Defaultdata, setDefaultdata] = useState({
    defaultValue: [],
  });
  const [formDetail, setFormDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    contactNo: "",
    shopId: [],
  });
  const [shopDetails, setShopDetails] = useState([]);

  // console.log(Defaultdata.defaultValue);
  const dispatch = useDispatch();
  useEffect(() => {
    // Assuming data is fetched asynchronously, update the state once data is available
    if (data?.shopsAlloted) {
      const updatedDefaultValue = data?.shopsAlloted?.map((shop) => ({
        id: shop._id,
        label:
          shop?.floor?.floor === undefined || shop?.shopNo === undefined
            ? "No floor & Shop"
            : `Floor${shop?.floor?.floor} Shop${shop?.shopNo}`,
      }));

      setDefaultdata({ defaultValue: updatedDefaultValue });
    }
  }, [data]);
  const updateSubmitHandler = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedata,
      [name]: value,
    });
  };

  // const handleAutocompleteChange = (event, newValues) => {
  //   console.log(newValues);
  //   const newid = newValues.map((value) => value.id);
  //   setUpdatedData({ ...updatedata, shops: newid });
  //   // console.log(newid);
  //   // const  newlabel = newValues.map((value)=> value.label);
  //   // setSelectedValues([...newlabel])
  // };
  // console.log(updatedata?.shops[updatedata?.shops.length - 1]);
  // const shopOptions = shop?.map((option) => ({
  //   id: option._id,
  //   label:
  //     option?.floor?.floor === undefined || option?.shopNo === undefined
  //       ? "No floor & Shop"
  //       : `Floor${option?.floor?.floor} Shop${option?.shopNo}`,
  // }));
  // const filteredItems = shopOptions.filter(
  //   (item) => !updatedata?.shops.includes(item.id)
  // );
  // const defaultValue = data?.shopsAlloted?.map((shop) => ({
  //   id: shop._id,
  //   label:
  //     shop?.floor?.floor === undefined || shop?.shopNo === undefined
  //       ? "No floor & Shop"
  //       : `Floor${shop?.floor?.floor} Shop${shop?.shopNo}`,
  // }));
  const defaultShopId = Defaultdata?.defaultValue?.map((value) => value.id);
  // console.log(defaultShopId);
  // const defaultValue = data?.shopsAlloted?.map((shop) => {
  //  return console.log(shop);
  //   id:shop
  //  label: shop?.floor?.floor === undefined || shop?.shopNo === undefined
  //   ? "No floor & Shop"
  //   : `Floor${shop?.floor?.floor} Shop${shop?.shopNo}`

  // })
  useEffect(() => {
    setUpdatedData({
      contactNo: data?.contactNo,
      email: data?.email,
      shops: defaultShopId,
    });
  }, [data]);
  // console.log(userId);

  // const handledelete = async (Id) => {
  //   dispatch(isLoading(true));
  //   const updatedState = {
  //     defaultValue: Defaultdata.defaultValue.filter((item) => item.id !== Id),
  //   };
  //   setDefaultdata(updatedState);

  //   try {
  //     const response = await axios.put(
  //       `/api/v1/admin/delete/user/alloted/shop/${userId}/${Id}`
  //     );

  //     getAllusers();

  //     // if(response?.data?.success === true){
  //     //   const updatedState = {
  //     //     defaultValue: Defaultdata?.defaultValue.filter(item => item.id !== Id),
  //     //   };
  //     //   setDefaultdata(updatedState);
  //     // }
  //     dispatch(openSnackbar("deleted", "success"));
  //     dispatch(isLoading(false));
  //   } catch (error) {
  //     console.log(error);
  //     console.log("Api Running");
  //     dispatch(openSnackbar("something went wrong", "error"));
  //     dispatch(isLoading(false));
  //   }
  //   // console.log(label)
  // };
  const shopOptions = shopDetails?.map((option) => ({
    id: option._id,
    label: `Shop No.${option?.shopNo}`,
  }));
  const handleAutocompleteChange = (event, newValues) => {
    const newid = newValues.map((value) => value.id);
    setUpdatedData({ ...updatedata, shops: newid });
  };
  // console.log(formDetail.shopId);
  const oldshops = data?.shopsAlloted?.map((oldshop) => ({
    id: oldshop._id,
    label: `Shop No.${oldshop?.shopNo}`,
  }));

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          px: 4,
          borderRadius: "10px",
        }}
      >
        <Stack>
          <Typography variant="h5" color={"#9f2936"}>
            Update User Details
          </Typography>
        </Stack>
        <form onSubmit={updateSubmitHandler}>
          <Stack mt={2} spacing={2}>
            <TextField
              id="outlined-disabled"
              label="Name"
              defaultValue={`${data?.firstName} ${data?.lastName}`}
              // value={updatedata.}
              type="string"
              name="firstName"
              fullWidth
              disabled
              size="small"
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="outlined-required"
              defaultValue={data?.contactNo}
              value={updatedata?.contactNo}
              name="contactNo"
              size="small"
              fullWidth
              type="number"
              label="Contact Number"
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="outlined-required"
              defaultValue={data?.email}
              value={updatedata?.email}
              name="email"
              size="small"
              fullWidth
              type="string"
              label="Email"
              onChange={(e) => handleInputChange(e)}
            />
            {/* <Stack sx={{display:"flex",flexDirection:"row",mr:"2px",flexWrap:'wrap'}}>
                 {defaultValue?.map((shop) => {
                  return <Chip
                  variant="outlined"
                  label={shop}
                />
                 })}
            </Stack> */}
            <Stack spacing={3}>
              {/* <Autocomplete
                multiple
                id="tags-filled"
                options={filteredItems}
                // defaultValue={Defaultdata.defaultValue}
                onChange={handleAutocompleteChange}
                renderTags={(value, getTagProps) =>
                  value?.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.label}
                      // onDelete={() => handledelete(option.id)}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Floor & Shops"
                    // defaultValue={data.shopsAlloted}
                    size="small"
                    placeholder="Shops"
                  />
                )}
              /> */}
              <AddUpdateshops
                formDetail={formDetail}
                setFormDetail={setFormDetail}
                shopDetails={shopDetails}
                setShopDetails={setShopDetails}
              />
            </Stack>
            <Stack spacing={3}>
              <Autocomplete
                multiple
                required
                id="tags-filled"
                options={shopOptions}
                defaultValue={oldshops}
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
                    label="Shops"
                    size="small"
                    placeholder="Shops"
                  />
                )}
              />
            </Stack>
            {/* <Stack spacing={3}>
            <Autocomplete
                  multiple
                  required
                  id="tags-filled"
                  options={oldshops}
                  // onChange={handleAutocompleteChange}
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
                      label="Shops"
                      size="small"
                      placeholder="Shops"
                    />
                  )}
                />

            </Stack> */}
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              onClick={handleAction}
              sx={{
                mt: 2,
                marginRight: "1rem",
                backgroundColor: " #9F2936",
                color: "white",
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              // color="secondary"
              // onClick={handleClose}
              sx={{
                mt: 2,
                marginRight: "2rem",
                backgroundColor: " #9F2936",
                color: "white",
              }}
            >
              <RemoveShops userId={userId} />
            </Button>
            <Button
              variant="contained"
              // color="warning"
              onClick={handleClose}
              sx={{
                mt: 2,
                marginRight: "1rem",
                backgroundColor: " #9F2936",
                color: "white",
              }}
            >
              Close
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UserDetailsEditModel;
