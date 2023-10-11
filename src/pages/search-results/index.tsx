import { useEffect, useState } from 'react';
import RecipeSnippet from '../../components/recipe-snippet';
import Pagination from '../../components/pagination';
import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import { searchResultsSelector } from '../../redux/slices/search-results';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/root-reducer';

//const SearchResults = (props: SearchResultsProps) => {
const SearchResults = () => {
  const [couldNotFindRecipes, setCouldNotFindRecipes] = useState(false);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const { search } = useLocation();
  const recipes = useSelector((state: RootState) => state.searchResults);
  // const { query } = queryString.parse(search);

  const resultsPerPage = 10;
  const numberOfPages = Math.ceil(recipes.length / resultsPerPage);
  const indexOfLastRecipe = currentPage * resultsPerPage - 1;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage + 1;
  const recipesToDisplay = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1);

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= numberOfPages; i++) {
      numbers.push(i);
    }
    setPageNumbers(numbers);
  }, [recipes]);

  // const refreshSearch = () => {
  //   setSearchQuery('');
  //   setRecipes([]);
  //   setCouldNotFindRecipes(false);
  //   setCurrentPage(1);
  //   // setIsSearchSubmitted(false);
  // };

  return (
    <div className="recipe-results-container">
      {recipes.length > 0 ? (
        <div>
          {/* <h3>{`Showing ${recipes.length} results for "${searchQuery}"`}</h3> */}
          {/* <button onClick={() => refreshSearch()}>Back to Search</button> */}
          <div className="recipe-results">
            {recipes.map(
              (
                recipe: { id: number; title: string; image: string; summary: string },
                index: number
              ) => {
                const summary = `<p>${recipe.summary}</p>`;
                return (
                  <RecipeSnippet
                    id={recipe.id}
                    key={`recipe-${index}-${recipe.id}`}
                    title={recipe.title}
                    image={recipe.image}
                    summary={summary}
                  />
                );
              }
            )}
          </div>
          {/* <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
          {/* <button onClick={() => refreshSearch()}>Back to Search</button> */}
        </div>
      ) : (
        <div>
          {couldNotFindRecipes ? (
            <div>
              {/* <h3>{`Hmmm, we're not finding anything for "${searchQuery}".`}</h3> */}
              <p>Showing 0 results.</p>
              {/* <button onClick={() => refreshSearch()}>Back to Search</button> */}
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
