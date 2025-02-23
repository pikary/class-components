import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types';

const initialState = {
  selectedCharacters: JSON.parse(
    localStorage.getItem('selectedCharacters') || '[]'
  ),
};

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const itemIndex = state.selectedCharacters.findIndex(
        (item: Character) => item.url === action.payload.url
      );
      if (itemIndex !== -1) {
        state.selectedCharacters.splice(itemIndex, 1); // Remove if already selected
      } else {
        state.selectedCharacters.push(action.payload); // Add if not selected
      }
      localStorage.setItem(
        'selectedCharacters',
        JSON.stringify(state.selectedCharacters)
      );
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
      localStorage.removeItem('selectedCharacters');
    },
  },
});

export const { toggleItem, unselectAll } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
