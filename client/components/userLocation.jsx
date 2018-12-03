import React from 'react';
import { geolocated } from 'react-geolocated';

class UserLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.coords) {
      this.props.handleGet(
        `${this.props.coords.latitude} ,${this.props.coords.longitude}`
      );
    }
    return !this.props.isGeolocationAvailable ? (
      <div>
        <div>Your browser does not support Geolocation</div>
      </div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>
        <div>Geolocation is not enabled</div>
      </div>
    ) : this.props.coords ? (
      <div>
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
