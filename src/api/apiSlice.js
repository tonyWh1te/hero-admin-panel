import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

export const apiSlice = createApi({
  reducerPath: 'api', //название слайса в сторе
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  //Какие теги будут в нашем апи
  tagTypes: ['Heroes'],
  endpoints: () => ({}),
});
