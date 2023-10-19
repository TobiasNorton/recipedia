import { combineReducers } from '@reduxjs/toolkit';
import searchResultsReducer from './slices/search-results';
import totalResultsReducer from './slices/total-results';
import searchQueryReducer from './slices/search-query';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  totalResults: totalResultsReducer,
  searchQuery: searchQueryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
