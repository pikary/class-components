import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { apiSlice } from './apiSlice';
import selectedCharactersReducer from './reducers/selectedCharacters/index';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  selectedCharacters: selectedCharactersReducer,
});

// ✅ Function to create a fresh store for each test
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState, // Allows injecting initial state for tests
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// ✅ Export store types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
