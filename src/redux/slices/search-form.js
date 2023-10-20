import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  intolerances: [],
  cuisines: [],
};

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setIntolerances: (state, action) => {
      state.intolerances = action.payload;
    },
    setCuisines: (state, action) => {
      state.cuisines = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setSearchQuery, setIntolerances, setCuisines, resetForm } = searchFormSlice.actions;
export default searchFormSlice.reducer;
