import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from './reducers/types';

const BASE_URL = 'https://swapi.dev/api/';
export interface GetCharactersResponse {
  count?: number;
  results: Character[];
}

export const apiSlice = createApi({
  reducerPath: 'api', // 👈 Important: This must match in store.js
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      GetCharactersResponse,
      { url: string; query: string; page?: number }
    >({
      query: ({ url, query, page }) => {
        const pageParam = page ? `&page=${page}` : '';
        return `${url}/?search=${query}${pageParam}`;
      },
    }),
    getCharacterByNumber: builder.query<Character, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByNumberQuery } = apiSlice;
