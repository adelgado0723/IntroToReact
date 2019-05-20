import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results';
import { Router, Link } from '@reach/router';
import Details from './Details';
import Search from './SearchParams';

// Using JSX
class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
          <Search path="/search-params" />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
