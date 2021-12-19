import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

export default function SelectComp(props) {
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        props.setOption(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <FormControl size='small'>
                <InputLabel id="demo-controlled-open-select-label">{props.mainLabel}</InputLabel>
                <Select sx={{minWidth: 120, color: props.color}}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={props.option}
                    onChange={(event) => handleChange(event)}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.options.map((option, index) => (
                        <MenuItem key ={'Sel ' + index} id = {option + index} value = {option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}