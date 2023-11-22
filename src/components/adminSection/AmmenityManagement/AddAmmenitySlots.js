import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import AddSlotsInput from "./AddSlotsInput";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, DesktopTimePicker, TimePicker } from "@mui/lab";
import dayjs from "dayjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import Iconify from "../../iconify/Iconify";
import ComponentFamilies from "./AddSlotsInput";
import AddInputSlots from "./AddInputSlots";
// import { useEffect, useState } from "react";
// import AddInput from "./AddInput";

const AddAmmenitySlots = () => {
  // const [tableData, setTableData] = useState([]);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("===", timezone);
  const { ammenityId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  console.log(currentDate);
  const [slotsTime, setSlotsTime] = useState([]);
  const [selectDate, setSelectDate] = useState("");

  const handleChange = (e, index) => {
    const updatedArray = slotsTime?.map((item, index1) => {
      if (index === index1) {
        if (e.target.name === "startTime") {
          return { ...item, startTime: e.target.value };
        }
        return { ...item, endTime: e.target.value };
      }
      return item;
    });
    setSlotsTime(updatedArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    try {
      const tempTimeSlots = slotsTime.map((time) => {
        return {
          // new Date(`${selectDate}T${time?.startTime}`)
          startTime: new Date(`${selectDate}T${time?.startTime}`).toISOString(),
          endTime: new Date(`${selectDate}T${time?.endTime}`).toISOString(),
        };
      });
      const res = await axios.post(`/api/v1/admin/add/slots`, {
        date: dayjs(`${selectDate}T00:00`).locale(timezone),
        ammenityId,
        timeSlots: [...tempTimeSlots],
      });
      console.log("res==>", res);
      dispatch(openSnackbar("saved", "success"));
      dispatch(isLoading(false));
      console.log("submitted");
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(openSnackbar("something went wrong", "error"));
      console.log("error=>", error);
    }
  };

  const handleAddField = () => {
    setSlotsTime([...slotsTime, { startTime: "", endTime: "" }]);
  };

  const handleRemove = (index) => {
    const temp = [...slotsTime];
    temp.splice(index, 1);
    setSlotsTime([...temp]);
  };

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography color="#9f2936" variant="h4" component="h2">
          Create Slots For Conference Room
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
      <Stack component={"form"} onSubmit={handleSubmit}>
        <Stack
          mt={1}
          alignItems={"start"}
          minWidth={"200px"}
          justifyContent={"start"}
        >
          <Box component={"label"} color={"#9f2936"} fontWeight={"bold"}>
            Select Date
          </Box>
          <Box
            component={"input"}
            type="date"
            required
            min={`${currentDate}`}
            value={selectDate}
            disabled={selectDate !== ""}
            onChange={(e) => setSelectDate(e.target.value)}
            sx={{
              p: 1,
              border: "2px solid  #9f2936",
              borderRadius: "5px",
              "& input fieldset": {
                color: "#9f2936",
                display: "none",
                // #9f2936
              },
              "&:focus": { border: "2px solid  #9f2936" },
              outline: "none",
            }}
          />
          {selectDate !== "" ? (
            <Button
              mt={1}
              variant="text"
              color="warning"
              onClick={() => {
                setSelectDate("");
                setSlotsTime([]);
              }}
            >
              reset date
            </Button>
          ) : (
            ""
          )}
        </Stack>

        <Grid container rowGap={2} mt={2} columnGap={1}>
          {slotsTime?.map((slot, index) => {
            return (
              <Grid
                key={index}
                container
                component={Paper}
                rowGap={1}
                columnGap={1}
                border={"0.5px solid #9f2936"}
                item
                xs={12}
                sm={5.75}
                md={3.75}
                p={0.5}
                pt={3}
                display={"flex"}
                justifyContent={"space-between"}
                position={"relative"}
              >
                <Grid item xs={12} md={5.75}>
                  {" "}
                  <TextField
                    label="start time"
                    type="time"
                    size="small"
                    required
                    name="startTime"
                    fullWidth
                    focused
                    value={slotsTime[index]?.startTime}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>
                <Grid item xs={12} md={5.75}>
                  <TextField
                    label="End time"
                    name="endtTime"
                    type="time"
                    size="small"
                    required
                    fullWidth
                    focused
                    value={slotsTime[index]?.endTime}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: "25%",
                    right: "25%",
                  }}
                >
                  <Chip
                    size="small"
                    variant="outlined"
                    label={`Slot No - ${index + 1}`}
                    sx={{
                      background: "#9f2936",
                      color: "white",
                      width: "100px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: -14,
                    right: -8,
                  }}
                >
                  <IconButton
                    onClick={() => handleRemove(index)}
                    sx={{
                      color: "#9f2936",
                      bgcolor: "rgba(233,206,198,1)",
                      height: "30px",
                      width: "30px",
                    }}
                  >
                    <Iconify icon="radix-icons:cross-2" />
                  </IconButton>
                </Box>
              </Grid>
            );
          })}

          {selectDate !== "" ? (
            <Grid xs={12} item>
              <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={"start"}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddField}
                >
                  add slots
                </Button>
              </Stack>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        {selectDate !== "" && slotsTime?.length > 0 ? (
          <Stack
            mt={2}
            direction={"row"}
            spacing={1}
            alignItems={"start"}
            justifyContent={"start"}
          >
            <Button variant="contained" size="small" type="submit">
              Submit slots
            </Button>
            {/* <Button
              variant="contained"
              size="small"
              color="warning"
              sx={{ color: "white" }}
              type="reset"
            >
              reset
            </Button> */}
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Container>
  );
};

export default AddAmmenitySlots;
