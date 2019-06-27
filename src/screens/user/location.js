import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class MyGoogleMap extends Component
{
    constructor()
    {
        super();
        this.state = {
        coords: {}
        }
    }

    componentDidMount()
    {
        navigator.geolocation.getCurrentPosition(position =>{
            this.setState({coords: position.coords})
        })
    }


    clickHandler = (event) =>{
        const coords = {};
        coords.latitude = event.latLng.lat();
        coords.longitude = event.latLng.lng();
        this.setState({coords});
    }

    setMarkerOnDragEnd = (event) =>
    {
        const coords = {};
        coords.latitude = event.latLng.lat();
        coords.longitude = event.latLng.lng();
        this.setState({coords});
    }
    render(){
        const { classes } = this.props;
        const { coords } = this.state;

        return(
        <div className={classes.root}>
            <ExpansionPanel >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                    <Typography className={classes.heading}>Select your Location</Typography>
                    </div>
                    <div className={classes.column}></div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column}>
                        {coords && <MyMapComponent
                            isMarkerShown 
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"        
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            coords = {coords}
                            setMarkerOnDragEnd = {this.setMarkerOnDragEnd}
                            clickHandler={this.clickHandler}
                        />}
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button size="small">Close</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>)
    }
}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={18}
    onClick = {(event) => props.clickHandler(event)}
    center ={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown && 
      <Marker 
        position={{ 
            lat: props.coords.latitude, 
            lng: props.coords.longitude 
        }} 
        draggable = {true}
        onDragEnd = {(event) => props.setMarkerOnDragEnd(event)}
      />}
  </GoogleMap>
))

export default MyGoogleMap;