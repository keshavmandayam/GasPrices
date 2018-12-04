import React from 'react';
import axios from 'axios';
import SearchBar from './searchbar.jsx';
import ResultList from './resultList.jsx';
import UserLocation from './userLocation.jsx';
import GasMap from './map.jsx';
import Title from './title.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      lastQuery: '',
      data: [
        {
          country: 'United States',
          zip: '94107',
          reg_price: '4.09',
          mid_price: '4.19',
          pre_price: '4.29',
          diesel_price: '4.00',
          reg_date: '3 years ago',
          mid_date: '3 years ago',
          pre_date: '3 years ago',
          diesel_date: '3 years ago',
          address: '598 Bryant St',
          diesel: '1',
          id: '99623',
          lat: '37.779739',
          lng: '-122.397850',
          station: 'Shell',
          region: 'California',
          city: 'San Francisco',
          distance: '0.6 miles'
        }
      ],
      userLocation: false,
      reRenderGas: false
    };
    this.handleGet = this.handleGet.bind(this);
    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    let newState = this.state;
    newState.showModal = true;
    this.setState(newState);
  }

  handleCloseModal() {
    let newState = this.state;
    newState.showModal = false;
    this.setState(newState);
  }

  handleUserLocation() {
    const newState = this.state;
    newState.userLocation = true;
    this.setState(newState);
  }

  handleGet(location) {
    const self = this;
    axios
      .get('/api/gasprices/', {
        params: {
          location: location
        }
      })
      .then(function(response) {
        const newState = self.state;
        newState.lastQuery = location;
        newState.data = response.data;
        newState.userLocation = false;
        newState.reRenderGas = true;
        self.setState(newState);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return !this.state.userLocation && !this.state.reRenderGas ? (
      <div id="app">
        <div className="title">
          <Title />
        </div>
        <div className="header">
          <SearchBar
            handleGet={this.handleGet}
            handleUserLocation={this.handleUserLocation}
          />
        </div>
        <div className="list">
          <ResultList
            list={this.state.data}
            lastQuery={this.state.lastQuery}
            showModal={this.state.showModal}
            handleOpenModal={this.handleOpenModal}
            handleCloseModal={this.handleCloseModal}
          />
        </div>
        <div className="map">
          <GasMap
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%'
            }}
            data={this.state.data}
          />
        </div>
      </div>
    ) : !this.state.userLocation && this.state.reRenderGas ? (
      <div id="app">
        <div className="title">
          <Title />
        </div>
        <div className="header">
          <SearchBar
            handleGet={this.handleGet}
            handleUserLocation={this.handleUserLocation}
          />
        </div>
        <div className="list">
          <ResultList list={this.state.data} />
        </div>
        <div className="map">
          <GasMap
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%'
            }}
            data={this.state.data}
          />
        </div>
      </div>
    ) : (
      <div id="app">
        <div className="title">
          <Title />
        </div>
        <div className="header">
          <SearchBar handleGet={this.handleGet} />
        </div>
        <div classNam="list">
          <ResultList list={this.state.data} />
        </div>
        <div className="map">
          <GasMap
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%'
            }}
            data={this.state.data}
          />
        </div>
        <div className="title">
          <UserLocation handleGet={this.handleGet} />
        </div>
      </div>
    );
  }
}

export default App;
