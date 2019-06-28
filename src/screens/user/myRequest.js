import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import StatusItems from './statusItems'

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MyRequest(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log("UserDara______+++++++", props.userData)

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
          {
            props.allOrders.filter(value => value.status === "pending")
            .map((value, index) =>{
              return <StatusItems classes={props.classes} userData={props.userData} {...value}/>
            })
          }
        </TabContainer>
      }
      {
        value === 1 
        && 
        <TabContainer>
          {
            props.allOrders.filter(value => value.status === "inprogress")
            .map((value, index) =>{
              return <StatusItems classes={props.classes} userData={props.userData} {...value}/>
            })
          }
        </TabContainer>
      }
      {
        value === 2 
        && 
        <TabContainer>
          {
            props.allOrders.filter(value => value.status === "delivered")
            .map((value, index) =>{
              return <StatusItems classes={props.classes} userData={props.userData} {...value}/>
            })
          }
        </TabContainer>        
      }
    </div>
  );
}
