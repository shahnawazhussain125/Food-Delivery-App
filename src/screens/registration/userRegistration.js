import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, TextField, MenuItem, Button } from '@material-ui/core';
import { country_list } from '../../assests/static/contriesList';
import { userRegistration } from '../../redux/actions/authAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme =>({
    root: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    paper: {
      width: 800,
      marginTop: 50,
      padding: 10
      
    },
    title: {
      flexGrow: 1,
    },
    button: {
      marginTop: "20px",
      color: 'red'
    }
  }));


function UserRegistration(props){
  const classes = useStyles();
  return(
      <RegistrationForm classes = {classes} {...props}/>
  )
}

class RegistrationForm extends Component
{
  constructor()
  {
    super();
    this.state = {
      fullName: "",
      email: "",
      gender: "",
      age: "",
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
      signUpError: ""
    }
  }

  componentDidMount(){
    const { userData, history} = this.props;
    if(userData)
    {
      history.push(`/${userData.userType}`)
    }

  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.signUpError)
    {
      this.props.history.push(`/${nextProps.userData.userType}`);
    }
    else
    {
      this.setState({signUpError: nextProps.signUpError})
    }
  }

  handleSubmit = () =>{
    const { fullName, email, gender, age, country, city, password, confirmPassword} = this.state;
    if(password === confirmPassword)
    {
      this.props.userRegistration({fullName, email, gender, age, country, city, password});
    }
  }

  handleChange = name => event =>{
    this.setState({[name]: event.target.value});
  }

  render(){

    const { classes }  = this.props;
    const { fullName, email, gender, age, country, city, password, confirmPassword , signUpError } = this.state;
    return(
      <Grid container className={classes.root}>
          <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <p style={{color: "red"}}>{signUpError}</p>
              <TextField
                id="outlined-name"
                label="Full Name"
                className={classes.textField}
                value={fullName}
                fullWidth
                onChange={this.handleChange('fullName')}
                margin="normal"
                variant="outlined"
              />
               <TextField
                id="outlined-email"
                label="Email"
                type="email"
                fullWidth
                className={classes.textField}
                value={email}
                onChange={this.handleChange('email')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-gender"
                select
                fullWidth
                label="Gender"
                className={classes.textField}
                value={gender}
                onChange={this.handleChange('gender')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                {["Male", "Female"].map(value => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>              
               <TextField
                  id="outlined-age"
                  label="Age"
                  fullWidth
                  value={age}
                  onChange={this.handleChange('age')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="outlined-country"
                  select
                  fullWidth
                  label="Country"
                  className={classes.textField}
                  value={country}
                  onChange={this.handleChange('country')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  {Object.keys(country_list).map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField> 

                <TextField
                  id="outlined-city"
                  select
                  fullWidth
                  label="City"
                  className={classes.textField}
                  value={city}
                  onChange={this.handleChange('city')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  { country && country_list[country].map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField> 

                <TextField
                  id="outlined-password"
                  label="Password"
                  fullWidth
                  type="password"
                  className={classes.textField}
                  value={password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-confirmPassword"
                  label="Confirm Password"
                  fullWidth
                  type="password"
                  className={classes.textField}
                  value={confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  margin="normal"
                  variant="outlined"
                />
                 
                <p><Link to = "/signin" >Already have an account?</Link></p>

                <Button 
                  variant="contained"  
                  color="primary" 
                  className={classes.button}
                  fullWidth
                  onClick={this.handleSubmit}
                >
                  Register
                </Button>
            </form>
          </Paper>
      </Grid>
    )
  }
}

const mapStateToProps = (state) =>{
  return({
    signUpError: state.authReducer.signUpError,
    userData: state.authReducer.userData
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    userRegistration: (data) => dispatch(userRegistration(data)),
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);