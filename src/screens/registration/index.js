import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, Button } from '@material-ui/core';
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
      color: 'red',
      backgroundColor: "green !important"
    },
    // link: {
    //     color: "white !important",
    //     textDecoration: "none"
    //   },
  }));


function Registration(){
  const classes = useStyles();
  return(
      <RegistrationForm classes = {classes}/>
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
      confirmPassword: ""

    }
  }


  handleChange = name => event =>{
    this.setState({[name]: event.target.value});
  }

  render(){

    const { classes }  = this.props;
    return(
      <Grid container className={classes.root}>
          <Paper className={classes.paper}>
                <h2>Register as</h2>
                <Button color="secondary"><Link to='/registration/user' className={classes.link}><Button color="inherit">User</Button></Link></Button>
                <Button color="secondary"><Link to='/registration/restaurant' className={classes.link}><Button color="inherit">Restaurant</Button></Link></Button>
          </Paper>
      </Grid>
    )
  }
}



export default Registration;