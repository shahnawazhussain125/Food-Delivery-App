import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Search from './search';
import SearchItems from './searchItems';
import GoogleMap from './location';
import ChipsArray from './chips';
import MyRequest from "./myRequest";
import { connect } from 'react-redux';
import { searchRestaurantByText, searchRestaurantByType } from '../../redux/actions/userAction';

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
            noRestaurantFound: ""
        }
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.restaurants.length)
      {
        this.setState({restaurants: nextProps.restaurants, noRestaurantFound: ""})
      }
      else
      {
        this.setState({restaurants: nextProps.restaurants, noRestaurantFound: "No Restaurant found"})
      }
    }

    handleChange = name => event =>{
        this.setState({[name]: event.target.value})
    }

    handleClick = () =>{
      this.props.searchRestaurantByText(this.state.searchText.toLowerCase())
    }

    handleChip = (text) =>{
      this.props.searchRestaurantByType(text.toLowerCase())
    }

    render(){
        return(
            <span>
              <DashboardContent 
                handleChange={this.handleChange} 
                searchText={this.state.searchText}
                handleClick={this.handleClick}
                restaurants={this.state.restaurants}
                handleChip={this.handleChip}
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



const  DashboardContent = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Restaurants" />
          <Tab label="My Request" />
        </Tabs>
      </AppBar>
      {value === 0 
        && 
        <TabContainer>
            <GoogleMap classes={classes}/>
            <Search 
              classes={classes} 
              handleChange={props.handleChange}
              searchText={props.searchText}
              handleClick={props.handleClick}
            />
            <ChipsArray handleChip={props.handleChip}/>
            {
              props.noRestaurantFound && !props.restaurants.length && <h2>{ props.noRestaurantFound }</h2>
            }
            {
              props.restaurants.length !== 0 && props.restaurants.map((value, index) =>{
                return  <SearchItems key={index} {...value} classes={classes}/>
              })
            }
        </TabContainer>}
      {
        value === 1
        && 
        <TabContainer>
          <MyRequest classes={classes}/>
        </TabContainer>
      }
    </div>
  );
}


const mapStateToProps = (state) =>{
  console.log({restaurants: state.userReducer})
    return({
        restaurants: state.userReducer.restaurants
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        searchRestaurantByText: (text) => dispatch(searchRestaurantByText(text)), 
        searchRestaurantByType: (type) => dispatch(searchRestaurantByType(type)),
    })
}

export default connect( mapStateToProps, mapDispatchToProps )(Dashboard);