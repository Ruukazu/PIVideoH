import { validate as isUuid } from 'uuid';
const initialState = {
    videogames: [],
    allVideogames: [],
    allgenres: [],
    platforms: [],
    details: {},
  };
  
  function getUniquePlatforms(payload) {
    let platforms = [];
    payload.map((plat) => (platforms = [...platforms, ...plat.platforms]));
    return Array.from(new Set(platforms));
  }
  
  function sortByName(videogames, order) {
    return videogames.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return order === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }
  
  function sortByRating(videogames, order) {
    return videogames.sort((a, b) => {
      return order === "least" ? a.rating - b.rating : b.rating - a.rating;
    });
  }
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_VIDEOGAMES":
        return {
          ...state,
          videogames: [...action.payload],
          allVideogames: [...action.payload],
          platforms: getUniquePlatforms(action.payload),
          page: 1,
        };
  
      case "GET_NAME_VIDEOGAMES":
        return {
          ...state,
          videogames: action.payload,
        };
  
      case "GET_GENRES":
        return {
          ...state,
          allgenres: action.payload,
        };
  
      case "GET_DETAILS":
        return {
          ...state,
          details: action.payload,
        };
  
      case "FILTER_BY_GENRES":
        const allVideogames2 = state.allVideogames;
        const genresFilter =
          action.payload === "All"
            ? allVideogames2
            : allVideogames2.filter((gen) => gen.genres.includes(action.payload));
        return {
          ...state,
          videogames: genresFilter,
        };
  
      case "FILTER_CREATED":
        const allvideogames = state.allVideogames;
        const filterDb =
          action.payload === "created"
            
          ? allvideogames.filter((game) => isUuid(game.id))
          : allvideogames.filter((game) => !isUuid(game.id));
        return {
          ...state,
          videogames: action.payload === "all" ? state.allVideogames : filterDb,
        };
  
      case "ORDER_BY_RATING":
        return {
          ...state,
          videogames: sortByRating([...state.videogames], action.payload),
        };
  
      case "ORDER_BY_NAME":
        return {
          ...state,
          videogames: sortByName([...state.videogames], action.payload),
        };
  
      case "CLEAR":
        return {
          ...state,
          details: action.payload,
        };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;