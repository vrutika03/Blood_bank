import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { apiurl } from '../Components/api';
import axios from 'axios';

const Confirmation = () =>{
  
  const [confirmation, setConfirmation] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false);
  const location = useLocation();
  const email = location.state?.email; 
  console.log(email)
  
  const confirmationError = confirmation === ''&& formSubmitted;
  const navigate = useNavigate();
  const error = null;

 const HandleSubmit =  async (e) =>{
  e.preventDefault();
  if (confirmation === ''  ) {
    setFormSubmitted(true);
  }

  
  let data = JSON.stringify({
     email,
     confirmation,
     action: 'confirm'
      });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: apiurl + 'cloudauth', 
    
  data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    navigate('/');
  })
  .catch((error) => {
    console.log(error);
  });


  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  
  // var raw = JSON.stringify({
  //   email,
  //   confirmation,
  //   action: 'confirm'
  // });
  
  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };
  
  // fetch(apiurl + 'cloudauth', { mode: 'no-cors'}, requestOptions)
  //   .then(response => response.text())
  //   .then(result => navigate('/', { state: { email } }))
   
  //   .catch(error => console.log('error', error));

  // const response = await fetch(apiurl + 'cloudauth', { mode: 'no-cors'}, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email,
  //     confirmation,
  //     action: 'confirm'
  //   })
  // });

  // if (response.ok) {
  //   navigate('/');
  // } else {
  //   console.log(error)
  // }
 }

  return (
    <div className="App" >
      <header className="App-header">
        <form > 
        <Grid container alignItems="center"  direction="column">
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '25ch' },
        display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
      }}
      noValidate
      autoComplete="off"
    >
            <Grid item>
            <TextField
              id="outlined-multiline"
              label="Confirmation Code"
              type="password"
              value={confirmation}
              error={confirmationError}
              onChange={(e) => setConfirmation(e.target.value)}
              helperText={confirmationError ? 'This field is required' : ''}
            />  
          </Grid>
          <Grid item >
          <Button type="submit" onClick={HandleSubmit}>Submit</Button>
          </Grid>
          </Box>
        </Grid>
        </form>
      </header>
    </div>
  );
}

export default Confirmation;
