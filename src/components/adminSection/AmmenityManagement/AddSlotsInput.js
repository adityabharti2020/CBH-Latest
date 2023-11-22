import * as React from "react";
import Link, { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import Stack from "@mui/material/Stack";

function ProLabel({ children }) {
  return (
    <Stack direction="row" spacing={0.5} component="span">
      <span>{children}</span>
    </Stack>
  );
}

export default function ComponentFamilies() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DateField",
          "TimeField",
          "DateTimeField",
          "MultiInputDateRangeField",
          "MultiInputTimeRangeField",
          "MultiInputDateTimeRangeField",
        ]}
      >
        <DemoItem label="Date">
          <DateField defaultValue={dayjs("2022-04-17")} />
        </DemoItem>
        <DemoItem label="Desktop variant">
          <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
        </DemoItem>
        <DemoItem
          label={<ProLabel>Time Range</ProLabel>}
          component="MultiInputTimeRangeField"
        >
          <MultiInputTimeRangeField
            defaultValue={[
              dayjs("2022-04-17T15:30"),
              dayjs("2022-04-17T18:30"),
            ]}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
