import React from 'react';
import ReactDOM from 'react-dom';
// import Results from './Results';
import { Router, Link } from '@reach/router';
// import Details from './Details';
// import SearchParams from './SearchParams';
import pf from 'petfinder-client';
import { Provider } from './SearchContext';
import NavBar from './NavBar';
import Loadable from 'react-loadable';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

const loading = () => <h1>loading split code ...</h1>;

const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading,
});

const LoadableSearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading,
});

const LoadableResults = Loadable({
  loader: () => import('./Results'),
  loading,
});

// Using JSX
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Miami, FL',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds,
    };
  }
  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  handleAnimalChange = (event) => {
    this.setState(
      {
        animal: event.target.value,
      },
      this.getBreeds
    );
  };

  handleBreedChange = (event) => {
    this.setState({
      breed: event.target.value,
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then((data) => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed,
            });
          } else {
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
