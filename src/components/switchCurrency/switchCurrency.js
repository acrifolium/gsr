import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const  SwitchCurrency = (props) => {
    const classes = useStyles();

    const handleSelect = (e) => {
        props.onSelect(e);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="currency-select-outlined-label">currency</InputLabel>
            <Select
                labelId="currency-select-outlined-label"
                id="currency-select-outlined"
                value={props.pair}
                onChange={handleSelect}
                label="currency"
            >
            {props.currencies.map((currency, idx) => {
                return (
                <MenuItem key={idx} value={currency.id}>
                    {currency.display_name}
                </MenuItem>
                );
            })}
            </Select>
        </FormControl>
    );
}

export default SwitchCurrency;
