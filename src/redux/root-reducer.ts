import { combineReducers } from '@reduxjs/toolkit';
import searchResultsReducer from './slices/search-results';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
