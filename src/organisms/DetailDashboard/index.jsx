import React from "react"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import moment from "moment";

const DetailDasboard =(props) =>{

    const  {DetailDashboard} = props

    const [values, setValues] = React.useState({
        Nombre: '',
        Apellido: '',
        Ciudad: '',
        Celular: '',
        Num_documento: "",
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

     
      
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:"center",width:"50%",margin:"auto"}} >
            {DetailDashboard.map(index => {

               let fecha_Nacimiento =  moment.utc(index.Fecha_nacimiento).format('MM/DD/YY');
               
                return   <>
                <TextField
                    id="outlined-start-adornment"
                    label="Nombre"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Nombre}
                    onChange={handleChange('Nombre')}
              />  
                <TextField
                    id="outlined-start-adornment"
                    label="Apellido"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Apellido}
                    onChange={handleChange('Apellido')}
              />  
                <TextField
                    id="outlined-start-adornment"
                    label="Ciudad"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Ciudad}
                    onChange={handleChange('Ciudad')}
              />  
                <TextField
                    id="outlined-start-adornment"
                    label="Celular"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Celular}
                    onChange={handleChange('Celular')}
              />  
                <TextField
                    id="outlined-start-adornment"
                    label="Numero de documento"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Num_documento}
                    onChange={handleChange('Num_documento')}
              />   

                <TextField
                    id="outlined-start-adornment"
                    label="Cantidad de Infantes"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Infantes}
                    onChange={handleChange('Num_documento')}
                    />   

                <TextField
                    id="outlined-start-adornment"
                    label="Cantidad de Niños"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Ninos}
                    onChange={handleChange('Num_documento')}
              />  

              <TextField
                    id="outlined-start-adornment"
                    label="Noches"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Noches}
                    onChange={handleChange('Num_documento')}
              />   
                <TextField
                    id="outlined-start-adornment"
                    label="Cantidad de adultos"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Adultos}
                    onChange={handleChange('Num_documento')}
              />   
              <TextField
                    id="outlined-start-adornment"
                    label="Canalesd de Reservas"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Canales_Nombre}
                    onChange={handleChange('Num_documento')}
              />  
               <TextField
                    id="outlined-start-adornment"
                    label="Numero o Nombre de habitaciones"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={index.Numero}
                    onChange={handleChange('Num_documento')}
              />   
                </>
            })}
      </Box>
    )

}
export default DetailDasboard