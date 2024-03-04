import { combineReducers } from 'redux';

import heroes from './heroes';
import filters from './filters';

// обединение редьюсеров в нативном redux
// const reducer = combineReducers({
//   heroes,
//   filters,
// });

const reducer = {
  heroes,
  filters,
};

export default reducer;
