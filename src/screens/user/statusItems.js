import React, { Component } from 'react'
import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core'
import Pizza from '../../assests/images/pizza.jpg'


class StatusItems extends Component
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
                    <img className={classes.img} alt="complex" src={Pizza} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        BBQ Restaurant
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Sweet & Sticky BBQ Turkey Legs
                      </Typography>
                    </Grid>
                   
                  </Grid>
                  <Grid item>
                    <Grid item>
                        <Typography variant="subtitle1">Rs 200.00</Typography>
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

export default StatusItems;

