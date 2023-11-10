import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

export const getSearchResults = createAsyncThunk(
  'searchForm/getSearchResults',
  async ({
    searchQuery,
    selectedIntolerances = [],
    selectedCuisines = [],
  }: {
    searchQuery: string;
    selectedIntolerances?: string[];
    selectedCuisines?: string[];
  }) => {
    const queryString = `&query=${searchQuery}`;
    const intolerancesString = selectedIntolerances.join();
    const intolerancesQueryString = `&intolerances=${intolerancesString}`;
    const cuisinesString = selectedCuisines.join();
    const cuisinesQueryString = `&cuisine=${cuisinesString}`;

    let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=200`;

    if (searchQuery) {
      recipesSearchUrl = `${recipesSearchUrl}${queryString}`;
    }
    if (intolerancesString?.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`;
    }
    if (cuisinesString?.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${cuisinesQueryString}`;
    }

    const response = await fetch(recipesSearchUrl);
    const searchResults = await response.json();
    return searchResults.results;
  }
);

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: { recipes: [], isLoading: false },
  reducers: {
    setSearchResults: (state, action) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSearchResults.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
