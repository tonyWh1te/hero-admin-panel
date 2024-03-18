import { apiSlice } from './apiSlice';

export const heroesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //операци которые делает с базовым запросом
    getHeroes: builder.query({
      //операция получения героев, поэтому query
      query: () => ({ url: '/heroes', params: 'sortBy=name' }),
      providesTags: ['Heroes'], //к какому тегу относится данный запрос
      // вместе с тегом можно добавить id каждого героя, если нужно будет обновить инф-ю о герое (в invalidateTags поле функции с обновлением тоже нужно будет указать id)
    }),
    // операция создания героя, поэтому mutation
    createHero: builder.mutation({
      query: (hero) => ({
        url: '/heroes',
        method: 'POST',
        body: hero, //автоматом генерируется в json
      }),
      invalidatesTags: ['Heroes'], //если мутировали данные, то данные по этому тегу теперь не актуальны и надо получчить актуальные.
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes'],
    }),
  }),
});

// createApi сгенерирует на каждую операцию хуки
// названия генерируемых хуков будут состоять из названия операции + название типа операции (либо query либо mutation)
//Также createApi создает reducer`
export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } = heroesApi;
