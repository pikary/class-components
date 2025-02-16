import { useTypedSelector, useAppDispatch } from '../../store';
import { unselectAll } from '../../store/reducers/selectedCharacters';
import { saveAs } from 'file-saver';
import './styles.scss';
import { Character } from '../../api/types';

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useTypedSelector(
    (state) => state.selectedCharacters.selectedCharacters
  );

  // If no items are selected, do not render Flyout
  if (selectedCharacters.length === 0) return null;

  // ✅ Function to handle CSV download
  const handleDownload = () => {
    const csvContent =
      'Name,Height,Mass,Gender,Birth Year,Eye colr,URL\n' +
      selectedCharacters
        .map(
          (item: Character) =>
            `${item.name},${item.height},${item.mass},${item.gender},${item.birth_year},${item.eye_color},${item.url}`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `${selectedCharacters.length}_characters.csv`);
  };

  return (
    <div className="flyout">
      <p>{selectedCharacters.length} items are selected</p>
      <button className="flyout__btn" onClick={() => dispatch(unselectAll())}>
        Unselect all
      </button>
      <button className="flyout__btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
