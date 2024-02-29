import {
  HEROES_FETCHING,
  HEROES_FETCHED,
  HEROES_FETCHING_ERROR,
  HERO_DELETED,
  HEROES_CREATED,
  HEROES_CREATION,
  HEROES_CREATION_ERROR,
} from '../utils/constants';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  heroesCreationStatus: 'idle',
};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case HEROES_FETCHING:
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case HEROES_FETCHED:
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case HEROES_FETCHING_ERROR:
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case HERO_DELETED:
      const newHeroes = state.heroes.filter((hero) => hero.id !== action.payload);

      return {
        ...state,
        heroes: newHeroes,
      };
    case HEROES_CREATED:
      return {
        ...state,
        heroes: [action.payload, ...state.heroes],
        heroesCreationStatus: 'idle',
      };
    case HEROES_CREATION:
      return {
        ...state,
        heroesCreationStatus: 'creation',
      };
    case HEROES_CREATION_ERROR:
      return {
        ...state,
        heroesCreationStatus: 'error',
      };
    default:
      return state;
  }
};

export default heroes;
