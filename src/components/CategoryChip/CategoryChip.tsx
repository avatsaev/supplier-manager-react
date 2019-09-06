import React from 'react'
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

export interface OwnProps {
    data?: string | null
}

export const CategoryChip: React.FC<OwnProps> = ({data: category}) => {
    return (
        category ?
            <Box display="inline" mr="5px">
                <Chip  size="small" label={category} color="primary"/>
            </Box>  : null
    )
};

