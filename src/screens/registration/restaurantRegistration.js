import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import Loading from '../../components/loading';
import { Grid, Paper, TextField, MenuItem, Button } from '@material-ui/core';
import { country_list } from '../../assests/static/contriesList';
import { restaurantRegistration } from '../../redux/actions/authAction';
import { connect } from 'react-redux';
import firebase from '../../config/firebase';
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
      <UserRegistrationForm classes = {classes} {...props}/>
  )
}

class UserRegistrationForm extends Component
{
  constructor()
  {
    super();
    this.state = {
      fullName: "",
      email: "",
      restaurantName: "",
      age: "",
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
      certificate: "",
      certificateName: "",
      restaurantNameError: "",
      passwordError: "",
      isLoading: false

    }
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


  handleChange = name => event =>{
    this.setState({[name]: event.target.value});
  }

  handleFile = name => event =>{
    console.log("handel File", {name, event: event.target.files[0]})
    this.setState({[name]: event.target.files[0], certificateName: event.target.value})
  }

  handleSubmit = () =>{
    const { fullName, email, restaurantName, certificate, country, city, password, confirmPassword  } = this.state;

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
      this.props.restaurantRegistration({ fullName, email, restaurantName: restaurantName.toLowerCase(), certificate, country, city, password });
    }

  }

  validateRestaurantEvent = () =>{
    const { restaurantName } = this.state;
    firebase.firestore().collection("users").where("restaurantName", "==" , restaurantName.toLowerCase())
    .get()
    .then((shapshort)=>{
      this.setState({restaurantNameError: shapshort.size > 0 ? "Restaurant Name is alrady register. Try with other name" : ""})
    })
  }

  render(){

    const { classes }  = this.props;
    const { fullName, email, restaurantName, restaurantNameError, certificateName, country, city, password, confirmPassword  } = this.state;
    return(
      <Grid container className={classes.root}>
          {
            this.state.isLoading && <Loading/>
          }          
          <Paper className={classes.paper}>
            {/* <p style={{color: "green"}}>{this.state.successMessage}</p> */}
            <form 
              className={classes.container} 
              action="javascript:void(0)"  
              autoComplete="on"
              onSubmit={this.handleSubmit}
            >
             
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
                id="outlined-restaurant-name"
                label="Restaurant Name"
                type="text"
                fullWidth
                className={classes.textField}
                value={restaurantName}
                onChange={this.handleChange('restaurantName')}
                onBlur={() => this.validateRestaurantEvent()}
                margin="normal"
                variant="outlined" 
                required
              />
              <p style={{color: "red", fontSize: 12,}}>{restaurantNameError}</p>
              <TextField
                id="outlined-Certificate"
                label="Certificate"
                type="file"
                accept="image/png, image/jpeg"
                fullWidth
                className={classes.textField}
                value={certificateName}
                onChange={this.handleFile('certificate')}
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
                  required
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
                <p style={{color: "red"}}>{this.props.passwordError}</p>
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
    )
  }
}


const mapStateToProps = (state) =>{
  return({
    signUpError: state.authReducer.signUpError,
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    restaurantRegistration: (data) => dispatch(restaurantRegistration(data)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);