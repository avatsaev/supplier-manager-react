import React from 'react';
import TextField from '@material-ui/core/TextField';

export interface OwnProps {
    data?: string;
    changeHandler?: (q?: string | undefined) => void;
}

export const FilterField: React.FC<OwnProps> = ({data: query, changeHandler}) => {

    return (
        <TextField
            fullWidth
            label="Filter..."
            value={query ? query : ''}
            onChange={ e => changeHandler ? changeHandler(e.target.value) : null}
            margin="normal"
            variant="outlined"
        />
    );

};
