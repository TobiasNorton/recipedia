import { combineReducers } from '@reduxjs/toolkit';
import searchResultsReducer from './slices/search-results';
import totalResultsReducer from './slices/total-results';
import searchFormReducer from './slices/search-form';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  totalResults: totalResultsReducer,
  searchForm: searchFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
