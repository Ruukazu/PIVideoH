import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../redux/actions";

const SearchBar = () => { 

const searchTermStyle = {
  width: '300px',
  border: '3px solid rgba(0, 0, 0, 0.84)',
  padding: '5px',
  height: '10px',
  borderRadius: '5px',
  outline: 'none',
  textAlign: 'center',
  backgroundColor: 'rgb(245, 11, 235)',
};

const searchButtonStyle = {
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  backgroundImage: 'url(https://images.getpng.net/uploads/preview/game-ui-kit-set-cartoon-wooden-circles-buttons-graphical-user-interface-gui-games-44-1151639245737taqidtgeup.webp)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  color: '#ffffff',
  borderRadius: '50%'
};

  
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      dispatch(getNameVideogames(name.trim()));
      setName("");
    }
  };

  return (
    <div>
      <input
        style={searchTermStyle}
        type="text"
        placeholder="Buscar Juego"
        value={name}
        onChange={handleInputChange}
      />
      <button style={searchButtonStyle} type="submit" onClick={handleSubmit}>
      </button>
    </div>
  );
};

export default SearchBar;