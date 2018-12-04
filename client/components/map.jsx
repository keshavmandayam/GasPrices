import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Api from '../../server/apikey.js';

export class GasMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const stations = this.props.data.map(stations => {
      if (stations.reg_price !== 'N/A')
        return (
          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: stations.lat, lng: stations.lng }}
            price={{ price: stations.reg_price }}
            name={'test2'}
          />
        );
    });
    console.log(stations);
    return (
      <Map
        google={this.props.google}
        style={{
          width: '65.15%',
          height: '75%'
        }}
        zoom={14}
        initialCenter={{
          lat: this.props.data[0].lat,
          lng: this.props.data[0].lng
        }}
      >
        {stations}
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{'test'}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: Api.map.apiKey
})(GasMap);
