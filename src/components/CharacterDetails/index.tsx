import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacterByNumber } from '../../api/baseApi';
import Spinner from '../Spinner';
import './styles.scss';
import { Character } from '../../api/types';
const mock = {
  url: 'https://swapi.dev/api/people/4/',
  name: 'Darth Vader',
  height: '202',
  mass: '136',
  gender: 'male',
  birth_year: '41.9BBY',
  films: ['Film 1', 'Film 3', 'Film 4'],
  hair_color: 'none',
  skin_color: 'white',
  eye_color: 'yellow',
  homeworld: 'Tatooine',
  species: [],
  vehicles: [],
  starships: ['TIE Advanced x1'],
  created: '2014-12-10T15:18:20.704000Z',
  edited: '2014-12-20T21:17:50.313000Z',
};
const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(mock);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      const result = await getCharacterByNumber(`people/${id}`);
      setCharacter(result);
      setLoading(false);
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="character-details">
      <h2>{character?.name}</h2>
      <div className="info">
        <p>
          <strong>Height:</strong> {character?.height} cm
        </p>
        <p>
          <strong>Mass:</strong> {character?.mass} kg
        </p>
        <p>
          <strong>Gender:</strong> {character?.gender}
        </p>
        <p>
          <strong>Birth Year:</strong> {character?.birth_year}
        </p>
      </div>
    </div>
  );
};

export default CharacterDetails;
