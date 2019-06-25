import React, { Component } from 'react'
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux';

class Search extends Component
{
    constructor()
    {
        super();
        this.state={
            searchText: ""
        }
    }

    handleChange = name => event =>{
        this.setState({[name]: event.target.value})
    }

    render(){
        const { classes } = this.props;
        const { searchText } = this.state;
        return(
            <Grid className={classes.root}>
                <Paper className={classes.paper}>
                    <form className={classes.container} noValidate autoComplete="on">
                        <TextField
                            id="outlined-searchText"
                            label="Search"
                            type="text"
                            fullWidth
                            className={classes.textField}
                            value={searchText}
                            onChange={this.handleChange('searchText')}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                         variant="contained"  
                         color="primary" 
                         className={classes.button}
                         fullWidth
                        >
                            Search
                        </Button>
                    </form>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state) =>{
    return({
        retaurants: state.authReducer.retaurants
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);