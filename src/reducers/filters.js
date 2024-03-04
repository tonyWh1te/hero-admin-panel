import {
  FILTERS_FETCHING,
  FILTERS_FETCHED,
  FILTERS_FETCHING_ERROR,
  SET_ACTIVE_FILTER,
} from '../utils/constants';

const initialState = {
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filters: [],
};

// создание редьюсера в нативном redux

const filters = (state = initialState, action) => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};

export default filters;
