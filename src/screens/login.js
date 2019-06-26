import React, { Component } from 'react';
import { makeStyles  } from '@material-ui/styles';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { signIn } from '../redux/actions/authAction';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme =>({
    root: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    paper: {
      width: 500,
      marginTop: "10%",
      padding: 50
      
    },
    button: {
      marginTop: "20px",
      color: 'red'
    }
  }));


function Login(props){
  const classes = useStyles();
  return(
      <LoginForm classes = {classes} {...props}/>
  )
}

class LoginForm extends Component
{
  constructor()
  {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
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
    if(!nextProps.signInError)
    {
      this.props.history.push(`/${nextProps.userData.userType}`);
    }
    else
    {
      this.setState({errorMessage: nextProps.signInError})
    }
  }

  handleSubmit = () =>{
    const { email, password} = this.state;
    this.props.signIn({email, password});
  }


  handleChange = name => event =>{
    this.setState({[name]: event.target.value});
  }

  render(){
    
    const { classes }  = this.props;
    const { email, password, errorMessage } = this.state;
    return(
      <Grid container className={classes.root}>
          <Paper className={classes.paper}>
            <p style={{color: "red"}}>{errorMessage}</p>
            <form className={classes.container} noValidate autoComplete="on">
               <TextField
                id="outlined-name"
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

            <p>Not a member yet? <Link to="/registration"> Sign Up here</Link> </p>

            <Button 
              variant="contained"  
              color="primary" 
              className={classes.button}
              fullWidth
              onClick={this.handleSubmit}
            >
                Login
            </Button>
            </form>
          </Paper>
      </Grid>
    )
  }
}

const mapStateToProps = (state) =>{
  return({
    signInError: state.authReducer.signInError,
    user: state.authReducer.user,
    userData: state.authReducer.userData
  })
}

const mapDispatchToProps = (dispatch) =>{
  return({
    signIn: (data) => dispatch(signIn(data))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);