import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { BASE_URL } from '../../utils/constants';

const heroesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
  heroesCreationStatus: 'idle',
  error: null,
});

export const heroesFetchThunk = createAsyncThunk('heroes/fetch', async (_, { rejectWithValue }) => {
  const { request } = useHttp();

  try {
    return await request(`${BASE_URL}/heroes`);
  } catch (error) {
    return rejectWithValue('Ошибка загрузки героев');
  }
});

export const heroesDeleteThunk = createAsyncThunk(
  'heroes/delete',
  async (id, { rejectWithValue, dispatch }) => {
    const { request } = useHttp();

    try {
      await request(`${BASE_URL}/heroes/${id}`, 'DELETE');

      dispatch(heroesDelete(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const heroesCreateThunk = createAsyncThunk(
  'heroes/create',
  async (hero, { rejectWithValue }) => {
    const { request } = useHttp();

    try {
      return await request(`${BASE_URL}/heroes`, 'POST', JSON.stringify(hero));
    } catch (error) {
      return rejectWithValue('Ошибка создания героя');
    }
  },
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesDelete(state, action) {
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(heroesFetchThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(heroesFetchThunk.fulfilled, (state, action) => {
        heroesAdapter.setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(heroesFetchThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(heroesDeleteThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(heroesCreateThunk.rejected, (state, action) => {
        state.createStatus = 'error';
        state.error = action.payload;
      })
      .addCase(heroesCreateThunk.fulfilled, (state, action) => {
        heroesAdapter.addOne(state, action.payload);
        state.createStatus = 'idle';
      })
      .addCase(heroesCreateThunk.pending, (state) => {
        state.error = null;
        state.createStatus = 'loading';
      })
      .addDefaultCase(() => {});
  },
});

export const { selectAll: selectAllHeroes } = heroesAdapter.getSelectors((state) => state.heroes);

// мемоизировали селектор
export const filteredHeroesSelector = createSelector(
  selectAllHeroes,
  (state) => state.filters.activeFilter,
  (heroes, activeFilter) => {
    if (activeFilter === 'all') {
      return heroes;
    } else {
      return heroes.filter((hero) => hero.element === activeFilter);
    }
  },
);

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroesDelete } = actions;
