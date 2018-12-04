import React from 'react';
import { geolocated } from 'react-geolocated';
import ReactLoading from 'react-loading';

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
    return this.props.coords ? (
      <div className="loadingBar">
        <div>
          <ReactLoading type={'balls'} color={'black'} height={66} width={37} />
        </div>
      </div>
    ) : (
      <div className="loadingBar">
        <ReactLoading type={'balls'} color={'black'} height={66} width={37} />
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(UserLocation);
