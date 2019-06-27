import React, { Component } from 'react'
import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core'
import Pizza from '../../assests/images/pizza.jpg'


class SearchItems extends Component
{
    constructor()
    {
        super();
        this.state={
            SearchItemsText: ""
        }
    }

    handleChange = name => event =>{
        this.setState({[name]: event.target.value})
    }

    render(){
        const { classes } = this.props;
        const { SearchItemsText } = this.state;
        return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <Grid className={classes.image}>
                    <img className={classes.img} alt="complex" src={this.props.imageURL} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {this.props.restaurantName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.props.type}
                      </Typography>
                    </Grid>
                   
                  </Grid>
                  <Grid item>
                    <Grid item>
                        <Typography variant="subtitle1">Rs {this.props.price}</Typography>
                    </Grid>
                    <Grid item style={{marginTop: 100}}>
                        <Typography color="primary" variant="body2" style={{ cursor: 'pointer', borderWidth: 1, borderColor: "silver" }}>
                         Order Now
                        </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
        </div>
        )
    }
}

export default SearchItems;

