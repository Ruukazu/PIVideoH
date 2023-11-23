import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  filterByGenres,
  getGenres,
  filterCreated,
  orderByRating,
  orderByName,
} from "../redux/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import ErrorNF from "./ErrorNF";

const Home = () => {
  const homeGralStyle = {
    backgroundImage: 'url("https://media.istockphoto.com/id/1171564349/video/retro-land.jpg?s=640x640&k=20&c=UytoK5VuR3nXezFTIryRH6D4mHUE846zUBZhlIJA5cw=")',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    width: '100vw',
    backgroundAttachment: 'fixed',
    display: 'grid',
  };

  const tituloStyle = {
    color: 'rgb(245, 11, 235)',
    fontFamily: 'Copperplate, Papyrus, fantasy',
    fontSize: '80px',
    marginTop: '50px',
    '--interval': '0.5s',
    display: 'block',
    filter: 'saturate(60%)',
    animation: 'flicker steps(100) var(--interval) 3s infinite',
    textShadow: '1px 1px 2px black',
  };

  const btnCreaStyle = {
    width: '200px',
    height: '50px',
    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R6xjalhjOsh2BAzOFE8LnqezEJ5vmiZQAQ&usqp=CAU)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  };
  const SearchBarStyle = {
    marginTop: '50px',
  };

  const selectStyle = {
    position: 'relative',
    border: '3px solid rgba(0, 0, 0, 0.84)',
    borderRadius: '20px',
    fontSize: '15px',
    width: '150px',
    height: '50px',
    marginTop: '30px',
    backgroundColor: 'rgb(245, 11, 235)',
    marginLeft: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
  };


  const cardHomeStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const pagStyle = {
    border: '3px solid rgba(0, 0, 0, 0.84)',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
    background: 'rgb(245, 11, 235)',
    margin: '5px',
    fontSize: '15px',
  };
  const rldStyle = {
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    backgroundImage: 'url(data:image/png;base64,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)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#ffffff',
    borderRadius: '50%',
    marginTop: '30px',
  };

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allgenres = useSelector((state) => state.allgenres);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePerPage] = useState(15);
  

  const currentVideogame = allVideogames.slice(
    (currentPage - 1) * videogamePerPage,
    currentPage * videogamePerPage
  );

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleFilterGenres = (event) => {
    event.preventDefault();
    dispatch(filterByGenres(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterCreated = (event) => {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
  };

  const handleRating = (event) => {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
    setCurrentPage(1);
  };

  function handleClick(event) {
    event.preventDefault();
    dispatch(getVideogames());
  }
  const handleSort = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
  };

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={homeGralStyle}>
      <h1 style={tituloStyle}>ELIGE TU JUEGO</h1>
      <Link to="/videogames">
        <button style={btnCreaStyle}></button>
      </Link>

      <div style={SearchBarStyle} >
        <SearchBar />
        <div>
            <button style={rldStyle} onClick={handleClick}></button>
           
        </div>
        <select style={selectStyle} onChange={handleFilterGenres}>
          <option value="All">Generos</option>
          {allgenres?.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
            ))}

        </select>
           

        <select style={selectStyle} onChange={handleSort}>
          <option>Orden</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select style={selectStyle} onChange={handleRating}>
          <option>Rating</option>
          <option value="least">Least Popular</option>
          <option value="most">Most Popular</option>
        </select>

        <select style={selectStyle} onChange={handleFilterCreated}>
          <option value="all">Elegir API/BD</option>
          <option value="api">API</option>
          <option value="created">BD</option>
        </select>

        <div style={cardHomeStyle}>
          {currentVideogame?.length > 0 ? (
            currentVideogame.map((game) => (
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image || game.background_image}
                genres={game.genres}
                rating={game.rating}
                platforms={game.platforms}
                released={game.released}
                description={game.description}
              />
            ))
          ) : (
            <ErrorNF />
          )}
        </div>
        </div>    

        <Paginado 
          videogamePerPage={videogamePerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />

        <div style={{ textAlign: 'center' }}>
        <button
          style={pagStyle}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage < 1}
        >
          Anterior
        </button>

        <button
          style={pagStyle}
          onClick={() => setCurrentPage((nextPage) => nextPage + 1)}
          disabled={currentVideogame.length < 15}
        >
          Siguiente
        </button>
        
        </div>
    </div>
  );
};

export default Home;