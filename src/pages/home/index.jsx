import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import './style.scss'
import RecipeSnippet from '../../components/recipe-snippet'
import AdvancedSearch from '../../components/advanced-search'

const Home = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [recipes, setRecipes] = useState([])

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
    const cuisine = values && values.cuisines && values.cuisines.join(',')
    const cuisineQueryString = `&cuisine="${cuisine}"`

    let recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}&addRecipeInformation=true&number=100`
    console.log('keyword: ', keyword)

    if (intolerances.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${intolerancesQueryString}`
    }

    if (cuisine.length > 0) {
      recipesSearchUrl = `${recipesSearchUrl}${cuisineQueryString}`
    }

    console.log('recipesSearchUrl', recipesSearchUrl)
    axios.get(recipesSearchUrl).then((response) => {
      console.log('response.data', response && response.data && response.data)
      setRecipes(response.data && response.data.results)
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
  // Have a form for advanced vs simple
  // If its a simple search, show the buttons, else show the whole form

  return (
    <div className="home">
      <h3>What are you hungry for?</h3>
      <div className="search-form-container">
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
            <AdvancedSearch onSubmit={onSubmit} backToSimpleSearch={backToSimpleSearch} />
          )}
      </div>

      {recipes.length
        ? recipes.map((recipe, index) => {
          const summary = `<p>${recipe.summary}</p>`
          return (
            <RecipeSnippet
              key={recipe.id}
              summary={summary}
              title={recipe.title}
              image={recipe.image}
            />
          )
        })
        : null}
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
