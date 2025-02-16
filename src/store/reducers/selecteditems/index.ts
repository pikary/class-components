import { createSlice } from '@reduxjs/toolkit';
import { Character } from './types';
interface SelectedItemsSliceState {
  characters: Character[];
}

const initialState = {
  selectedItems: JSON.parse(localStorage.getItem('selectedItems')) || [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const itemIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.selectedItems.splice(itemIndex, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
      localStorage.setItem(
        'selectedItems',
        JSON.stringify(state.selectedItems)
      );
    },
    unselectAll: (state) => {
      state.selectedItems = [];
      localStorage.removeItem('selectedItems');
    },
  },
});

export const { toggleItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
