import React from 'react';
import RecipeSnippet from '../recipe-snippet';

const SearchResults = ({
  couldNotFindRecipes,
  pageNumbers,
  searchQuery,
  setCurrentPage,
  recipes,
  recipesToDisplay,
  refreshSearch,
}) => {
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
          {pageNumbers &&
            pageNumbers.length > 1 &&
            pageNumbers.map((number) => {
              return (
                <button key={`page-${number}`} onClick={() => setCurrentPage(number)}>
                  {number}
                </button>
              );
            })}
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
