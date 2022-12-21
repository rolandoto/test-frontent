import React from "react"
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LineProgress =({progress}) =>{

    return (
        <Box sx={{ width: '110%' }}>
            <LinearProgress variant="determinate" color="inherit" value={progress} />
        </Box>
    )
}

export default LineProgress