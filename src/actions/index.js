// import {
//   heroesFetched,
//   heroesFetching,
//   heroesFetchingError,
// } from '../components/heroesList/heroesSlice';

// import {
//   filtersFetched,
//   filtersFetching,
//   filtersFetchingError,
// } from '../components/heroesFilters/filtersSlice';

// export const heroesFetchThunk = (request) => (dispatch) => {
//   dispatch(heroesFetching());

//   request(`${BASE_URL}/heroes`)
//     .then((data) => dispatch(heroesFetched(data)))
//     .catch(() => dispatch(heroesFetchingError()));
// };

// export const filtersFetchThunk = (request) => (dispatch) => {
//   dispatch(filtersFetching());

//   request(`${BASE_URL}/filters`)
//     .then((data) => dispatch(filtersFetched(data)))
//     .catch(() => dispatch(filtersFetchingError()));
// };

// Создание action creators в нативном redux

// export const heroesFetching = () => {
//   return {
//     type: HEROES_FETCHING,
//   };
// };

// export const heroesFetched = (heroes) => {
//   return {
//     type: HEROES_FETCHED,
//     payload: heroes,
//   };
// };

// export const heroesFetchingError = () => {
//   return {
//     type: HEROES_FETCHING_ERROR,
//   };
// };

// export const heroDeleted = (id) => {
//   return {
//     type: HERO_DELETED,
//     payload: id,
//   };
// };

// export const heroesCreated = (newHero) => {
//   return {
//     type: HEROES_CREATED,
//     payload: newHero,
//   };
// };

// export const heroesCreation = () => {
//   return {
//     type: HEROES_CREATION,
//   };
// };

// export const heroesCreationError = () => {
//   return {
//     type: HEROES_CREATION_ERROR,
//   };
// };

// export const filtersFetching = () => {
//   return {
//     type: FILTERS_FETCHING,
//   };
// };

// export const filtersFetched = (filters) => {
//   return {
//     type: FILTERS_FETCHED,
//     payload: filters,
//   };
// };

// export const filtersFetchingError = () => {
//   return {
//     type: FILTERS_FETCHING_ERROR,
//   };
// };

// export const setActiveFilter = (activeFilter) => {
//   return {
//     type: SET_ACTIVE_FILTER,
//     payload: activeFilter,
//   };
// };
