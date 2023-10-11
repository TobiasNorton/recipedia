import { createSlice } from '@reduxjs/toolkit';

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    keyword: '',
    intolerances: [],
    cuisines: [],
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setCuisines: (state, action) => {
      state.keyword = action.payload;
    },
    setIntolerances: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword, setCuisines, setIntolerances } = searchFormSlice.actions;
export default searchFormSlice.reducer;
