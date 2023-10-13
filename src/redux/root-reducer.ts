import { combineReducers } from '@reduxjs/toolkit';
import searchResultsReducer from './slices/search-results';
import searchQueryReducer from './slices/search-query';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  searchQuery: searchQueryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
