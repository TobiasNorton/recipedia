import { createSlice } from '@reduxjs/toolkit';

const totalResultsSlice = createSlice({
  name: 'totalResults',
  initialState: 0,
  reducers: {
    setTotalResults: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTotalResults } = totalResultsSlice.actions;
export default totalResultsSlice.reducer;
