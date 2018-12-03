import React from 'react';
import axios from 'axios';
import SearchBar from './searchbar.jsx';
import ResultList from './resultList.jsx';

class App extends React.Component {
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

  handleSetLocation(latitude, longitude) {}

  render() {
    return (
      <div>
        <SearchBar handleGet={this.handleGet} />
        <ResultList list={this.state.data} />
      </div>
    );
  }
}

export default App;
