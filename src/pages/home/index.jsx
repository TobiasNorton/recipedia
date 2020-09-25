import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import RecipeSnippet from '../../components/recipe-snippet'
import './style.scss'

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
    // TODO: Create all of the query param strings to be concatenated in the url
    console.log('search values', values)
    const keyword = values && values.keyword
    const recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}&addRecipeInformation=true&number=50`
    //const ingredientsUrl = `https://api.spoonacular.com/recipes/716429/information?includeNutrition=true`
    console.log('keywordddd', keyword)
    axios.get(recipesSearchUrl).then((response) => {
      console.log('response.data', response && response.data && response.data)
      setRecipes(response.data && response.data.results)
    })
  }

  const setToAdvancedSearch = () => {
    setIsAdvancedSearch(true)
  }

  // Have a form for advanced vs simple
  // If its a simple search, show the buttons, else show the whole form

  return (
    <div>
      <h3>What are you hungry for?</h3>

      {!isAdvancedSearch ? (
        <Formik initialValues={{ keyword: '' }} onSubmit={onSubmit}>
          {({ status, isSubmitting }) => {
            return (
              <Form>
                <Field type="text" name="keyword"></Field>
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
        <Formik
          initialValues={{ keyword: '', ingredients: [], cuisine: '' }}
          onSubmit={() => search()}
        >
          {({ status, isSubmitting }) => {
            return (
              <Form>
                <p>This is the Advanced search form.</p>
              </Form>
            )
          }}
        </Formik>
      )}
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
