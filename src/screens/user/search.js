import React from 'react';
import { Grid, Paper, TextField, Button } from '@material-ui/core'

const Search = (props) =>{
    const { classes, searchText, handleChange } = props;
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
                            onChange={handleChange('searchText')}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                         variant="contained"  
                         color="primary" 
                         className={classes.button}
                         fullWidth
                         onClick={props.handleClick}
                        >
                            Search
                        </Button>
                    </form>
                </Paper>
            </Grid>
        )
    }



export default Search;