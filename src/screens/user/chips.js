import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const [ chipData ] = React.useState([
    { key: 0, label: 'Chinies' },
    { key: 1, label: 'Pakistani' },
    { key: 2, label: 'Contiental' },
    { key: 3, label: 'Pizza' },
    { key: 4, label: 'Burger' },
  ]);

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            label={data.label}
            className={classes.chip}
            onClick={() => props.handleChip(data.label)}
            color="secondary"
            variant="outlined"
          />
        );
      })}
    </Paper>
  );
}
