import { Character } from './types';
const BASE_URL = 'https://swapi.dev/api/';

interface getCharactersResponse {
  count?: number;
  results: Character[];
}

export const getCharacters = async (
  url: string,
  query: string,
  page: number
): Promise<getCharactersResponse | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}${url}/?search=${query}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}:${response.text}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error('Error fetching characters: ' + (error as Error).message);
  }
};
export const getCharacterByNumber = async (
  url: string
): Promise<Character | null> => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);

    if (!response.ok) {
      throw new Error(`${response.status}:${response.text}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error('Error fetching character: ' + (error as Error).message);
  }
};
