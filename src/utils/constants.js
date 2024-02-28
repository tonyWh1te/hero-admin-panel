// actions
const HEROES_FETCHING = 'HEROES_FETCHING';
const HEROES_FETCHED = 'HEROES_FETCHED';
const HEROES_FETCHING_ERROR = 'HEROES_FETCHING_ERROR';
const HERO_DELETED = 'HERO_DELETED';
const HEROES_CREATED = 'HEROES_CREATED';
const HEROES_CREATION = 'HEROES_CREATION';
const HEROES_CREATION_ERROR = 'HEROES_CREATION_ERROR';
const FILTERS_FETCHING = 'FILTERS_FETCHING';
const FILTERS_FETCHED = 'FILTERS_FETCHED';
const FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR';
const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';

// URL
const BASE_URL = 'https://a80cca7ab3fe2a8b.mokky.dev';

// motion variants
const liVariants = {
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.2, duration: 0.2, type: 'ease' },
  }),
  hidden: {
    opacity: 0,
    y: 20,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { type: 'spring', stiffness: 900, damping: 40 },
  },
};

export {
  HEROES_FETCHING,
  HEROES_FETCHED,
  HEROES_FETCHING_ERROR,
  HERO_DELETED,
  BASE_URL,
  HEROES_CREATED,
  HEROES_CREATION,
  HEROES_CREATION_ERROR,
  FILTERS_FETCHING,
  FILTERS_FETCHED,
  FILTERS_FETCHING_ERROR,
  SET_ACTIVE_FILTER,
  liVariants,
};
