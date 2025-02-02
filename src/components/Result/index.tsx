import { Component, ReactNode } from 'react';
import { Character } from '../../api/types';
import './styles.scss';

interface CharacterTableProps {
  characters: Character[];
}

class CharacterTable extends Component<CharacterTableProps> {
  render(): ReactNode {
    const { characters } = this.props;

    return characters.length > 0 ? (
      <table className="character-table">
        <thead>
          <tr>
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
            <tr key={character.url} className="character-table__child">
              <td>{++ind}</td>
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
    ) : (
      <h3 style={{ textAlign: 'center' }}>No characters found</h3>
    );
  }
}

export default CharacterTable;
