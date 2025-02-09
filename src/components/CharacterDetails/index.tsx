import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacterByNumber } from '../../api/baseApi';
import Spinner from '../Spinner';
import './styles.scss';
import { Character } from '../../api/types';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
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

  const handleClose = () => {
    navigate('..', { replace: true });
  };

  if (loading) return <Spinner />;

  return (
    <div className="character-details">
      <button className="character-details__close-btn" onClick={handleClose}>
        X
      </button>
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
