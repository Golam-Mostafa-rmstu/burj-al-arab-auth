import { Button, FormControlLabel, FormGroup, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    return (
        <div style={{textAlign: 'center', margin: '0 auto', width: '400px', height: '400px'}}>
            <h1>Our Email and Password Authentication</h1>
            <FormGroup noValidate autoComplete="off">
                <FormControlLabel
                    control={<GreenCheckbox onChange={()=> setNewUser(!newUser)} name="checkedG" />}
                    label="New User"
                />
                {newUser && <TextField type="text" id="standard-basic" label="Your Name" required/>}
                <TextField type="email" id="standard-basic" label="Your Email" required/>
                <TextField type="password" id="standard-basic" label="password" required/>
                <Button style={{marginTop: '10px'}} variant="contained">{newUser ? 'Sign Up' : 'Sign In'}</Button>
            </FormGroup>
        </div>
    );
};

export default Login;