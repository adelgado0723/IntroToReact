import React from 'react';

// Functional Component
// const Pet = props => {
//   const { name, animal, breed } = props;
//   return React.createElement('div', {}, [
//     React.createElement('h1', {}, name),
//     React.createElement('h2', {}, animal),
//     React.createElement('h2', {}, breed),
//   ]);
// };

// Using JSX
class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter((photo) => photo['@size'] === 'pn');
    }

    return (
      <div className="pet">
        <div className="image-countainer">
          <img src={photos[0].value} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
        </div>
      </div>
    );
  }
}

export default Pet;
