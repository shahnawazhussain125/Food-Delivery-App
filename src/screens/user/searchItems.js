import React, { Component } from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core';

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
                        {
                          this.props.restaurantName.toLowerCase().split(' ')
                          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                          .join(' ')
                        }
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.props.name}
                      </Typography>
                    </Grid>
                   
                  </Grid>
                  <Grid item>
                    <Grid item>
                        <Typography variant="subtitle1">Rs {this.props.price}</Typography>
                    </Grid>
                    <Grid item style={{marginTop: 100}}>
                        <Typography color="primary" variant="body2" style={{ cursor: 'pointer', borderWidth: 1, borderColor: "silver" }}>
                         <Button onClick={() => this.props.handleOrder(this.props.index)}>
                          Order Now
                         </Button>
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

