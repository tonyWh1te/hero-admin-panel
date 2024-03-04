import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  heroes: [],
  status: 'idle',
  createStatus: 'idle',
  error: null,
};

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
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(heroesFetchThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(heroesFetchThunk.fulfilled, (state, action) => {
        state.heroes = action.payload;
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
        state.heroes.unshift(action.payload);
        state.createStatus = 'idle';
      })
      .addCase(heroesCreateThunk.pending, (state) => {
        state.error = null;
        state.createStatus = 'loading';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroesDelete } = actions;
