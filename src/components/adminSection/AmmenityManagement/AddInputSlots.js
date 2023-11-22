import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Button, Grid } from '@mui/material';

const AddInputSlots = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={3}>
                <Grid item>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker
                            label="start time"
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                        />
                    </DemoContainer>
                </Grid>
                <Grid item>
                    <DemoContainer  components={['TimePicker']}>
                        <TimePicker
                            label="end time"
                        size="small"
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                        />

                    </DemoContainer>
                </Grid>
            </Grid>
            <Button type="button" 
            // onClick={handleAddField} 
            style={{ margin: "10px" }}>
                Add Input Field
            </Button>
            <Button
                type="submit"
                // onClick={handleSubmit}
                style={{ margin: "10px", border: "1px solid blue" }}
            >
                Submit
            </Button>
        </LocalizationProvider>
    )
}

export default AddInputSlots
