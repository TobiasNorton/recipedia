import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import './style.scss'
import RecipeSnippet from '../../components/recipe-snippet'
import AdvancedSearch from '../../components/advanced-search'
import AdvancedSearchTest from '../../components/advanced-search-test'

const Home = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [couldNotFindRecipes, setCouldNotFindRecipes] = useState(false)

  const refreshSearch = () => {
    setSearchQuery('')
    setRecipes([])
    setCouldNotFindRecipes(false)
  }

  const onSubmit = (values, { setStatus, setSubmitting, resetForm }) => {
    console.log('onSubmit has definitely been clicked.', values)
    const apiKey = '7115e309409d4387a6369108cd7185fd'
    try {
      search(values, apiKey)
    } catch (error) {
      setStatus({ error: error.message })
    }
  }

  const search = (values, apiKey) => {
    console.log('search values', values)
    const keyword = values && values.keyword
    const intolerances = values && values.intolerances && values.intolerances.join(',')
    const intolerancesQueryString = `&intolerances="${intolerances}"`
    const cuisines = values && values.cuisines && values.cuisines.join(',')
    const cuisineQueryString = `&cuisine="${cuisines}"`
    setSearchQuery(keyword)

    let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}&addRecipeInformation=true&number=100`
    console.log('keyword: ', keyword)

    if (intolerances && intolerances.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`
    }

    if (cuisines && cuisines.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${cuisineQueryString}`
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
        !searchQuery ? (
          <div className="search-form-container">
            <h3>What are you hungry for?</h3>
            {!isAdvancedSearch ? (
              <Formik initialValues={{ keyword: '' }} onSubmit={onSubmit}>
                {({ status, isSubmitting }) => {
                  return (
                    <Form>
                      <Field className="text-field" type="text" name="keyword"></Field>
                      <button className="search-button" type="submit" disabled={isSubmitting}>
                        Search
                      </button>
                      <button className="search-button" onClick={() => setToAdvancedSearch()}>
                        Advanced
                      </button>
                      {status && status.error ? <p>{status.error}</p> : null}
                    </Form>
                  )
                }}
              </Formik>
            ) : (
                <AdvancedSearchTest onSubmit={onSubmit} backToSimpleSearch={backToSimpleSearch} />
              )}
          </div>
        ) : (
            <div className="recipe-results-container">
              {
                recipes.length > 0 ? (
                  <div>
                    <h3>{`Showing ${recipes.length} results for "${searchQuery}"`}</h3>
                    <button onClick={() => refreshSearch()}>Back to Search</button>
                    <div className="recipe-results">
                      {recipes.map((recipe, index) => {
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
