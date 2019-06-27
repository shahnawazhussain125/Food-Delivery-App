import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SearchItems from '../user/searchItems';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'white',
      marginTop: 10
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      height: 150,
    },
    image: {
      // width: 128,
      height: 150,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '100%',
    },
  }));
  


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}


export default function Restorent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Pinding" href="/drafts" />
          <LinkTab label="In Progress" href="/trash" />
          <LinkTab label="Delivered" href="/spam" />
        </Tabs>
      </AppBar>
      {
        value === 0 
        && 
        <TabContainer>
            <SearchItems classes={classes}/>
            <SearchItems classes={classes}/>
            <SearchItems classes={classes}/>
        </TabContainer>
      }
      {
        value === 1 
        && 
        <TabContainer>
            <SearchItems classes={classes}/>
            <SearchItems classes={classes}/>
            <SearchItems classes={classes}/>
        </TabContainer>
      }
      {
        value === 2 
        && 
        <TabContainer>
            <SearchItems classes={classes}/>
            <SearchItems classes={classes}/>
            <SearchItems classes={classes}/>
        </TabContainer>        
      }
    </div>
  );
}
