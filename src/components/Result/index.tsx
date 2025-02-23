import { useNavigate } from 'react-router-dom';
import { Character } from '../../api/types';
import { toggleItem } from '../../store/reducers/selectedCharacters';
import './styles.scss';
import { useAppDispatch, useTypedSelector } from '../../store';

interface CharacterTableProps {
  characters: Character[];
  count: number;
}

const CharacterTable = ({ characters, count }: CharacterTableProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedItems = useTypedSelector(
    (state) => state.selectedCharacters.selectedCharacters
  );

  const isSelected = (character: Character) =>
    selectedItems.some((item: Character) => item.url === character.url);

  return characters.length > 0 ? (
    <div className="characters">
      <table className="characters__table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Num</th>
            <th>Name</th>
            <th>Height (cm)</th>
            <th>Mass (kg)</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, ind) => (
            <tr
              data-testid={`character_${character.name}`}
              key={character.url}
              className="characters__table__child"
              onClick={() =>
                navigate(`details/${character.url.split('/').slice(-2, -1)[0]}`)
              }
            >
              <td>
                <input
                  type="checkbox"
                  checked={isSelected(character)}
                  onClick={(e) => e.stopPropagation()} // Prevent row click when selecting checkbox
                  onChange={() => dispatch(toggleItem(character))}
                />
              </td>
              <td>{ind + 1}</td>
              <td>{character.name}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.gender}</td>
              <td>{character.birth_year}</td>
              <td>{character.films.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="characters__total">Total: {count}</h4>
    </div>
  ) : (
    <h3 style={{ textAlign: 'center' }}>No characters found</h3>
  );
};

export default CharacterTable;
