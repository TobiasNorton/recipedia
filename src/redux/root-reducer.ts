import { combineReducers } from '@reduxjs/toolkit';
import searchFormReducer from './slices/search-form';
import searchResultsReducer from './slices/search-results';

const rootReducer = combineReducers({
  searchForm: searchFormReducer,
  searchResults: searchResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
