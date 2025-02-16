import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import './styles.scss';
import { useGetCharacterByNumberQuery } from '../../store/apiSlice';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterByNumberQuery(`people/${id}`);

  const handleClose = () => {
    navigate('..', { replace: true });
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error fetching character details.</p>;

  return (
    <div className="character-details">
      <button
        data-testid="close-btn"
        className="character-details__close-btn"
        onClick={handleClose}
      >
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
