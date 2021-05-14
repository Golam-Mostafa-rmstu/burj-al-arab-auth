import { Button, FormControlLabel, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { createUserWIthEmaiAndPassword, FirebaseConfig, signInWithEmailAndPassword } from './LoginManager';


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
    FirebaseConfig();
    const [user, setUser] = useState({
        name: '',
        email:'',
        password: '',
        error: '',
        success: false,
    })
    const [newUser, setNewUser] = useState(false);
    const handleFormSubmit = (e) => {
        if(newUser && user.email && user.password){
            createUserWIthEmaiAndPassword(user.name, user.email, user.password)
            .then(res => setUser(res))
            console.log(user);
        }
        if(!newUser && user.name && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => setUser(res))
        }
        e.preventDefault();

    }
    const googleSignIn = (e) => {
        const userNameField = e.target.name;
        let isFormValid = true;
        if(userNameField === 'name'){
            isFormValid = isFormValid && e.target.value;
        }else if(userNameField === 'email'){
            isFormValid = isFormValid && e.target.value;
        }else{
            isFormValid = isFormValid && e.target.value;
        }
        if(isFormValid){
            // console.log(e.target.name, e.target.value);
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    return (
        <div style={{textAlign: 'center', margin: '0 auto', width: '400px', height: '400px'}}>
            <h1>Email and Password Authentication</h1>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <FormControlLabel
                    control={<GreenCheckbox onChange={()=> setNewUser(!newUser)} name="checkedG" />}
                    label="New User"
                /><br></br>
                {newUser && <TextField onBlur={googleSignIn} name="name" type="text" id="standard-basic" label="Your Name" required/>}<br></br>
                <TextField onBlur={googleSignIn} name="email" type="email" id="standard-basic" label="Your Email" required/><br></br>
                <TextField onBlur={googleSignIn} name="password" type="password" id="standard-basic" label="password" required/><br></br>

                <Button type='submit' style={{marginTop: '10px'}} variant="contained">{newUser ? 'Sign Up' : 'Sign In'}</Button>
            </form>
            <p style={{color: 'red'}}>{user.error}</p>
            {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'signed in'} successfully</p>}
        </div>
    );
};

export default Login;