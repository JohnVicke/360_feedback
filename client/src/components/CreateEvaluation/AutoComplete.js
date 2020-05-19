import React from 'react';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/AutoComplete';

const ComboBox = (props) => {
    return (
        <AutoComplete
            id='combo-box-demo'
            options={props.users}
            getOptionLabel={(option) =>
                `${option.given_name} ${option.family_name}`
            }
            style={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label='combo box' variant='outlined' />
            )}
        />
    );
};

export default ComboBox;
