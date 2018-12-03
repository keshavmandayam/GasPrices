import React from 'react';
import axios from 'axios';
import SearchBar from './searchbar.jsx';
import ResultList from './resultList.jsx';
import UserLocation from './userLocation.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userLocation: false,
      latitude: '',
      longitude: ''
    };
    this.handleGet = this.handleGet.bind(this);
    this.handleUserLocation = this.handleUserLocation.bind(this);
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
        newState.data = response.data;
        self.setState(newState);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return !this.state.userLocation ? (
      <div>
        <SearchBar
          handleGet={this.handleGet}
          handleUserLocation={this.handleUserLocation}
        />
        <ResultList list={this.state.data} />
      </div>
    ) : (
      <div>
        <SearchBar handleGet={this.handleGet} />
        <ResultList list={this.state.data} />
        <UserLocation handleGet={this.handleGet} />
      </div>
    );
  }
}

export default App;
