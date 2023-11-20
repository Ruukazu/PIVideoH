import { GET_VIDEOGAMES, GET_NAME_VIDEOGAMES, GET_GENRES, POST_VIDEOGAME, GET_DETAILS, 
  FILTER_BY_GENRES, FILTER_CREATED, ORDER_BY_RATING, ORDER_BY_NAME, CLEAR } from "./actions-types"
import axios from "axios";

export const getVideogames = () => async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/");
      dispatch({ 
        type: GET_VIDEOGAMES, 
        payload: data 
    });
    } catch (error) {
      console.error("Error en actions todos los juegos", error);
    }
  };
  
  export const getNameVideogames = (name) => async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/?name=${name}`);
      dispatch({ 
        type: GET_NAME_VIDEOGAMES, 
        payload: data 
    });
    } catch (error) {
      console.error("Error en videogames actions", error);
    }
  };
  
  export const getGenres = () => async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/genres");
      dispatch({ 
        type: GET_GENRES, 
        payload: data 
    });
    } catch (error) {
      console.error("Error Error en  genres actions", error);
    }
  };
  
  export const postVideogame = (payload) => async (dispatch) => {
    const endpoint = "http://localhost:3001/";
    try {
      const { data } = await axios.post(endpoint, payload);
      dispatch({ 
        type: POST_VIDEOGAME, 
        payload: data 
    });
    } catch (error) {
      console.error("Error en videogames actions", error);
    }
  };
  
  export const getDetail = (id) => async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/${id}`);
      dispatch({ 
        type: GET_DETAILS, 
        payload: data 
    });
    } catch (error) {
      console.error("Error en videogames actions", error);
    }
  };
  
  export const filterByGenres = (payload) => ({ 
    type: FILTER_BY_GENRES, 
    payload 
});
  
  export const filterCreated = (payload) => ({ 
    type: FILTER_CREATED, 
    payload 
});
  
  export const orderByRating = (payload) => ({ 
    type: ORDER_BY_RATING, 
    payload 
});
  
  export const orderByName = (payload) => ({ 
    type: ORDER_BY_NAME, 
    payload 
});
  
  export const clear = () => ({ 
    type: CLEAR, 
    payload: [] 
});