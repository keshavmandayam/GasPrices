import React from 'react';
import { geolocated } from 'react-geolocated';
import axios from 'axios';

class UserLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      latitude: 'unknown',
      longitude: 'atm'
    };
    this.handleGet = this.handleGet.bind(this);
    this.handleSetLocation = this.handleSetLocation.bind(this);
  }

  handleGet() {
    var self = this;
    axios
      .get('/api/gasprices/')
      .then(function(response) {
        const newState = self.state;
        newState.data = response.data;
        self.setState(newState);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSetLocation(latitude, longitude) {}

  render() {
    const stations = this.state.data.map(stations => (
      <li>{`$${stations.reg_price} at the ${stations.station} on ${
        stations.address
      } located ${stations.distance} away`}</li>
    ));

    return !this.props.isGeolocationAvailable ? (
      <div>
        <div>
          <ul>{stations}</ul>
        </div>
        <div>Your browser does not support Geolocation</div>
      </div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>
        <div>
          <ul>{stations}</ul>
        </div>
        <div>Geolocation is not enabled</div>
      </div>
    ) : this.props.coords ? (
      <div>
        <div>
          <ul>{stations}</ul>
        </div>
        <div>
          Your current location is {this.props.coords.latitude}{' '}
          {this.props.coords.longitude}
        </div>
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(UserLocation);
