import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, clear } from "../redux/actions";

const Detail = () => {
  const generalStyle = {
    backgroundImage: 'url("https://media.contentapi.ea.com/content/dam/eacom/mass-effect-legendary-edition/images/2021/05/mele-1920x1080p.jpg.adapt.crop16x9.1920w.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cover',
    width: '100vw',
    height: '100vh',
    backgroundAttachment: 'fixed',
    overflow: 'auto',
  };
  
  const nombreStyle = {
    fontFamily: 'Copperplate, Papyrus, fantasy',
    fontSize: '60px',
    color: 'rgba(15, 211, 245, 0.871)',
  };
  
  const imageStyle = {
    borderRadius: '30px',
    border: '5px solid rgba(15, 211, 245, 0.871)',
  };
  
  const h4Style = {
    borderRadius: '30px',
    color: 'rgba(15, 211, 245, 0.871)',
    fontWeight: 'bold', 
   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
    
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
  const dispatch = useDispatch();
  const { id } = useParams();
  const myVideogame = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  return (
    <div style={generalStyle}>
      <div key={myVideogame.id}>
        <h1 style={nombreStyle}>{myVideogame.name}</h1>
        <img
          style={imageStyle}
          src={myVideogame.background_image || myVideogame.image}
          alt="NIF"
          width="400px"
          height="250px"
        />
        <div style={h4Style}>
          <h4> Rating: {myVideogame.rating} </h4>
          <h4> Released: {myVideogame.released}</h4>
          <h4>
            Platforms:{" "}
            {myVideogame.platforms?.map((plat, i) => (
              <li key={i}>{plat}</li>
            ))}
          </h4>
          <h4>
             Genres:
            {myVideogame.genres?.map((genre, i) => (
              <li key={i}>{genre.name}</li>
            ))}
          </h4>
          <h4>  Description:</h4>
          <p dangerouslySetInnerHTML={{ __html: myVideogame.description }}></p>
        </div>
        <Link to="/home">
          <button style={botondetailStyle}></button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;