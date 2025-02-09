import { Character } from './types';
const BASE_URL = 'https://swapi.dev/api/';

interface ReturnType<T> {
  count?: number;
  results: T;
}

export const getCharacters = async (
  url: string,
  query: string,
  page: number
): Promise<ReturnType<Character[]> | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}${url}/?search=${query}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}:${response.text}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Error fetching characters: ' + (error as Error).message);
  }
};
