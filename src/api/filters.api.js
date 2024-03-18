import { apiSlice } from './apiSlice';

export const filtersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilters: builder.query({
      query: () => '/filters',
      providesTags: ['Filters'],
    }),
  }),
});

export const { useGetFiltersQuery } = filtersApi;
