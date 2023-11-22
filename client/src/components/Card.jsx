import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  name,
  image,
  genres,
  rating,
  id,
  background_image,
}) => {
  const InfoStyle = {
    height: '30px',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '20px',
    border: '3px solid rgba(0, 0, 0, 0.84)',
    background: 'rgba(173, 216, 230, 0.84)',
    marginTop: '-20px',
  };
  
  const card = {
    width: '350px',
    height: '425px',
    color: '#ffffff',
    background: 'linear-gradient(163deg, #000000 0%, #808080)',
    borderRadius: '45px',
    margin: '40px 30px 20px 30px',
    float: 'left',
  };
  
  return (
    <div style={card}>
      <h3>{name}</h3>
      <img
        src={image || background_image}
        alt="Img not found"
        width="300px"
        height="200px"
      />
      <h5> Genre: {genres?.join(',  ')}</h5>
      <h5> Rating: {rating}</h5>
      <Link to={`/details/${id}`}>
        <button style={InfoStyle}>Mas Informacion </button>
      </Link>
    </div>
  );
};

export default Card;