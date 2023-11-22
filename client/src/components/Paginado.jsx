import React from "react";

const Paginado = ({ videogamePerPage, allVideogames, paginado }) => {
  const pagStyle = {
    borderRadius: '5px',
    border: '3px solid rgba(0, 0, 0, 0.84)',
    background: 'rgba(173, 216, 230, 0.84)',
    color: 'hsl(0, 0%, 98%)',
    alignItems: 'center',
    margin: '5px',
    fontSize: '20px',
    cursor: 'pointer'
  };
  
  const ulStyle = {
    margin: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
  };

  
  const pageNumbers = Array.from({ length: Math.ceil(allVideogames / videogamePerPage) }, (_, index) => index + 1);

  return (
    <nav>
      <ul style={ulStyle}>
        {pageNumbers.map((number) => (
          <button onClick={() => paginado(number)} key={number} style={pagStyle}>
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Paginado;