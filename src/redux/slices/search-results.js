import { createSlice } from '@reduxjs/toolkit';

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: [],
  reducers: {
    setSearchResults: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchResults, setTotalResults } = searchResultsSlice.actions;
export const searchResultsSelector = (state) => state.searchResults;
export default searchResultsSlice.reducer;
