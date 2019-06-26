import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

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

export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Chinies' },
    { key: 1, label: 'Pakistani' },
    { key: 2, label: 'Contiental' },
    { key: 3, label: 'Pizza' },
    { key: 4, label: 'Burger' },
  ]);

  const handleDelete = chipToDelete => () => {
    if (chipToDelete.label === 'React') {
      alert('Why would you want to delete React?! :)');
      return;
    }

    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            label={data.label}
            className={classes.chip}
            onClick={() => alert("Chips")}
            color="secondary"
            variant="outlined"
          />
        );
      })}
    </Paper>
  );
}
