import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import RecipeSnippet from '../../components/recipe-snippet'
import AdvancedSearch from '../../components/advanced-search'
import AdvancedSearchTest from '../../components/advanced-search-test'
import { INTOLERANCES, API_KEY } from '../../constants'
import MultiSelectCheckbox from '../../components/multi-select-checkbox'

const Home = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIntolerances, setSelectedIntolerances] = useState([])
  const [recipes, setRecipes] = useState([])
  const [couldNotFindRecipes, setCouldNotFindRecipes] = useState(false)
  const [pageNumbers, setPageNumbers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false)

  const resultsPerPage = 10
  const numberOfPages = Math.ceil(recipes.length / resultsPerPage)
  const indexOfLastRecipe = (currentPage * resultsPerPage) - 1
  const indexOfFirstRecipe = (indexOfLastRecipe - resultsPerPage) + 1
  const recipesToDisplay = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe + 1)

  useEffect(() => {
    const numbers = []
    for (let i = 1; i <= numberOfPages; i++) {
      numbers.push(i)
    }
    setPageNumbers(numbers)
  }, [recipes])

  useEffect(() => {
    console.log('USE_EFFECT: selectedIntolerances have changed at the top level', selectedIntolerances)
  })

  const refreshSearch = () => {
    setSearchQuery('')
    setRecipes([])
    setCouldNotFindRecipes(false)
    setCurrentPage(1)
    setIsSearchSubmitted(false)
  }

  const handleChange = (event) => {
    const target = event.target
    console.log('target.name', target.name)
    setSearchQuery(target.value)
  }

  const handleSelect = (filters, filterType) => {
    console.log('filterType', filterType)
    if (filterType === 'intolerances') {
      setSelectedIntolerances(filters)
    }
  }

  const onSubmit = (event) => {
    try {
      search(event)
    } catch (error) {
      console.log(error)
    }
  }

  const search = (event) => {
    event.preventDefault()
    setIsSearchSubmitted(true)
    const queryString = `&query=${searchQuery}`
    const intolerances = selectedIntolerances.join(',')
    const intolerancesQueryString = `&intolerances=${intolerances}`
    setSearchQuery(searchQuery)

    let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    console.log('searchQuery: ', searchQuery)

    if (searchQuery) {
      recipesSearchUrl = `${recipesSearchUrl}${queryString}`
    }

    if (intolerances && intolerances.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`
    }

    console.log('recipesSearchUrl', recipesSearchUrl)
    axios.get(recipesSearchUrl).then((response) => {
      console.log('response.data', response && response.data && response.data)
      setRecipes(response.data && response.data.results)
      if (response.data && response.data.totalResults === 0) {
        setCouldNotFindRecipes(true)
      }
    })
  }

  const setToAdvancedSearch = () => {
    setIsAdvancedSearch(true)
    setRecipes([])
  }

  const backToSimpleSearch = () => {
    setIsAdvancedSearch(false)
    setRecipes([])
  }

  return (
    <div className="home">
      {
        !isSearchSubmitted ? (
          <div className="search-form-container">
            <h3>What are you hungry for?</h3>
            {!isAdvancedSearch ? (
                    <form onSubmit={onSubmit}>
                      <input className="text-field" type="text" name="keyword" onChange={handleChange}></input>
                      <button className="search-button" type="submit" 
                      >
                        Search
                      </button>
                      <button className="search-button" onClick={() => setToAdvancedSearch()}>
                        Advanced
                      </button>
                      <MultiSelectCheckbox filterType="intolerances" setSelection={setSelectedIntolerances} options={INTOLERANCES} handleSelect={handleSelect} />
                    </form>
                  ) : (
                <AdvancedSearchTest onSubmit={onSubmit} backToSimpleSearch={backToSimpleSearch} />
              )
            }
          </div>
        ) : (
            <div className="recipe-results-container">
              {
                recipes.length > 0 ? (
                  <div>
                    <h3>{`Showing ${recipes.length} results for "${searchQuery}"`}</h3>
                    <button onClick={() => refreshSearch()}>Back to Search</button>
                    <div className="recipe-results">
                      {recipesToDisplay.map((recipe, index) => {
                        const summary = `<p>${recipe.summary}</p>`
                        return (
                          <RecipeSnippet
                            id={recipe.id}
                            key={`recipe-${index}-${recipe.id}`}
                            summary={summary}
                            title={recipe.title}
                            image={recipe.image}
                          />
                        )
                      })}
                    </div>
                    {pageNumbers.length > 1 && pageNumbers.map(number => {
                      return (
                        <button key={`page-${number}`} onClick={() => setCurrentPage(number)}>{number}</button>
                      )
                    })}
                    <button onClick={() => refreshSearch()}>Back to Search</button>
                  </div>
                ) : (
                    <div>
                      {
                        couldNotFindRecipes ? (
                          <div>
                            <h3>{`Hmmm, we're not finding anything for "${searchQuery}".`}</h3>
                            <p>Showing 0 results.</p>
                            <button onClick={() => refreshSearch()}>Back to Search</button>
                          </div>
                        ) : (
                            <div>Loading...</div>
                          )
                      }
                    </div>
                  )
              }
            </div>
          )
      }

      <p>
        I created this using the{' '}
        <a href="https://spoonacular.com/food-api" target="_blank">
          Spoonacular API
        </a>
      </p>
    </div>
  )
}

export default Home
