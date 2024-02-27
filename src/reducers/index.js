import {
  HEROES_FETCHING,
  HEROES_FETCHED,
  HEROES_FETCHING_ERROR,
  HERO_DELETED,
  HEROES_CREATED,
  HEROES_CREATION,
  HEROES_CREATION_ERROR,
  FILTERS_FETCHING,
  FILTERS_FETCHED,
  FILTERS_FETCHING_ERROR,
  SET_ACTIVE_FILTER,
} from '../utils/constants';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  heroesCreationStatus: 'idle',
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filters: [],
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
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
        filteredHeroes: action.payload.filter(
          (hero) => hero.element === state.activeFilter || state.activeFilter === 'all',
        ),
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
        filteredHeroes: newHeroes.filter(
          (hero) => hero.element === state.activeFilter || state.activeFilter === 'all',
        ),
      };
    case HEROES_CREATED:
      const newList = [...state.heroes, action.payload];

      return {
        ...state,
        heroes: newList,
        filteredHeroes: newList.filter(
          (hero) => hero.element === state.activeFilter || state.activeFilter === 'all',
        ),
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
    case FILTERS_FETCHING:
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case FILTERS_FETCHED:
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case FILTERS_FETCHING_ERROR:
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case SET_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes: state.heroes.filter(
          (hero) => hero.element === action.payload || action.payload === 'all',
        ),
      };
    default:
      return state;
  }
};

export default reducer;
