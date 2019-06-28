import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
      color: 'red',
      backgroundColor: "green !important"
    }
  }));


function Registration(props){
  if(props.userData)
  {
    props.history.push(`/${props.userData.userType}`)
  }
  const classes = useStyles();
  return(
    <span>
      <Header/>
      <Grid container className={classes.root}>
        
        <Paper className={classes.paper}>
          <h2>Register as</h2>
          <Button color="secondary"><Link to='/registration/user' className={classes.link}><Button color="inherit">User</Button></Link></Button>
          <Button color="secondary"><Link to='/registration/restaurant' className={classes.link}><Button color="inherit">Restaurant</Button></Link></Button>
        </Paper>
      </Grid>
    </span>
  )
}

const mapStateToProps = (state) =>{
  return({
    userData: state.authReducer.userData
  })
}


export default connect(mapStateToProps, null)( Registration );