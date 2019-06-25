import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, TextField, MenuItem, Button } from '@material-ui/core';
import { country_list } from '../../assests/static/contriesList';
import { connect } from 'react-redux';
import { restaurantRegistration } from '../../redux/actions/authAction';
import firebase from '../../config/firebase';


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
      restaurantNameError: ""
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

    if(password === confirmPassword)
    {
      this.props.restaurantRegistration({ fullName, email, restaurantName: restaurantName.toLowerCase(), certificate, country, city, password });
    }

  }

  validateRestaurantEvent = () =>{
    const { restaurantName } = this.state;
    firebase.firestore().collection("users").where("restaurantName", "==" , restaurantName)
    .get()
    .then((shapshort)=>{
      this.setState({restaurantNameError: shapshort.size > 0 ? "Restaurant is alrady register. Try with other name" : ""})
    })
  }

  render(){

    const { classes }  = this.props;
    const { fullName, email, restaurantName, restaurantNameError, certificateName, country, city, password, confirmPassword  } = this.state;
    return(
      <Grid container className={classes.root}>
          <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
             
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
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    restaurantRegistration: (data) => dispatch(restaurantRegistration(data)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);