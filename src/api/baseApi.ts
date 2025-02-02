import { Character } from './types';
const BASE_URL = 'https://swapi.dev/api/';

interface ReturnType<T> {
  results: T;
}

export const getCharacters = async (
  url: string,
  query: string
): Promise<ReturnType<Character[]> | null> => {
  try {
    const response = await fetch(`${BASE_URL}${url}?search=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return null;
  }
};
