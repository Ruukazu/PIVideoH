import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getVideogames } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";


function Creategame() {

  const formStyles = {
    backgroundImage: 'url("https://wallpaper.dog/large/5530006.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cover',
    width: '100vw',
    height: '100vh',
    backgroundAttachment: 'fixed',
    overflow: 'auto',
  };
  
  const inputStyles = {
    width: '150px',
    border: '3px solid rgba(0, 0, 0, 0.84)',
    padding: '5px',
    height: '10px',
    borderRadius: '5px',
    outline: 'none',
    textAlign: 'center',
    backgroundColor: 'rgba(15, 211, 245, 0.871)',
  };
  const DescriptioninputStyles = {
    width: '300px',
    border: '3px solid rgba(0, 0, 0, 0.84)',
    padding: '5px',
    height: '100px',
    borderRadius: '5px',
    outline: 'none',
    textAlign: 'center',
    backgroundColor: 'rgba(15, 211, 245, 0.871)',
  };
  
  const labelStyles = {
    borderRadius: '30px',
    color: 'rgba(15, 211, 245, 0.871)',
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    display: 'block',
    padding: '3px',
  };
  
 
  const selectFormStyles = {
    position: 'relative',
    border: '4px solid',
    borderRadius: '10px',
    width: '120px',
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 211, 245, 0.871)',
    marginLeft: '30px',
  };
  const btnCreaStyle = {
    width: '150px',
    height: '30px',
    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R6xjalhjOsh2BAzOFE8LnqezEJ5vmiZQAQ&usqp=CAU)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  };
  const botondetailStyle = {
    width: '200px',
    height: '50px',
    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6hx9mmaps6rY5bJizCvWO2J-QrPCEpSqaw&usqp=CAU)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  };
  const h2Styles = {
    fontFamily: 'Copperplate, Papyrus, fantasy',
    fontSize: '40px',
    color: 'rgba(15, 211, 245, 0.871)',
    textShadow: '2px 2px 4px black',
  };
  const liStyles = {
    fontFamily: 'Copperplate, Papyrus, fantasy',
    fontSize: '20px',
    color: 'rgba(15, 150, 245, 0.871)',
    fontWeight: 'bold',
  };
  
  const errorStyles = {
    color: 'red',
    fontSize: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.773)',
    borderRadius: '12px',
  };
  const buttonXStyle = {
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVFVU57C_h7fAmJuFhz8BSRz56Q3AlLqE0g&usqp=CAU)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#ffffff',
    borderRadius: '50%'
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.allgenres);
  const platforms = useSelector((state) => state.platforms);
  const allVideogames= useSelector((state) => state.allVideogames)
  const [errors, setErrors] = useState({});


 
let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

function validate(input) {

  let errors = {};

  if (!input.name.trim()) {
    errors.name = "Enter a correct name";
  } else if (
    allVideogames.find(
      (e) =>
        e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim() //trim elimina espacios en blanco
    )
  ) {
    errors.name = `The ${input.name} already exists`;
  } else if (
    input.description === "number" ||
    input.description.length < 10 ||
    input.description.trim() === ""
  ) {
    errors.description = "Enter a correct description";
  } else if (input.released.trim() === "") {
    errors.released = "Enter a date";
  } else if (!input.image || !validateUrl.test(input.image)) {
    errors.image = "This is not a valid URL";
  } else if (input.released < "1952- 01- 01") {
    errors.released = "The date cannot be less than 1952 - 01- 01";
  } else if (input.rating === "" || input.rating < 1 || input.rating > 5) {
    errors.rating = "Enter a rating";
  } else if (input.genres.length === 0) {
    errors.genres = "Select one or more genres";
  } else if (input.platforms.length === 0) {
    errors.platforms = "Select one or more platforms";
  }
  return errors;
}


  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // setea el valor del target.
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectGenres(e) {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  const handleDeleteGenres = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e),
    });
  };
  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    let error = validate(input);
    if (Object.values(error).length !== 0) {
    } else {
    dispatch(postVideogame(input));
    alert("A new VideoGame has been created");
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }
}

return (
  <div style={formStyles}>
    <h2 style={h2Styles}>Create Videogame</h2>
    <form id="form" onSubmit={handleSubmit}>
      <div>
        <label style={labelStyles}>Name: </label>
        <input
          style={inputStyles}
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
         {errors.name && <h4 style={errorStyles}>{errors.name}</h4>}
      </div>
      <div>
        <label style={labelStyles}>Image: </label>
        <input
          style={inputStyles}
          type="text"
          value={input.image}
          name="image"
          onChange={handleChange}
        />
         {errors.image && <h4 style={errorStyles}>{errors.image}</h4>}
      </div>
      <div>
        <label style={labelStyles}>Released: </label>
        <input
          style={inputStyles}
          type="date"
          value={input.released}
          name="released"
          onChange={handleChange}
        />
         {errors.released && <h4 style={errorStyles}>{errors.released}</h4>}
      </div>
      <div>
        <label style={labelStyles}>Rating: </label>
        <input
          style={inputStyles}
          type="number"
          value={input.rating}
          name="rating"
          min={1}
          max={5}
          onChange={handleChange}
        />
         {errors.rating && <h4 style={errorStyles}>{errors.rating}</h4>}
      </div>
      <br></br>
      <div>
        <label style={labelStyles}>Description: </label>
        <textarea
          style={DescriptioninputStyles}
          type="text"
          value={input.description}
          name="description"
          onChange={handleChange}
        />
         {errors.description && <h4 style={errorStyles}>{errors.description}</h4>}
      </div>
      <div>
        <label style={labelStyles}>Genres </label>
        <select style={selectFormStyles} onChange={(el) => handleSelectGenres(el)} defaultValue="default">
          <option disabled selected>
            Genres
          </option>
          {genres?.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        {errors.genres && <h4 style={errorStyles}>{errors.genres}</h4>}
        <ul>
          {input.genres.map((e) => (
            <li style={liStyles}>
              <div>{e + ""}</div>
              <button style={buttonXStyle} value={e} onClick={() => handleDeleteGenres(e)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label style={labelStyles}>Platforms </label>
        <select style={selectFormStyles} onChange={(el) => handleSelectPlatforms(el)}>
          <option disabled selected>
            {" "}
            Platforms
          </option>

          {platforms?.map((e) => (
            <option value={e} key={e.id}>
              {e}
            </option>
          ))}
        </select>
        {errors.platforms && <h4 style={errorStyles}>{errors.platforms}</h4>}
        <ul>
          {input.platforms.map((e) => (
            <li style={liStyles}>
              <div>{e + ""}</div>
              <button
                style={buttonXStyle}
                value={e}
                onClick={() => handleDeletePlatforms(e)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button style={btnCreaStyle} type="submit">
      </button>
      <br></br>
      <br></br>
      <div>
        <Link to="/home">
          <button style={botondetailStyle}></button>
        </Link>
      </div>
    </form>
  </div>
);
}
export default Creategame;