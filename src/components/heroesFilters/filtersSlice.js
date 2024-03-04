import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filters: [],
  error: null,
};

export const filtersFetchThunk = createAsyncThunk(
  'filters/fetch',
  async (_, { rejectWithValue }) => {
    const { request } = useHttp();

    try {
      return await request(`${BASE_URL}/filters`);
    } catch (error) {
      return rejectWithValue('Ошибка загрузки фильтров');
    }
  },
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filtersFetchThunk.pending, (state) => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(filtersFetchThunk.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = 'idle';
      })
      .addCase(filtersFetchThunk.rejected, (state, action) => {
        state.filtersLoadingStatus = 'error';
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { setActiveFilter } = actions;
