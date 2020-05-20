import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/AutoComplete';
import { withStyles } from '@material-ui/core';

const CssAutoComplete = withStyles({
    inputRoot: {
        color: '#fff',
    },
    popupIndicator: {
        color: '#fff',
    },
    popupIndicatorOpen: {
        color: '#fff',
    },
    clearIndicator: {
        color: '#fff',
    },
})(AutoComplete);

const CssTextField = withStyles({
    root: {
        '& label': {
            color: '#fff',
        },
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#fff',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    },
})(TextField);

export default function ComboBox(props) {
    const { users } = props;
    const [value, setValue] = useState(users[0]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (n) => {
        setValue(n);
        props.handleOnChange(n);
    };

    return (
        <div>
            <CssAutoComplete
                value={value}
                onChange={(e, n) => handleChange(n)}
                inputValue={inputValue}
                onInputChange={(e, n) => setInputValue(n)}
                id='combo-box-demo'
                options={users}
                groupBy={(option) => option.role}
                autoHighlight
                getOptionLabel={(option) =>
                    `${option.given_name} ${option.family_name}`
                }
                style={{ width: 300 }}
                renderInput={(params) => (
                    <CssTextField
                        {...params}
                        label='Search'
                        id='custom-css-outlined-input'
                        variant='outlined'
                    />
                )}
            />
        </div>
    );
}
