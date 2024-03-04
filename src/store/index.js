import reducer from '../reducers';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { configureStore } from '@reduxjs/toolkit';

// создание стора на нативном redux
// const store = createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

// создание стора на библиотеке redux-toolkit
// редьюсеры соединяются в один с помощью combineReducers под капотом
// также по умолчанию уже включены часто используемые мидлвары. Чтобы их получить явно необходимо импортировать getDefaultMiddleware
const store = configureStore({
  reducer: { heroes, filters },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
