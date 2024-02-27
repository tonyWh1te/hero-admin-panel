import {
  HEROES_FETCHING,
  HEROES_FETCHED,
  HEROES_FETCHING_ERROR,
  HERO_DELETED,
  HEROES_CREATED,
  HEROES_CREATION,
  HEROES_CREATION_ERROR,
} from '../utils/constants';

export const heroesFetching = () => {
  return {
    type: HEROES_FETCHING,
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: HEROES_FETCHED,
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: HEROES_FETCHING_ERROR,
  };
};

export const heroDeleted = (id) => {
  return {
    type: HERO_DELETED,
    payload: id,
  };
};

export const heroesCreated = (newHero) => {
  return {
    type: HEROES_CREATED,
    payload: newHero,
  };
};

export const heroesCreation = () => {
  return {
    type: HEROES_CREATION,
  };
};

export const heroesCreationError = () => {
  return {
    type: HEROES_CREATION_ERROR,
  };
};
