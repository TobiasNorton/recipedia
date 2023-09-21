import React, { useEffect } from 'react';
import axios from 'axios';
import RecipeSnippet from '../../components/recipe-snippet';
import Pagination from '../../components/pagination';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// const queryString = require('query-string');

// interface SearchResultsProps {
//   couldNotFindRecipes: boolean;
//   currentPage: number;
//   pageNumbers: number[];
//   searchQuery: string;
//   setCurrentPage: Function;
//   recipes: any[];
//   recipesToDisplay: any[];
//   refreshSearch: Function;
// }

//const SearchResults = (props: SearchResultsProps) => {
const SearchResults = (props) => {
  const {
    couldNotFindRecipes,
    currentPage,
    pageNumbers,
    searchQuery,
    setCurrentPage,
    recipes,
    recipesToDisplay,
    refreshSearch,
    selectedCheckboxIntolerances,
    selectedCheckboxCuisines,
    setSearchQuery,
    apiKey,
    setRecipes,
    setCouldNotFindRecipes,
  } = props;

  const { search } = useLocation();
  const { query } = queryString.parse(search);

  useEffect(() => {
    console.log('query', query);
    try {
      // setIsSearchSubmitted(true);
      const queryParamString = `&query=${searchQuery}`;
      const intolerances = selectedCheckboxIntolerances.join(',');
      const intolerancesQueryString = `&intolerances=${intolerances}`;
      const cuisines = selectedCheckboxCuisines.join(',');
      const cuisinesQueryString = `&cuisine=${cuisines}`;

      setSearchQuery(searchQuery);

      let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=200`;

      if (searchQuery) {
        recipesSearchUrl = `${recipesSearchUrl}${queryString}`;
      }
      if (intolerances && intolerances.length > 0) {
        recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`;
      }
      if (cuisines && cuisines.length > 0) {
        recipesSearchUrl = `${recipesSearchUrl}${cuisinesQueryString}`;
      }

      axios.get(recipesSearchUrl).then((response) => {
        setRecipes(response.data && response.data.results);
        if (response.data && response.data.totalResults === 0) {
          setCouldNotFindRecipes(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="recipe-results-container">
      HELLLOOOOOO
      {/* {recipes.length > 0 ? (
        <div>
          <h3>{`Showing ${recipes.length} results for "${searchQuery}"`}</h3>
          <button onClick={() => refreshSearch()}>Back to Search</button>
          <div className="recipe-results">
            {recipesToDisplay.map((recipe, index) => {
              const summary = `<p>${recipe.summary}</p>`;
              return (
                <RecipeSnippet
                  id={recipe.id}
                  key={`recipe-${index}-${recipe.id}`}
                  summary={summary}
                  title={recipe.title}
                  image={recipe.image}
                />
              );
            })}
          </div>
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <button onClick={() => refreshSearch()}>Back to Search</button>
        </div>
      ) : (
        <div>
          {couldNotFindRecipes ? (
            <div>
              <h3>{`Hmmm, we're not finding anything for "${searchQuery}".`}</h3>
              <p>Showing 0 results.</p>
              <button onClick={() => refreshSearch()}>Back to Search</button>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default SearchResults;
