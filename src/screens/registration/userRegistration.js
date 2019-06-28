import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, TextField, MenuItem, Button } from '@material-ui/core';
import { country_list } from '../../assests/static/contriesList';
import Loading from '../../components/loading';
import { userRegistration } from '../../redux/actions/authAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

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
      signUpError: "",
      passwordError: "",
      isLoading: false
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
      this.setState({isLoading: false})
      this.props.history.push(`/${nextProps.userData.userType}`);
    }
    else
    {
      this.setState({signUpError: nextProps.signUpError, isLoading: false})
    }
  }

  handleSubmit = () =>{
    const { fullName, email, gender, age, country, city, password, confirmPassword} = this.state;
    
    if(password.length < 6)
    {
      this.setState({passwordError: "Password must contain 6 character", isLoading: false});
    }
    else if(password !== confirmPassword)
    {
      this.setState({passwordError: "Password does not match!", isLoading: false});      
    }
    else
    {
      this.setState({isLoading: true})
      this.props.userRegistration({fullName, email, gender, age, country, city, password});     
    }
  }

  handleChange = name => event =>{
    this.setState({[name]: event.target.value});
  }

  passwordValidation = () =>{
    const { password, confirmPassword } = this.state;
    if(password.length < 6)
    {
      this.setState({passwordError: "Password must contain 6 character"});
    }
    else if(password !== confirmPassword)
    {
      this.setState({passwordError: "Password does not match!"});      
    }
    else
    {
      this.setState({passwordError: ""});      
    }
  }

  render(){

    const { classes }  = this.props;
    const { isLoading, fullName, email, gender, age, country, city, password, confirmPassword , signUpError } = this.state;
    return(
      <span>
        <Header/>
        <Grid container className={classes.root}>
            {
              isLoading && <Loading/>
            }
            <Paper className={classes.paper}>
              <form 
                className={classes.container} 
                action="javascript:void(0)"  
                onSubmit={this.handleSubmit}
                autoComplete="on"
              >
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
                  required
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
                  required
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
                  required
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
                    required
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
                    required
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
                    required
                  />
                  <TextField
                    id="outlined-confirmPassword"
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    className={classes.textField}
                    value={confirmPassword}
                    onChange={this.handleChange('confirmPassword')}
                    onBlur={this.passwordValidation}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                  <p style={{color: "red"}}>{this.state.passwordError}</p>
                  
                  <p><Link to = "/signin" >Already have an account?</Link></p>

                  <Button 
                    variant="contained"  
                    color="primary" 
                    className={classes.button}
                    fullWidth
                    type="submit"
                  >
                    Register
                  </Button>
              </form>
            </Paper>
        </Grid>
      </span>
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