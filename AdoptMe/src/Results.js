import React from 'react';
import Pet from './Pet';
import pf from 'petfinder-client';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Results extends React.Component {
  state = {
    pets: [],
  };

  componentDidMount() {
    petfinder.pet.find({ location: 'Miami, FL', output: 'full' }).then((data) => {
      let pets;
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
      } else {
        pets = [];
      }

      this.setState({
        pets: pets,
      });
    });
  }
  render() {
    return (
      <div className="search">
        {this.state.pets.map((pet) => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ');
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
