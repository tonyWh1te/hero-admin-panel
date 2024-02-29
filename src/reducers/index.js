import { combineReducers } from 'redux';

import heroes from './heroes';
import filters from './filters';

const reducer = combineReducers({
  heroes,
  filters,
});

export default reducer;
