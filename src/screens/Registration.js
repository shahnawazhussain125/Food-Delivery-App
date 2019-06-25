import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    paper: {
      height: 100,
      width: 800,
      marginTop: 50
      
    },
    title: {
      flexGrow: 1,
    },
  });


function Registration(){
  const classes = useStyles();
  return(
      <RegistrationForm classes = {classes}/>
  )
}

class RegistrationForm extends Component
{


  handleChange = name =>{

  }

  render(){
    // full name
    // email
    // gender
    // age
    // country
    // city
    // password
    // confirm password
    
    const { classes }  = this.props;
    return(
      <Grid container className={classes.root}>
          <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Full Name"
                className={classes.textField}
                value="Abc"
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
               <TextField
                id="outlined-name"
                label="Email"
                className={classes.textField}
                value="Abc"
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
                 <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Native select"
                  className={classes.textField}
                  value={values.currency}
                  onChange={handleChange('currency')}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select your currency"
                  margin="normal"
                  variant="outlined"
                >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
            </form>
          </Paper>
      </Grid>
    )
  }
}

export default Registration;