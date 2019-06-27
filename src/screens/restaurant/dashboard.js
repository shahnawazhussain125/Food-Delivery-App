import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import StatusItems from '../user/statusItems';
import { getAllOrders } from '../../redux/actions/restaurantAction';
import { connect } from 'react-redux';

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
  

class Dashboard extends Component
{
    constructor()
    {
        super();
        this.state={
            searchText: "",
            restaurants: [],
            noRestaurantFound: "",
        }

    }

    componentDidMount(){
      
    }

    componentWillReceiveProps(nextProps)
    {
      this.setState({allOrders: nextProps.allOrders,})
    }

    render(){
        return(
          <span>
            <DashboardContent 
              allOrders={this.props.allOrders}
              {...this.state}
            />
          </span>
      )
    }
}


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


function DashboardContent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { allOrders } = props;

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
            allOrders.filter(value => value.status === "pending")
            .map((value, index) =>{
              return <StatusItems key = { index } classes = { classes } { ...value } />
            })
          }
        </TabContainer>
      }
      {
        value === 1 
        && 
        <TabContainer>
          {
            allOrders.filter(value => value.status === "inprogress")
            .map((value, index) =>{
              return <StatusItems key = { index } classes={classes} {...value} />
            })
          }
        </TabContainer>
      }
      {
        value === 2 
        && 
        <TabContainer>
          {
            allOrders.filter(value => value.status === "delivered")
            .map((value, index) =>{
              return <StatusItems key = { index } classes = { classes } {...value} />
            })
          }
        </TabContainer>        
      }
    </div>
  );
}



const mapStateToProps = (state) =>{
  console.log({restaurants: state.userReducer})
    return({
        user: state.authReducer.user,
        allOrders: state.restaurantReducer.allOrders,
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        getAllOrders: () => dispatch(getAllOrders()),

    })
}

export default connect( mapStateToProps, mapDispatchToProps )(Dashboard);