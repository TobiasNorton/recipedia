import React from 'react';
import RecipeSnippet from '../recipe-snippet';
import Pagination from '../pagination';

interface SearchResultsProps {
  couldNotFindRecipes: boolean;
  currentPage: number;
  pageNumbers: number[];
  searchQuery: string;
  setCurrentPage: Function;
  recipes: any[];
  recipesToDisplay: any[];
  refreshSearch: Function;
}

const SearchResults = (props: SearchResultsProps) => {
  const {
    couldNotFindRecipes,
    currentPage,
    pageNumbers,
    searchQuery,
    setCurrentPage,
    recipes,
    recipesToDisplay,
    refreshSearch,
  } = props;
  return (
    <div className="recipe-results-container">
      {recipes.length > 0 ? (
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
      )}
    </div>
  );
};

export default SearchResults;
