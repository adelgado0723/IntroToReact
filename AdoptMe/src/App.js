import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';
import pf from 'petfinder-client';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

// Class Component
// class App extends React.Component {
//   render() {
//     return React.createElement('div', {}, [
//       React.createElement('h1', {}, 'Adopt Me!'),

//       React.createElement(Pet, {
//         name: 'Luna',
//         animal: 'Dog',
//         breed: 'Havanese',
//       }),
//       React.createElement(Pet, {
//         name: 'Pepper',
//         animal: 'Bird',
//         breed: 'Cockatiel',
//       }),
//       React.createElement(Pet, {
//         name: 'Doink ',
//         animal: 'Cat',
//         breed: 'Mix',
//       }),
//     ]);
//   }
// }

// Using JSX
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
    };
  }
  // React lifecycle method that executes once a
  // component has mounted the DOM
  componentDidMount() {
    petfinder.breed.list({ animal: 'dog' }).then(console.log, console.error);
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
        pets,
      });
    });
  }

  render() {
    // return (
    //   <div>
    //     <h1>Adopt Me!</h1>
    //     <pre>
    //       <code>{JSON.stringify(this.state, null, 2)}</code>
    //     </pre>
    //     <Pet name="Luna" animal="dog" breed="Havanese" />
    //     <Pet name="Pepper" animal="bird" breed="Cockatiel" />
    //     <Pet name="Doink" animal="cat" breed="Mix" />
    //   </div>
    // );
    return (
      <div>
        <h1>Adopt Me!</h1>
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

ReactDOM.render(React.createElement(App), document.getElementById('root'));
