import React from "react"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const LoadingDetail =(props) =>{

    const {loading,error,title,titleLoading} = props

    return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                {error && <Alert severity="error">{title}</Alert>}
                {loading &&<Alert severity="success">{titleLoading}</Alert>}
            </Stack>
    )
}

export default LoadingDetail