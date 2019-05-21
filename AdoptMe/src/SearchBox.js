import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

class Search extends React.Component {
  render() {
    return (
      <Consumer>
        {(context) => (
          <div className="search-params">
            <form>
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  value={context.location}
                  placeholder="Location"
                  onChange={context.handleLocationChange}
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  value={context.animal}
                  id="animal"
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map((animal) => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="breed">
                Breed
                <select
                  disabled={!context.breeds.length}
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                >
                  <option />
                  {context.breeds.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Search;
