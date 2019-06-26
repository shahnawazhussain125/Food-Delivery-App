import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "Green",
    height: 100
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid>

        </Grid>
        <Grid>
            <p>© 2019 Copyright: FoodPoint</p>
        </Grid>
      </Paper>
    </div>
  );
}
